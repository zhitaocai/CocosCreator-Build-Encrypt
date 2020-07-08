import { TaskConfig } from "./TaskConfig";

export interface TaskInterface {
    /**
     * 处理任务
     *
     * @param taskConfig 配置参数
     */
    handle(taskConfig: TaskConfig): void;
}
