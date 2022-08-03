---
title: 给前端项目配置添加commit规范和代码规范检查
date: 2021-6-19
description: 代码规范一直以来都是开发的重点，我们需要降低各种低级错误，不让一些没有必要的代码进入到我们项目当中，大多数时候我们写代码不是一个人在写，而是团队合作，所以规范能够让团队更好的协作。
authors: Barry
---

# 前言
为什么要添加commit和代码质量规范
- commit规范可以让git回滚时间节点更加清晰，如果commit大家都乱写一通，当出了问题需要回滚的时候就会很难受，为什么当初不好好写commit，当然人是很懒的，我们需要工具来帮助我们快速添加一个格式化的commit。
- 代码规范一直以来都是开发的重点，我们需要降低各种低级错误，不让一些没有必要的代码进入到我们项目当中，大多数时候我们写代码不是一个人在写，而是团队合作，所以规范能够让团队更好的协作。
# 正文
## 配置commit规范
### [cz-cli](https://github.com/commitizen/cz-cli) 

```js
npm install -g commitizen
```
首先全局安装commitizen
给你的项目配置成commitizen友好型项目

```js
commitizen init cz-conventional-changelog --save-dev --save-exact// npm
commitizen init cz-conventional-changelog --yarn --dev --exact// yarn
```

在package.json里面添加

```js
 "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
```

cz-conventional-changelog是commit的模板，当然模板是可以自定义的，这个详细去看cz-cli的文档，但是估计你们也不会看。
`git cz`用来打开commitizen,如果不想全局安装可以使用`npx cz`

![commit.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f10c7cc06214d0e8ac374608e60ba2f~tplv-k3u1fbpfcp-watermark.image)
里面各种属性暂且不详细看是什么意思，通过以下这个工具后，会生成commit规范大概长这样：

【动作】(主要做了什么简短几个字就行)：详细信息

```js
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```
###  [commitlint](https://github.com/conventional-changelog/commitlint)
committizen是生成规范commit的个工具，而commitlint则是检查commit是否符合规范的工具，安装完成以后需要给commitlint添加一个配置文件`commitlint.config.js`，用来确定你的commit使用的那种规范。

```js
module.exports = { extends: ['@commitlint/config-conventional'] }
```



### [husky ](https://github.com/typicode/husky)
配置husky，我们就可以很简单的使用git hooks，在commit完成后检查commit是否合格

```js
npx husky-init && npm install       # npm
npx husky-init && yarn              # Yarn 1
yarn dlx husky-init --yarn2 && yarn # Yarn 2

npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

项目里面会出现这样一个文件夹，打开commit-msg。然后在你完成commit以后就会通过commitlint来检测你的commit是否符合规范。
最后在`package.json`里面添加

`"prepare": "husky install",`

当别人在拉最新代码并npm i的时候会自动装husky

在windows下会有这个问题https://github.com/typicode/husky/issues/864

应该是powershell要背锅的，所以最好别用powershell。
## 配置代码规范（这里以React TS为例）
### [Eslint](https://eslint.org/docs/user-guide/getting-started)

```js
npm install eslint --save-dev //安装eslint，tslint已经迁移到了eslint
npx eslint --init//会出现以下内容，根据自己的需求选择
```


别忘记给你eslint加上`.eslintignore`

### [Prettier](https://prettier.io/docs/en/install.html)

```js
npm install --save-dev --save-exact prettier
echo {}> .prettierrc.json
```

.prettierrc

```js
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```
更具忽略的需求可以添加一个`.prettierignore`

### [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
让prettier作为eslint的一个插件
在eslintrc plugin里面添加
```js
npm install --save-dev eslint-plugin-prettier
npm install --save-dev --save-exact prettier
```
```js
{
  "plugins": ["prettier"],
}
```

### [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
配置完前面两个东西，会出现一个问题，eslint和prettier都有对格式的修改，那么必然会有冲突，所以在prettier的文档里面出现了这个工具来解决问题


```js
npm install --save-dev eslint-config-prettier
```
在根目录.eslintrc.js的extend添加一个 `"extends": ["plugin:prettier/recommended"]`

```
{
  "extends": ["plugin:prettier/recommended"],
}
```

### [lint-staged](https://github.com/okonet/lint-staged)
用lint-stage来使用eslint来检查你刚刚提交的代码。

```js
npx mrm@2 lint-staged
```
在根目录添加一个`lint-stage.config.js`

```js
module.exports = {
  '*.{ts,tsx}': ['eslint --fix'],
}
```
配合husky
```
npx husky add .husky/pre-commit 'npx lint-staged'
```
如果成功了上面那张图
![commit.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9f10c7cc06214d0e8ac374608e60ba2f~tplv-k3u1fbpfcp-watermark.image)
最后eslintrc

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'google',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off', // 如果出现问题可以尝试把这个加上去
  },
}
```


