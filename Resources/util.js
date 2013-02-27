var sitePath = "http://184.82.117.60/", imagefactory = require("ti.imagefactory");

exports.computeImageSize = function(img) {
    var w = img.width, h = img.height, width = 600, img = imagefactory.imageAsResized(img, {
        width: width,
        height: h * (width / w),
        quality: 0.7
    }), thumb = imagefactory.imageAsResized(img, {
        width: 120,
        height: h * (120 / w),
        quality: 0.7
    });
    return {
        img: {
            src: img,
            width: width,
            height: h * (width / w)
        },
        thumb: {
            src: thumb,
            width: 120,
            height: h * (120 / w)
        }
    };
};

exports.send = function(url, data, onload) {
    var networkType = Ti.Network.getNetworkType();
    if (networkType == Ti.Network.NETWORK_NONE) {
        alert("无可用网络!");
        return;
    }
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(e) {
        if (this.status != 200) {
            alert(e);
            alert(this.status);
        } else onload(this.responseText);
    };
    xhr.onerror = function(e) {
        alert(e.error);
    };
    xhr.open("POST", sitePath + url);
    xhr.send(data);
};