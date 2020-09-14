import fs from "fs";
import path from "path";
import { TaskConfig } from "./TaskConfig";
import { TaskInterface } from "./TaskInterface";

/**
 * 注入解密插件脚本任务
 */
export class InjectPluginTask implements TaskInterface {
    handle(taskConfig: TaskConfig): void {
        this._cpLoaderPlugin(taskConfig);
        this._addLoaderPluginToMainJs(taskConfig);
    }

    /**
     * 复制（解密）插件脚本到打包目录
     */
    private _cpLoaderPlugin(taskConfig: TaskConfig) {
        // 创建插件父目录
        let parentDirName = path.dirname(taskConfig.buildOutputLoaderPluginJsFilePath);
        if (fs.existsSync(parentDirName)) {
            if (fs.statSync(parentDirName).isFile()) {
                console.log(`插件脚本注入：删除已存在文件 ${parentDirName}`);
                fs.unlinkSync(parentDirName);
            }
        } else {
            fs.mkdirSync(parentDirName);
            console.log(`插件脚本注入：创建父目录成功`);
        }

        // 写入文件
        console.log(`插件脚本注入：即将复制插件脚本到 ${taskConfig.buildOutputLoaderPluginJsFilePath}`);
        let inputJsFileBuffer: Buffer = fs.readFileSync(taskConfig.inputLoaderPluginJsFilePath);
        fs.writeFileSync(taskConfig.buildOutputLoaderPluginJsFilePath, inputJsFileBuffer.toString());
        console.log(`插件脚本注入：复制插件脚本成功`);
    }

    /**
     * 在构建后的 main.js 加入插脚脚本的调用代码
     */
    private _addLoaderPluginToMainJs(taskConfig: TaskConfig) {
        // 需要注入的代码
        let apoCodeBlock = `require('jsb-adapter/loaderplugin.js');`;
        let fileBuffer: Buffer = fs.readFileSync(taskConfig.buildOutputMainJsFilePath);
        let fileContentText = fileBuffer.toString();

        // 检查是否已经注入过
        if (fileContentText.match(apoCodeBlock)) {
            console.log(`插件脚本注入：已注入到 main.js，将不再处理`);
            return;
        }

        // 注入插件到 main.js
        let fileChunks = fileContentText.split(`window.boot();`);
        let newMainJsFileContent = fileChunks.join(apoCodeBlock + "\nwindow.boot();");
        fs.writeFileSync(taskConfig.buildOutputMainJsFilePath, newMainJsFileContent);
        console.log(`插件脚本注入：注入 main.js 成功`);
    }
}
