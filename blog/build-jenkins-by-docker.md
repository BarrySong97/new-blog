---
title: 使用Docker部署Jenkins
date: 2022-08-17T14:12
authors: Barry
tags: [Docker, CD/CI, 写给新手看的]
---

## 前言

最近在给公司前端搭建组件库。

搭建组件库就意味着需要一套完整 CI/CD 流程

很早之前就知道这一套技术栈，像是 Jenkins，Docker...

但是个人的很少有使用场景，比如我这个 blog 直接在 netlify 上面就部署了，只需要写个配置文件。

加上自己维护一个服务器成本也很高。

作为一个前端其实不太需要了解这些，因为这些是运维何后端做的。

当然如果你在几个人的公司，那么你多半是全干。

如果想要以后自己做私活，提升自己的能力，有更强的竞争力，学无止境！

## 正文

首先我们不需要和很多年前一样

- 🟢 下载 Jenkins 依赖
- 🟡 安装 jenkins
- 🔴 配置 Jenkins

我们使用 Docker 安装 Jenkins，作为前端我们不需要了解太深入服务器上的事情，专注工具的使用和效率

<!--truncate-->

### 安装 Docker

:::note

注意，这里只默认 linux unbuntu 环境。可以买一个云服务器，基本每个月腾讯与和阿里云都会打仗买一些小型服务器。如果不想买云服务器可以本地开一个虚拟机，或者使用 windows terminal。

:::

如果以前安装过但是有问题，可以先删除以前的东西，重新安装

```shell
sudo apt remove docker-desktop
rm -r $HOME/.docker/desktop
sudo rm /usr/local/bin/com.docker.cli
sudo apt purge docker-desktop
```

安装前置设施

```bash
sudo apt-get update

sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
```

设置 Docker 的 GPG key

```bash
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

设置 Docker 安装地址仓库

```bash
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

开始安装 Docker

```bash
sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

启动 Docker

最后是老生常谈的配置国内源，不然速度很慢

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://fwvjnv59.mirror.aliyuncs.com"]
}
EOF
```

:::success

如果你想知道在不开镜像就能获得加速，可以看一下这一篇文章，不过目前只解决本地问题

[给前端项目配置代码规范工具](https://www.barrysong4real.cc/blog/boot-your-depencies-speed)

:::

### 安装 Jenkins
