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

    export function start() {
        console.log("当前执行文件所在目录", __dirname);
        console.log("当前执行文件绝对路径", __filename);
        console.log("可执行文件路径", process.argv[0]);
        console.log("将执行的脚本路径", process.argv[1]);
        console.log("传入参数", process.argv.slice(2));

        let pngRootDirPath: string = process.argv[2];
        let pngFilePaths: string[] = [];
        getAllPngFile(pngRootDirPath, pngFilePaths);
        console.log(`找到 ${pngFilePaths.length} 张图片`);

        pngFilePaths.forEach((filePath: string) => {
            let fileBuffer: Buffer = fs.readFileSync(filePath);
            let targetFilePath = filePath + ".encrypt";
            if (fs.existsSync(targetFilePath)) {
                console.log(filePath.substring(pngRootDirPath.length + 1), "->", targetFilePath.substring(pngRootDirPath.length + 1), "(Pass)");
            } else {
                fs.writeFileSync(targetFilePath, fileBuffer.toString("base64"));
                console.log(filePath.substring(pngRootDirPath.length + 1), "->", targetFilePath.substring(pngRootDirPath.length + 1), "(Complete)");
            }
        });
    }
}

zz.start();
