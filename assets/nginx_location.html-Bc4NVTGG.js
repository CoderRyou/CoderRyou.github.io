import{_ as s,c as a,b as i,o as e}from"./app-HIKONubV.js";const l={};function c(d,n){return e(),a("div",null,n[0]||(n[0]=[i(`<h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法"><span>语法</span></a></h2><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line"># 语法一</span>
<span class="line">location [ = | ~ | ~* | ^~ ] uri {</span>
<span class="line">  ...</span>
<span class="line">};</span>
<span class="line"></span>
<span class="line"># 语法二</span>
<span class="line">location @name { </span>
<span class="line">  ...</span>
<span class="line">};</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="匹配规则" tabindex="-1"><a class="header-anchor" href="#匹配规则"><span>匹配规则</span></a></h2><p>匹配规则的优先级从高到低依次是：精确匹配（<code>=</code>）、前缀匹配（<code>^~</code>）、正则匹配（<code>~</code> 和 <code>~*</code>）、通用匹配（无修正符）</p><h3 id="精确匹配" tabindex="-1"><a class="header-anchor" href="#精确匹配"><span>精确匹配（<code>=</code>）</span></a></h3><p><strong>最高优先级</strong>，仅当 URL 完全匹配时生效。例如，location = /login 仅匹配请求 URI 为 /login 的请求。</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location = /login {</span>
<span class="line">    # 仅匹配 \`/login\`，不匹配 \`/login/\` 或 \`/login?param=1\`</span>
<span class="line">    proxy_pass http://backend;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前缀匹配" tabindex="-1"><a class="header-anchor" href="#前缀匹配"><span>前缀匹配（<code>^~</code>）</span></a></h3><p>当请求的 URI 以 location 后面定义的字符串开头时，将匹配该规则，当有多个前缀匹配时，Nginx 会使用<strong>前缀最长</strong>的规则。当前缀匹配规则匹配上时，会忽略掉后续的正则匹配。</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location ^~ /static/ {</span>
<span class="line">    # 匹配 \`/static/js/app.js\`、\`/static/images/logo.png\` 等</span>
<span class="line">    root /var/www/assets;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="正则匹配-和" tabindex="-1"><a class="header-anchor" href="#正则匹配-和"><span>正则匹配（<code>~</code> 和 <code>~*</code>）</span></a></h3><p>正则匹配允许使用正则表达式来定义复杂的匹配条件。按配置文件中的顺序匹配，第一个匹配成功的生效。</p><ul><li><code>~</code>：区分大小写的正则匹配。</li><li><code>~*</code>：不区分大小写的正则匹配。</li></ul><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location ~* \\.(jpg|png|gif)$ {</span>
<span class="line">    # 匹配所有图片文件，不区分大小写（如 \`/IMG/logo.JPG\`）</span>
<span class="line">    expires 30d;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通用匹配-无修正符" tabindex="-1"><a class="header-anchor" href="#通用匹配-无修正符"><span>通用匹配（无修正符）</span></a></h3><p>同样是前缀匹配，但是优先级比正则匹配低。</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /api {</span>
<span class="line">    # 匹配 \`/api/users\`、\`/api/v2/data\` 等</span>
<span class="line">    proxy_pass http://api_server;</span>
<span class="line">}</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="uri-是否以斜杠结尾的区别" tabindex="-1"><a class="header-anchor" href="#uri-是否以斜杠结尾的区别"><span>URI 是否以斜杠结尾的区别</span></a></h2><h3 id="location-中的-uri" tabindex="-1"><a class="header-anchor" href="#location-中的-uri"><span>location 中的 URI</span></a></h3><ul><li>以斜杠结尾：<code>location /path/</code><ul><li>只匹配以 <code>/path/</code> 开头的 URL，且要求 URL 的路径部分必须以 <code>/path/</code> 开头。</li><li>不会匹配 <code>/path</code>（没有结尾斜杠的路径）。</li><li>常用于匹配目录（如静态资源目录）。</li></ul></li><li>不以斜杠结尾：<code>location /path</code><ul><li>匹配以 /path 开头的所有 URL，包括：<code>/path?a=b</code>、<code>/path.xxx</code>。</li><li>更宽松的匹配规则，可能同时匹配文件和目录。</li></ul></li></ul><h3 id="proxy-pass-中的-uri" tabindex="-1"><a class="header-anchor" href="#proxy-pass-中的-uri"><span>proxy_pass 中的 URI</span></a></h3><ul><li>当 <code>proxy_pass</code> 指令末尾带斜杠时，Nginx 会忽略 <code>location</code> 指令中的路径，只将请求路径的剩余部分转发到后端服务器。</li><li>当 <code>proxy_pass</code> 指令末尾不带斜杠时，Nginx 会将 <code>location</code> 指令中的路径与请求路径拼接后转发到后端服务器。</li></ul><p>示例：</p><div class="language-conf line-numbers-mode" data-highlighter="prismjs" data-ext="conf" data-title="conf"><pre><code><span class="line">location /api/ {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000/;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000/test</span>
<span class="line"></span>
<span class="line">location /api/ {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000/api/test</span>
<span class="line"></span>
<span class="line">location /api {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000/;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000//test</span>
<span class="line"></span>
<span class="line">location /api {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000/;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000//test</span>
<span class="line"></span>
<span class="line">location /api/ {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000/user/;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000/user/test</span>
<span class="line"></span>
<span class="line">location /api/ {</span>
<span class="line">  proxy_pass http://127.0.0.1:8000/user;</span>
<span class="line">}</span>
<span class="line"># 请求地址：http://localhost/api/test</span>
<span class="line"># 转发地址：http://127.0.0.1:8000/usertest</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24)]))}const t=s(l,[["render",c]]),r=JSON.parse('{"path":"/blogs/nginx/nginx_location.html","title":"Nginx localtion 匹配规则详解","lang":"zh-CN","frontmatter":{"title":"Nginx localtion 匹配规则详解","date":"2025/04/03","tags":["nginx"],"categories":["nginx","技术分享"]},"headers":[{"level":2,"title":"语法","slug":"语法","link":"#语法","children":[]},{"level":2,"title":"匹配规则","slug":"匹配规则","link":"#匹配规则","children":[{"level":3,"title":"精确匹配（=）","slug":"精确匹配","link":"#精确匹配","children":[]},{"level":3,"title":"前缀匹配（^~）","slug":"前缀匹配","link":"#前缀匹配","children":[]},{"level":3,"title":"正则匹配（~ 和 ~*）","slug":"正则匹配-和","link":"#正则匹配-和","children":[]},{"level":3,"title":"通用匹配（无修正符）","slug":"通用匹配-无修正符","link":"#通用匹配-无修正符","children":[]}]},{"level":2,"title":"URI 是否以斜杠结尾的区别","slug":"uri-是否以斜杠结尾的区别","link":"#uri-是否以斜杠结尾的区别","children":[{"level":3,"title":"location 中的 URI","slug":"location-中的-uri","link":"#location-中的-uri","children":[]},{"level":3,"title":"proxy_pass 中的 URI","slug":"proxy-pass-中的-uri","link":"#proxy-pass-中的-uri","children":[]}]}],"git":{"createdTime":1770481382000,"updatedTime":1770481382000,"contributors":[{"name":"CoderRyou","email":"zxc1106190679@qq.com","commits":1}]},"filePathRelative":"blogs/nginx/nginx_location.md"}');export{t as comp,r as data};
