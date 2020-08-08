import fs from "fs";
import path from "path";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

enum TextType {
    TXT,
    JSON,
}

type TextObject = {
    /**
     * 图片类型
     */
    type: TextType;

    /**
     * 图片路径
     */
    filePath: string;
};

export class TextEncryptTask implements TaskInterface {
    handle(taskConfig: TaskConfig): void {
        // 收集输出目录的文本文件
        let texts: TextObject[] = [];
        this._collectTextFilePaths(taskConfig.buildOutputResDirPath, texts);
        console.log(`文本处理：找到 ${texts.length} 个文本文件`);

        // 加密文本文件
        this._encryptText(texts);
        console.log(`文本处理：${texts.length} 个文本文件已加密完成`);
    }

    /**
     * 获取指定目录的所有文本文件路径
     *
     * @param dirName 目录名
     * @param texts 接受文本文件的数组
     */
    private _collectTextFilePaths(dirName: string, texts: TextObject[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }

        let files = fs.readdirSync(dirName);
        files.forEach((fileName: fs.PathLike) => {
            let filePath = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this._collectTextFilePaths(filePath, texts);
            } else {
                let fileExtName = path.extname(filePath);
                switch (fileExtName) {
                    case ".txt":
                        texts.push({
                            type: TextType.TXT,
                            filePath: filePath,
                        });
                        break;
                    case ".json":
                        texts.push({
                            type: TextType.JSON,
                            filePath: filePath,
                        });
                        break;
                }
            }
        });
    }
    /**
     * 加密文本
     */
    private _encryptText(imgs: TextObject[]) {
        imgs.forEach((imgObj: TextObject) => {
            let imgBuffer: Buffer = fs.readFileSync(imgObj.filePath);
            let imgBase64String: string = imgBuffer.toString("base64");
            fs.writeFileSync(imgObj.filePath, imgBase64String);
        });
    }
}
