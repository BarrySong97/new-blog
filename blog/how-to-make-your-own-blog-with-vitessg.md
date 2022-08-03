---
title: 使用vite-ssg超流畅搭建一个属于自己的blog
date: 2022-4-21
description: 如果你想搭建自己的blog又想定制自由度高，那么可以试试vite-ssg
duration: 15min
---


### 选择技术之前我在考虑什么

1. 静态站点，这样部署快。

2. 不用自己搭建模板，所用基础设施都给我配置好

3. vue或者react技术，其他不考虑

4. 可定制化高，像[vuepress](https://vuepress.vuejs.org/)和[docusaurus](https://docusaurus.io/)是写主题，改的话规矩比较多

   最后选择了大佬[Anthony Fu]([https://antfu.me](https://antfu.me/))自己写[vite-ssg](https://github.com/antfu/vite-ssg)的起手模板[vite-sse](https://github.com/antfu/vitesse)
<!--truncate-->
### 遇到的问题

首先vitesse这个起手模板已经给你解决太多问题，但是也太笨重了我后面搜素的时候看到一个lightweight的版本。

以下在开发过程中遇到的问题，大概率也可能是你遇到的问题

- 如何获得**postlist**也就是你的**blog**列表
- 如何使用**md**文件的**frontmatter**
- md文件自动生成**目录**
- 如何**部署**

### 如何获得你的post list（文章列表）

利用vue-router的useRouter获取到生成的routelist可以获取到所有的route

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()
const routes = router
  .getRoutes()
  .filter(i => i.path.startsWith('/posts'))
  .filter(v => v.name)
  .filter(v => v.name !== 'posts')

```

里面的数据长这个样子

```json
{
    "path": "/posts/is-let-hoisting",
    "name": "posts-is-let-hoisting",
    "meta": {
        "frontmatter": {
            "title": "变量提升？let到底有没有变量提升?",
            "date": "2022-3-22",
            "description": "现在看到了let和var，有讲到变量提升这个东西。这个时候我就有疑问，let变量提升吗？",
            "duration": "10min"
        }
    },
    "props": {
        "default": true
    },
    "children": [],
    "instances": {},
    "leaveGuards": {},
    "updateGuards": {},
    "enterCallbacks": {},
    "components": {}
}
```

目前我们获取到了post-list，我们仔细看里面的**frontmatter**属性。

```json
{
    "frontmatter": {
        "title": "变量提升？let到底有没有变量提升?",
        "date": "2022-3-22",
        "description": "现在看到了let和var，有讲到变量提升这个东西。这个时候我就有疑问，let变量提升吗？",
        "duration": "10min"
    }
}
```

也就是我们的下一个问题。

### 如何根据frontmatter来获取到文章信息

- 什么是frontmatter

  ```yaml
  ---
  title: about - Barry Song'blog
  description: about Barry Song
  ---
  ```

  如果你以前搭建过一些静态博客文档，那么你一定看到过这个东西在md文件里面。

  frontmatter是YAML格式语法，主要是用来描述这个文章。

  我的单个文章的的标题创建日期都可以从这里获得。

- 如何在vite-ssg里面获取到frontmatter的值

  ​	在vietesee之中我们是不能通过router里面是没有**frontmatter**这个属性的，我们需要特殊的配置。

  ​	打开你的vite.config.js里面找到page插件

  ```javascript
    Pages({
        extensions: ['vue', 'md'],
        extendRoute(route) {
          const path = resolve(__dirname, route.component.slice(1))
          // console.log(path)
  
          if (!path.includes('projects.md')) {
            const md = fs.readFileSync(path, 'utf-8')
            const { data } = matter(md)
            route.meta = Object.assign(route.meta || {}, { frontmatter: data })
          }
  
          return route
        },
      }),
  ```

  ​	把缺失的代码补上去

  ​	当然还要安装额外的依赖

  ```shell
  pnpm add -D fs-extra
  pnpm add gray-matter
  
  import matter from 'gray-matter'
  import fs from 'fs-extra'
  ```

  ​	你就能在router里面获取到frontmatter。

- frontmatter的另类用法

  ```markdown
  ---
  title: projects - Barry Song'blog
  description: some projects I made
  projects:
    Dev Efficiency:
      - name: 'Knife4j2TSApi'
        link: 'https://github.com/BarrySong97/Knife4j2TS'
        desc: 'Knife4j openapi.json to TypeScript Api and Types'
  ---
  <ListProjects :projects="frontmatter.projects"/>
  ```

  首先在vuesse里面有插件把vue和md打通了，你可以在md文件里面使用vue组件。

  但是如果我们组件需要props的时候，我们可以通过以上的方法来获取到frontmatter的值，用来渲染某个页面

### md文件自动生成目录

​	vitesse的md处理是不会自动生成目录的，所以还需要我们自己弄。

​	不过还好，社区早就写好了插件，我么只需要配置就行。

```shell
pnpm add markdown-it-anchor
pnpm add markdown-it-table-of-contents

import TOC from 'markdown-it-table-of-contents'
import Unocss from 'unocss/vite'
```

​	找到**md**插件在**vite.config.js**

```javascript
Markdown({
      wrapperClasses: markdownWrapperClasses,
      headEnabled: true,
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism)
        md.use(MarkdownItAnchor)
        // add code syntax highlighting with Prism
        md.use(TOC, {
          includeLevel: [1, 2, 3],
        })
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
      },
    }),
```

​	最后在你的**md**文件里面加上

```markdown
[[toc]]
```

​	会自动生成目录

​	当然还有一个问题就是样式不喜欢

​	在**styles/markdown.css**里面可以配置

### 如何部署

​	部署是最最最简单的事情

​	访问[netlify](https://www.netlify.com/)直接**github**登录

​	然后跟着指引你会到一个选择仓库的界面，你需要选择你的blog的仓库，就会自动发布，vitesse早就为你配置好了netlify的配置。

​	说在最后

​	每次你更新main分支的代码或者其他在部署时选择的分支，netlify会自动重新部署。

### 总结

​	其实我玩过不同技术栈静态博客，**hexo**到[vuepress](https://vuepress.vuejs.org/)和[docusaurus](https://docusaurus.io/)，但是我始终都没有做起来，只是摆烂。

​	这次和前面有什么不同呢？

​	这次的博客长什么样由我自己决定，以前是直接用别人写好的模板，完全由我一个人完成可以算是我的一个作品。

​	这个月我刚换好工作，我当初写简历的时候，在个人作品一栏，什么都写不出来。

​	我陷入了沉思，哪怕我写个模仿的作品是不是会让面试官眼前一亮呢？

