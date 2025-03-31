---
title: Shell中读取文件每行的方法
date: 2025/03/31
tags:
 - shell
categories:
 - shell
 - 技术分享
---

在Shell脚本编程中，读取文件的每一行并进行处理是一项常见的任务。有多种方法可以实现这一点，但最常用的是`while read line`循环。这种方法可以逐行读取文件，并将每行的内容赋值给变量，然后在循环体内对该变量进行操作。

以下是几种使用`while read line`读取文件每行的方法及其示例：

## 使用重定向

```shell
#!/bin/bash
while read line
do
echo $line
done < test.txt
```

在这个例子中，`< test.txt`将文件`test.txt`的内容重定向到`while`循环中。`read line`命令从文件中读取一行，并将其存储在变量`line`中。然后`echo $line`将这一行打印到标准输出。

## 使用管道

```shell
#!/bin/bash
cat test.txt | while read line
do
echo $line
done
```

这个例子中，`cat test.txt`命令的输出通过管道传递给`while read line`循环。这种方法的效果与使用重定向类似，但是它在子shell中执行，这意味着在循环内部对变量进行的任何修改在循环外部都不会保留。

## 使用for循环

```shell
for line in \`cat test.txt\`
do
echo $line
done
```

`for`循环与`while read line`循环有所不同。`for`循环会读取文件中的每个以空格分隔的字符串，而不是逐行读取。这可能会导致不同的行为，尤其是当文件中的行包含空格时。

::: tip 总结

+ 在选择使用哪种方法时，通常推荐使用**重定向**的方式，因为它在当前shell环境下执行，并且循环内的变量赋值在退出循环后仍然有效。此外，使用重定向的方式每次只占用一行数据的内存，而不是整个文件的内容。
+ 在实际应用中，`while read line`循环可以用于各种场景，例如从文件中读取配置信息，处理日志文件，或者作为数据库备份脚本的一部分。通过结合其他Shell命令和脚本逻辑，`while read line`提供了一种灵活且强大的方式来处理文本文件的每一行。

:::
