import * as fs from "fs";
import * as path from "path";
import { PathLike } from "fs";

export namespace zz {
    /**
     * 获取指定目录的所有图片文件路径
     *
     * @param dirName 目录名
     * @param filePaths 接受图片文件路径的数组
     */
    function getAllPngFile(dirName: string, filePaths: string[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }

        let files = fs.readdirSync(dirName);
        files.forEach((fileName: PathLike) => {
            let filePath = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(filePath);
            if (stat.isDirectory()) {
                getAllPngFile(filePath, filePaths);
            } else {
                if (path.extname(filePath) === ".png") {
                    filePaths.push(filePath);
                }
            }
        });
    }

    /**
     * 处理构建后的 main.js 插入一个插件脚本
     *
     * 此插件降本将重写 cc.loader 部分资源的 pipe 以解密处于密文状态的资源
     */
    function handleMainJs(mainJsFilePath: string) {
        let lockFilePath = mainJsFilePath + ".lock";
        if (fs.existsSync(lockFilePath)) {
            console.log(`main.js 已经处理完毕，将不再处理，如果需要重新处理，请删除 ${lockFilePath}`);
            return;
        }

        let fileBuffer: Buffer = fs.readFileSync(mainJsFilePath);
        let fileContentText = fileBuffer.toString();
        let fileChunks = fileContentText.split("var jsList = settings.jsList;");
        console.log(fileChunks);
        let aopCodeBlock = `
    var jsList = settings.jsList;

    //////////////////////////////////////////
    // 插入代码：开始

    if (jsList) {
        jsList.unshift("src/assets/zzloader.js");
    }
    
    // 插入代码：结束
    //////////////////////////////////////////
`;
        let newMainJsFileContent = fileChunks.join(aopCodeBlock);
        fs.writeFileSync(mainJsFilePath, newMainJsFileContent);

        // 加入处理完的文件标识
        fs.writeFileSync(lockFilePath, "");

        console.log(`main.js 处理完毕`);
    }

    /**
     * 加入插件脚本
     */
    function cpzzLoader(inputPluginScritFilePath: string, outputPluginScriptFilePath: string) {
        // 已经加入了的就不处理
        let lockFilePath = outputPluginScriptFilePath + ".lock";
        if (fs.existsSync(lockFilePath)) {
            console.log(`插件脚本已经加入，将不再处理，如果需要重新处理，请删除 ${lockFilePath}`);
            return;
        }

        // 创建目录
        if (fs.existsSync(outputPluginScriptFilePath)) {
            if (fs.statSync(outputPluginScriptFilePath).isDirectory()) {
                fs.rmdirSync(outputPluginScriptFilePath);
            }
        } else {
            fs.mkdirSync(path.dirname(outputPluginScriptFilePath));
        }

        // 写入文件
        let inputJsFileBuffer: Buffer = fs.readFileSync(inputPluginScritFilePath);
        fs.writeFileSync(outputPluginScriptFilePath, inputJsFileBuffer.toString());
        // 加入处理完的文件标识
        fs.writeFileSync(lockFilePath, "");
        console.log(`插件脚本加入完毕`);
    }

    export function start() {
        console.log("当前执行文件所在目录路径", __dirname);
        console.log("当前执行文件绝对路径", __filename);
        console.log("当前执行node命令的目录路径", process.cwd());
        console.log("可执行文件路径", process.argv[0]);
        console.log("将执行的脚本路径", process.argv[1]);
        console.log("传入参数", process.argv.slice(2));

        // 构建输出目录的平台路径
        // 如： /Users/xxx/CocosCreator/CocosGame/build/jsb-link
        let buildOutputDirPath: string = process.argv[2];

        // 资源目录
        // 如： /Users/xxx/CocosCreator/CocosGame/build/jsb-link/res
        let buildOutputResDirPath: string = path.join(buildOutputDirPath, "res");

        // main.js
        // 如： /Users/xxx/CocosCreator/CocosGame/build/jsb-link/main.js
        let buildOutputMainJsFilePath: string = path.join(buildOutputDirPath, "main.js");

        // 插件脚本路径
        let inputLoaderPluginJsFilePath: string = path.join(__dirname, "zzloader.js");
        let buildOutputLoaderJsFilePath: string = path.join(buildOutputDirPath, "src/assets/zzloader.js");

        let imgFilePaths: string[] = [];
        getAllPngFile(buildOutputResDirPath, imgFilePaths);
        console.log(`找到 ${imgFilePaths.length} 张图片(png)`);

        imgFilePaths.forEach((filePath: string) => {
            let fileBuffer: Buffer = fs.readFileSync(filePath);
            let targetFilePath = filePath + ".txt";
            if (fs.existsSync(targetFilePath)) {
                console.log(filePath, "->", targetFilePath, "(Pass)");
            } else {
                fs.writeFileSync(targetFilePath, fileBuffer.toString("base64"));
                console.log(filePath, "->", targetFilePath, "(Complete)");
            }
        });

        handleMainJs(buildOutputMainJsFilePath);
        cpzzLoader(inputLoaderPluginJsFilePath, buildOutputLoaderJsFilePath);
    }
}

zz.start();
