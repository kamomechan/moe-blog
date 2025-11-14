# moe-blog

## 简介

使用 nextjs 构建的萌萌 blog

## lighthouse

home page:

![screenshort](./articles/moe-blog/images/1.webp)

![screenshort](./articles/moe-blog/images/2.webp)

post page:

![screenshort](./articles/moe-blog/images/3.webp)

![screenshort](./articles/moe-blog/images/4.webp)

## 日志

- 2025-11-08 本来想使用 mdx 的，不过不支持直接导入相对路径的图片，暂且放弃，主要是因为在 markdown 文件中使用 import 有点麻烦，改天再试试，如果对 lighthouse 提升较大就使用

- 2025-11-09 切换到 mdx compiler 试试，顺便开启 GFM 插件

- 2025-11-09 测试了下性能果然提升了，毕竟 mdx 支持使用 Image 等组件嘛，与之相对的 marked 库只能转换 html，没有懒加载，自动设置尺寸等优化

## 任务清单

- [x] 导航栏

- [x] 分页

- [x] markdown to html

- [x] 代码语法高亮/复制按钮

- [x] 文章侧边栏

- [x] RSS

- [x] VNDB 阅读列表

- [ ] 类似 Pixiv 的图片查看器(移动端)

- [ ] 搜索框

- [ ] 黑暗模式

- [ ] 评论功能 (打算使用 Postgres 作为数据库)

## License

GNU AGPLv3
