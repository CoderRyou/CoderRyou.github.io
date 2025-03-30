import { defineUserConfig } from "vuepress";
import recoTheme from "vuepress-theme-reco";
import { viteBundler } from '@vuepress/bundler-vite'
import { markdownTabPlugin } from '@vuepress/plugin-markdown-tab'

export default defineUserConfig({
  title: "Ryouhh's Blog",
  description: "Ryouhh's Blog",
  bundler: viteBundler(),
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  // bundler: webpackBundler(),
  theme: recoTheme({
    logo: "/logo.svg",
    author: "Ryouhh",
    authorAvatar: "/logo.svg",
    docsRepo: "https://github.com/CoderRyou/CoderRyou.github.io",
    docsBranch: "master",
    // series 为原 sidebar
    series: {
      "/docs/theme-reco/": [
        {
          text: "module one",
          children: ["home", "theme"],
        },
        {
          text: "module two",
          children: ["api", "plugin"],
        },
      ],
    },
    navbar: [
      { text: "首页", link: "/", icon: "IconHome" },
      { text: "分类", link: "/categories/riyu/1.html", icon: "IconCate" },
      { text: "标签", link: "/tags/riyu/1.html", icon: "IconTag" },
      { text: "博客", link: "/posts.html", icon: "IconBlog" },
      { text: "时间轴", link: "/timeline.html", icon: "IconTimeline" },
    ],
    // bulletin: {
    //   body: [
    //     {
    //       type: "text",
    //       content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "QQ 群",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li>QQ群1：1037296104</li>
    //         <li>QQ群2：1061561395</li>
    //         <li>QQ群3：962687802</li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "title",
    //       content: "GitHub",
    //     },
    //     {
    //       type: "text",
    //       content: `
    //       <ul>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
    //         <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
    //       </ul>`,
    //       style: "font-size: 12px;",
    //     },
    //     {
    //       type: "hr",
    //     },
    //     {
    //       type: "buttongroup",
    //       children: [
    //         {
    //           text: "打赏",
    //           link: "/docs/others/donate.html",
    //         },
    //       ],
    //     },
    //   ],
    // },
    // commentConfig: {
    //   type: 'valine',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
    tip: '提示',
    info: '信息',
    danger: '危险',
    warning: '警告',
    details: '详情',
    tagsText: '标签',
    backToHome: '返回首页',
    categoriesText: '分类',
    catalogTitle: '页面导航',
    editLinkText: '编辑当前页面',
    lastUpdatedText: '最后更新时间',
    selectLanguageName: '简体中文',
    notFound: '哇哦，没有发现这个页面！',
    inputPasswordText: '请输入密码',
    unlockSucessText: '密码正确，玩得开心！',
    unlockFailuerText: '密码错误，请重新输入！'
  }),
  // debug: true,
  head: [
    // 预连接到字体服务
    ["link", { rel: "preconnect", href: "https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest", crossorigin: "anonymous" }],
    // 导入 LXGW Wenkai 字体样式表
    ["link", {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest/style.css"
    }],
  ],
  plugins: [
    markdownTabPlugin({
      // 启用代码选项卡
      codeTabs: true,
      // 启用选项卡
      tabs: true,
    }),
  ],
});
