---
title: Nginx localtion 匹配规则详解
date: 2025/04/03
tags:
 - nginx
categories:
 - nginx
 - 技术分享
---

## 语法

```conf
# 语法一
location [ = | ~ | ~* | ^~ ] uri {
  ...
};

# 语法二
location @name { 
  ...
};
```

## 匹配规则

匹配规则的优先级从高到低依次是：精确匹配（`=`）、前缀匹配（`^~`）、正则匹配（`~` 和 `~*`）、通用匹配（无修正符）

### 精确匹配（`=`）

**最高优先级**，仅当 URL 完全匹配时生效。例如，location = /login 仅匹配请求 URI 为 /login 的请求。

```conf
location = /login {
    # 仅匹配 `/login`，不匹配 `/login/` 或 `/login?param=1`
    proxy_pass http://backend;
}
```

### 前缀匹配（`^~`）

当请求的 URI 以 location 后面定义的字符串开头时，将匹配该规则，当有多个前缀匹配时，Nginx 会使用**前缀最长**的规则。当前缀匹配规则匹配上时，会忽略掉后续的正则匹配。

```conf
location ^~ /static/ {
    # 匹配 `/static/js/app.js`、`/static/images/logo.png` 等
    root /var/www/assets;
}
```

### 正则匹配（`~` 和 `~*`）

正则匹配允许使用正则表达式来定义复杂的匹配条件。按配置文件中的顺序匹配，第一个匹配成功的生效。

+ `~`：区分大小写的正则匹配。
+ `~*`：不区分大小写的正则匹配。

```conf
location ~* \.(jpg|png|gif)$ {
    # 匹配所有图片文件，不区分大小写（如 `/IMG/logo.JPG`）
    expires 30d;
}
```

### 通用匹配（无修正符）

同样是前缀匹配，但是优先级比正则匹配低。

```conf
location /api {
    # 匹配 `/api/users`、`/api/v2/data` 等
    proxy_pass http://api_server;
}
```

## URI 是否以斜杠结尾的区别

### location 中的 URI

+ 以斜杠结尾：`location /path/`
  + 只匹配以 `/path/` 开头的 URL，且要求 URL 的路径部分必须以 `/path/` 开头。
  + 不会匹配 `/path`（没有结尾斜杠的路径）。
  + 常用于匹配目录（如静态资源目录）。
+ 不以斜杠结尾：`location /path`
  + 匹配以 /path 开头的所有 URL，包括：`/path?a=b`、`/path.xxx`。
  + 更宽松的匹配规则，可能同时匹配文件和目录。

### proxy_pass 中的 URI

+ 当 `proxy_pass` 指令末尾带斜杠时，Nginx 会忽略 `location` 指令中的路径，只将请求路径的剩余部分转发到后端服务器。
+ 当 `proxy_pass` 指令末尾不带斜杠时，Nginx 会将 `location` 指令中的路径与请求路径拼接后转发到后端服务器。

示例：

```conf
location /api/ {
  proxy_pass http://127.0.0.1:8000/;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000/test

location /api/ {
  proxy_pass http://127.0.0.1:8000;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000/api/test

location /api {
  proxy_pass http://127.0.0.1:8000/;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000//test

location /api {
  proxy_pass http://127.0.0.1:8000/;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000//test

location /api/ {
  proxy_pass http://127.0.0.1:8000/user/;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000/user/test

location /api/ {
  proxy_pass http://127.0.0.1:8000/user;
}
# 请求地址：http://localhost/api/test
# 转发地址：http://127.0.0.1:8000/usertest
```
