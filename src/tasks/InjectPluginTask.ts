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
        // 创建插件目录
        if (fs.existsSync(taskConfig.buildOutputLoaderPluginJsFilePath)) {
            if (fs.statSync(taskConfig.buildOutputLoaderPluginJsFilePath).isFile()) {
                console.log(`插件脚本注入：删除已存在文件 ${taskConfig.buildOutputLoaderPluginJsFilePath}`);
                fs.unlinkSync(taskConfig.buildOutputLoaderPluginJsFilePath);
            }
        } else {
            fs.mkdirSync(path.dirname(taskConfig.buildOutputLoaderPluginJsFilePath));
            console.log(`插件脚本注入：创建目录成功`);
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
        // 插件代码相对于构建src目录的相对路径
        // e.g. assets/loaderplugin.js
        let loaderpluginRelativePath = path.join(
            path.basename(path.dirname(taskConfig.buildOutputLoaderPluginJsFilePath)),
            path.basename(taskConfig.buildOutputLoaderPluginJsFilePath)
        );

        let fileBuffer: Buffer = fs.readFileSync(taskConfig.buildOutputMainJsFilePath);
        let fileContentText = fileBuffer.toString();
        if (fileContentText.match(loaderpluginRelativePath)) {
            console.log(`插件脚本注入：已注入到 main.js，将不再处理`);
            return;
        }

        // 注入插件到 main.js
        let fileChunks = fileContentText.split("var jsList = settings.jsList;");
        let aopCodeBlock = `
    var jsList = settings.jsList;
    if (jsList == null) {
        jsList = [];
    }
`;
        //         let aopCodeBlock = `
        //     var jsList = settings.jsList;

        //     //////////////////////////////////////////
        //     // 插入代码：开始

        //     if (jsList == null) {
        //         jsList = [];
        //     }
        //     jsList.unshift("${loaderpluginRelativePath}");

        //     // 插入代码：结束
        //     //////////////////////////////////////////
        // `;
        let newMainJsFileContent = fileChunks.join(aopCodeBlock);
        fs.writeFileSync(taskConfig.buildOutputMainJsFilePath, newMainJsFileContent);
        console.log(`插件脚本注入：注入 main.js 成功`);
    }
}
