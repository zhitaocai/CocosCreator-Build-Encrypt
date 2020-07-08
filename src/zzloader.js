if (CC_JSB) {
    function downloadText(textUrl) {
        var result = jsb.fileUtils.getStringFromFile(textUrl);
        if (typeof result === "string" && result) {
            return result;
        } else {
            return new Error("Download text failed: " + textUrl);
        }
    }
    cc.loader.addDownloadHandlers({
        png: function (item, callback) {
            let text = downloadText(item.url + ".txt");
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
