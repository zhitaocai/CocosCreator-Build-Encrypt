import { ImageEncryptTask } from "./tasks/ImageEncryptTask";
import { TaskConfig } from "./tasks/TaskConfig";
import { InjectPluginTask } from "./tasks/InjectPluginTask";
import { TextEncryptTask } from "./tasks/TextEncryptTask";

export class CocosBuildEncrypt {
    start() {
        let taskConfig = new TaskConfig();
        let tasks = [
            // 对输出的图片加密
            new ImageEncryptTask(),

            // 对出输出文本加密
            new TextEncryptTask(),

            // 注入解密插件脚本
            new InjectPluginTask(),
        ];
        tasks.forEach((task) => {
            task.handle(taskConfig);
        });
        console.log("恭喜，处理成功！");
    }
}

new CocosBuildEncrypt().start();
