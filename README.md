# CocosCreator-Build-Encrypt

[![](https://img.shields.io/badge/Release-0.3.0-orange.svg)](CHANGELOG.md)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%202.3.3-brightgreen.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Support-Cocos%20Creator%202.3.4-brightgreen.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Unknown%20Support-Cocos%20Creator%202.x.x-lightgrey.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Not%20Support-Cocos%20Creator%202.4.+-red.svg)](http://www.cocos.com/creator)
[![](https://img.shields.io/badge/Not%20Support-Cocos%20Creator%201.x.x-red.svg)](http://www.cocos.com/creator)


一种 Cocos Creator **「无侵入」** **「全资源支持」** **「跨平台」** **「资源处理流」** 方案。

> * **「无侵入」**：使用此方案，开发者只需要针对 Cocos Creator **构建后的输出目录** 进行执行指定命令，即完成资源加密。 **实际游戏项目不需要加入/删除/修改代码等其他操作，全程无侵入**。
> * **「全资源支持」**：此方案可以对 Cocos Creator 引擎本身所支持的 **所有资源文件(如：.txt，.json, .png, .mp3, .fnt等等)进行加密** ，并且依旧「无侵入」。
> * **「跨平台」**：此方案可以针对不同版本的 Cocos  Creator 进行单独适配，并且可以对每个 Cocos Creator 支持发布的所有平台进行单独适配。
> * **「资源处理流」**：使用此方案，你可以对资源进行包括但不限于 **加密** 、 **压缩** 等处理流。

## 一、使用方式

1. 下载并初始化项目

    ````
    git clone git@github.com:zhitaocai/CocosCreator-Build-Encrypt.git
    cd CocosCreator-Build-Encrypt
    npm install -s 
    ````

2. 对 **构建后的CocosCreator输出目录** 进行加密处理的命令

    ```
    cd CocosCreator-Build-Encrypt
    npm run build buildOutputDirAbsPath
    ```

    参数说明：

    * `buildOutputDirAbsPath` : Cocos Creator 构建项目后的输出路径绝对路径。如：/Users/xxx/CocosCreator/HelloWorld/build/jsb-link


    示例：

    ```
    # 对 /Users/xxx/CocosCreator/HelloWorld/build/jsb-link 目录进行资源加密
    npm run build /Users/xxx/CocosCreator/HelloWorld/build/jsb-link
    ```

3. 命令构建成功即表示已加密完成，此时可以直接用对应平台的打开方式（如：Android Studio，XCode 等）去执行此项目

## 二、Cocos Creator 支持情况

### Cocos Creator 2.4.+

目前不支持（后续可能会有计划支持）

### Cocos Creator 2.3.3 & 2.3.4

| 支持的资源 | 原生平台 |
| ---------- | -------- |
| png        | Y        |
| jpg        | Y        |
| jpeg       | Y        |
| gif        | Y        |
| webp       | Y        |
| txt        | Y        |
| json       | Y        |


### Cocos Creator 2.x.x( < 2.3.3)

可能可以，未进行测试，且后续也不会有计划支持

### Cocos Creator 1.x.x

后续不会有计划支持

## 三、项目实现原理

> https://www.jianshu.com/p/05e8ecd89122

## 四、支持一下作者吧

如果此项目对你有帮助，不妨支持一下我吧~

ps：支持扫码催更哦🤣🤣🤣👇👇👇👇

![](static/PAY.png)


## LICENSE

    MIT License

    Copyright (c) 2020 Zhitao Cai

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
