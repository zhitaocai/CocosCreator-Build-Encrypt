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
            let text = downloadText(item);
            if (text instanceof Error) {
                callback(text, null);
            } else {
                let img = new Image();
                img.src = text;
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
