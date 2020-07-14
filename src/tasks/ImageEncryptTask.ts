import fs from "fs";
import path from "path";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

enum ImageType {
    PNG,
    JPG,
    JPEG,
    GIF,
    WEBP,
}

type ImageObject = {
    /**
     * 图片类型
     */
    type: ImageType;

    /**
     * 图片路径
     */
    filePath: string;
};

export class ImageEncryptTask implements TaskInterface {
    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig): void {
        // 收集输出目录图片文件
        let imgs: ImageObject[] = [];
        this._collectImageFilePaths(taskConfig.buildOutputResDirPath, imgs);
        console.log(`图片处理：找到 ${imgs.length} 张原始图片`);

        // 加密图片文件
        this._encryptImage(imgs);
        console.log(`图片处理：${imgs.length} 张原始图片已加密完成`);
    }

    /**
     * 获取指定目录的所有图片文件路径
     *
     * @param dirName 目录名
     * @param imgs 接受图片文件的数组
     */
    private _collectImageFilePaths(dirName: string, imgs: ImageObject[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }

        let files = fs.readdirSync(dirName);
        files.forEach((fileName: fs.PathLike) => {
            let filePath = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this._collectImageFilePaths(filePath, imgs);
            } else {
                let fileExtName = path.extname(filePath);
                switch (fileExtName) {
                    case ".png":
                        imgs.push({
                            type: ImageType.PNG,
                            filePath: filePath,
                        });
                        break;
                    case ".jpg":
                        imgs.push({
                            type: ImageType.JPG,
                            filePath: filePath,
                        });
                        break;
                    case ".jpeg":
                        imgs.push({
                            type: ImageType.JPEG,
                            filePath: filePath,
                        });
                    case ".gif":
                        imgs.push({
                            type: ImageType.GIF,
                            filePath: filePath,
                        });
                    case ".webp":
                        imgs.push({
                            type: ImageType.WEBP,
                            filePath: filePath,
                        });
                        break;
                }
            }
        });
    }

    /**
     * 加密图片
     */
    private _encryptImage(imgs: ImageObject[]) {
        imgs.forEach((imgObj: ImageObject) => {
            let imgBuffer: Buffer = fs.readFileSync(imgObj.filePath);
            if (imgBuffer.toString().startsWith("data")) {
                return;
            }

            let imgBase64String: string = "";
            switch (imgObj.type) {
                case ImageType.PNG:
                    imgBase64String += "data:image/png;base64,";
                    break;
                case ImageType.JPG:
                    imgBase64String += "data:image/jpg;base64,";
                    break;
                case ImageType.JPEG:
                    imgBase64String += "data:image/jpeg;base64,";
                    break;
                case ImageType.GIF:
                    imgBase64String += "data:image/gif;base64,";
                    break;
                case ImageType.WEBP:
                    imgBase64String += "data:image/webp;base64,";
                    break;
            }
            imgBase64String += imgBuffer.toString("base64");
            fs.writeFileSync(imgObj.filePath, imgBase64String);
        });
    }
}
