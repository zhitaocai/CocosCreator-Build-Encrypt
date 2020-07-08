import fs from "fs";
import path from "path";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

export class EncryptTask implements TaskInterface {
    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig): void {
        // 获取图片文件
        let imgFilePaths: string[] = [];
        this.collectImageFilePaths(taskConfig.buildOutputResDirPath, imgFilePaths);

        // 加密图片文件
        console.log(`图片处理：找到 ${imgFilePaths.length} 张原始图片`);
        imgFilePaths.forEach((filePath: string) => {
            let fileBuffer: Buffer = fs.readFileSync(filePath);
            fs.unlinkSync(filePath);
            fs.writeFileSync(filePath.replace(".png", ".xxpng"), fileBuffer.toString("base64"));
        });
        console.log(`图片处理：${imgFilePaths.length} 张原始图片已加密完成`);
    }

    /**
     * 获取指定目录的所有图片文件路径
     *
     * @param dirName 目录名
     * @param filePaths 接受图片文件路径的数组
     */
    private collectImageFilePaths(dirName: string, filePaths: string[]) {
        if (!fs.existsSync(dirName)) {
            throw new Error(`${dirName} 目录不存在`);
        }

        let files = fs.readdirSync(dirName);
        files.forEach((fileName: fs.PathLike) => {
            let filePath = path.join(dirName, fileName.toString());
            let stat: fs.Stats = fs.statSync(filePath);
            if (stat.isDirectory()) {
                this.collectImageFilePaths(filePath, filePaths);
            } else {
                if (path.extname(filePath) === ".png") {
                    filePaths.push(filePath);
                }
            }
        });
    }
}
