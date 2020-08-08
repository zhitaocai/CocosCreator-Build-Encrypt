export class RandomUtil {
    private static _keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    static randomString(length: number): string {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += this._keys[Math.floor((this._keys.length - 1) * Math.random())];
        }
        return str;
    }
}
