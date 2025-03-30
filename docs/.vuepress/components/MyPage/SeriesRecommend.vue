<!-- .vuepress/components/SeriesArticles.vue -->
<template>
  <div v-if="seriesPosts.length > 0" class="series-box">
    <div class="series-header">
      <span class="icon">📚</span>
      <h3>《{{ seriesName }}》系列（共{{ seriesPosts.length }}篇）</h3>
    </div>

    <ol class="series-list">
      <li
        v-for="post in sortedPosts"
        :key="post.path"
        :class="{
          current: isCurrent(post),
          visited: checkVisited(post)
        }"
        @click="markAsVisited(post)"
      >
        <Link
          :item="{
            link: post.path,
            text: post.title,
            ariaLabel: post.title
          }"
        />
        <span v-if="isCurrent(post)" class="current-marker">▶ 阅读中</span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { usePageFrontmatter } from 'vuepress/client'
import { useExtendPageData } from '@vuepress-reco/vuepress-plugin-page/composables'
import Link from '@components/Link.vue'

const { posts } = useExtendPageData()

const frontmatter = usePageFrontmatter()

// 获取当前文章所属系列
const currentSeries = computed(() => {
  return frontmatter.value.series
})

// 获取系列名称（首篇文章的系列标题）
const seriesName = computed(() => {
  const firstPost = sortedPosts.value[0]

  return firstPost?.frontmatter.series_name || currentSeries.value
})

// 过滤出同系列文章
const seriesPosts = computed(() => {
  return posts.filter(
    page =>
      page.frontmatter.series === currentSeries.value &&
      !page.frontmatter.hidden
  )
})

// 按系列顺序排序
const sortedPosts = computed(() => {
  return [...seriesPosts.value].sort(
    (a, b) =>
      (a.frontmatter.series_order || 0) - (b.frontmatter.series_order || 0)
  )
})

const isCurrent = post => {
  return post.title === frontmatter.value.title
}

const checkVisited = post => {
  if (typeof window === 'undefined') return false
  const visited = JSON.parse(localStorage.getItem('visitedPosts') || '[]')
  return visited.includes(post.path)
}

const markAsVisited = post => {
  if (typeof window === 'undefined') return
  const visited = JSON.parse(localStorage.getItem('visitedPosts') || '[]')
  if (!visited.includes(post.path)) {
    visited.push(post.path)
    localStorage.setItem('visitedPosts', JSON.stringify(visited))
  }
}
</script>

<style>
.series-box {
  margin: 2rem 0;
  border-radius: 8px;
  background: var(--c-bg-light);
  border: 1px solid var(--c-border);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 2px 12px var(--c-shadow);
  }

  .series-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--c-brand);

    .icon {
      margin-right: 0.8rem;
      font-size: 1.5em;
    }

    h3 {
      margin: 0;
      font-size: 1.2em;
      color: var(--c-brand);
      padding: 0;
    }
  }
}

.series-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 0.1rem 1rem;
    margin: 0.3rem 0;
    border-radius: 6px;
    transition: all 0.2s;
    position: relative;
    cursor: pointer;

    a,
    span:not(.current-marker) {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background: var(--c-bg-lighter);
      transform: translateX(5px);
    }

    &.current {
      border-left: 4px solid var(--c-brand);
      background: linear-gradient(
        to right,
        rgba(93, 103, 232, 0.2),
        transparent
      ) !important;

      .current-marker {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.8em;
        opacity: 0.8;
      }
    }

    &.visited .series-link a {
      opacity: 0.7;
      position: relative;

      &::after {
        content: '✓';
        margin-left: 0.5rem;
        color: var(--c-brand);
      }
    }
  }
}

.series-link {
  a {
    color: var(--c-text);
    text-decoration: none;

    &:hover {
      color: var(--c-brand);
      text-decoration: underline;
    }
  }
}

@media (max-width: 768px) {
  .series-box {
    margin: 1rem 0;

    .series-header h3 {
      font-size: 1.1em;
    }
  }

  .series-list li {
    padding: 0 0.6rem;

    .current-marker {
      display: none;
    }
  }
}
</style>
