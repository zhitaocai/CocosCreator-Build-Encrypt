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
        this.engineVersion = this._getJson(json, "engineVersion");
        this.projectName = this._getJson(json, "projectName");
        return this;
    }

    private _getJson(json: any, key: string) {
        if (json) {
            let value = json[key];
            if (value != null && value != undefined) {
                return value;
            }
        }
        return undefined;
    }
}
