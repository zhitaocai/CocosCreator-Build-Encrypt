# CocosCreator-Build-Encrypt

[![](https://img.shields.io/badge/Release-0.1.0-green.svg)](CHANGELOG.md)
[![](https://img.shields.io/badge/Cocos%20Creator-2.3.3-orange.svg)](http://www.cocos.com/creator)

一种 Cocos Creator **无侵入** 资源加密方案。

> **无侵入**：开发者只需要针对 Cocos Creator 构建后的输出目录执行下面命令操作即完成资源加密，**实际游戏项目不需要加入/删除/修改代码等其他操作，全程无侵入**

## 使用方式

1. 下载并初始化项目

```
git clone git@github.com:zhitaocai/CocosCreator-Build-Encrypt.git
cd CocosCreator-Build-Encrypt
npm install -s 
```

2. 对 **构建后的CocosCreator输出目录** 进行加密处理的命令

```
cd CocosCreator-Build-Encrypt
npm run build buildOutputDirAbsPath
```

参数说明：

* `buildOutputDirAbsPath` : Cocos Creator 构建项目后的输出路径绝对路径。如：/Users/xxx/CocosCreator/HelloWorld/build/jsb-link


示例：

```
// 对 /Users/xxx/CocosCreator/HelloWorld/build/jsb-link 目录进行资源加密
npm run build /Users/xxx/CocosCreator/HelloWorld/build/jsb-link
```

3. 命令构建成功即表示已加密完成，此时可以直接用对应平台的打开方式（Android Studio，XCode等）去执行此项目


## 实现原理

Working on...