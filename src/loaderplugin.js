if (CC_JSB) {
    function downloadText(item) {
        var url = item.url;
        var result = jsb.fileUtils.getStringFromFile(url);
        if (typeof result === "string" && result) {
            return result;
        } else {
            return new Error("Download text failed: " + url);
        }
    }
    cc.loader.addDownloadHandlers({
        png: function (item, callback) {
            // 从定向原图片地址 为 加密后的文件
            item.url = item.url.replace(".png", ".xxpng");

            let text = downloadText(item);
            if (text instanceof Error) {
                callback(text, null);
            } else {
                // 将图片文件的文本转换为Image;
                let img = new Image();
                img.src = "data:image/png;base64," + text;

                img.onload = function (info) {
                    callback(null, img);
                };

                img.onerror = function (event) {
                    callback(new Error("load image fail:" + img.src), null);
                }; // Don't return anything to use async loading.
            }
        },
    });
}
