export class CocosProjectConfig {
    /**
     * 引擎版本号
     *
     * e.g. "2.3.3"
     */
    engineVersion: string | undefined;

    /**
     * 项目名字
     *
     * e.g. "Hello World"
     */
    projectName: string | undefined;

    fromJson(json: any): CocosProjectConfig {
        this.engineVersion = json["engine_version"];
        this.projectName = json["projectName"];
        return this;
    }
}
