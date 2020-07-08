import { EncryptTask } from "./tasks/EncryptTask";
import { TaskConfig } from "./tasks/TaskConfig";
import { InjectPluginTask } from "./tasks/InjectPluginTask";

export class CocosBuildEncrypt {
    start() {
        let taskConfig = new TaskConfig(process.argv[2]);
        let tasks = [
            // 对输出的图片加密
            new EncryptTask(),

            // 注入解密插件脚本
            new InjectPluginTask(),
        ];
        tasks.forEach((task) => {
            task.handle(taskConfig);
        });
        console.log("恭喜，处理成功！")
    }
}

new CocosBuildEncrypt().start();
