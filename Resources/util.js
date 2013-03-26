var sitePath = "http://184.82.117.60/";

exports.computeImageSize = function(originImg) {
    var imagefactory = require("ti.imagefactory"), w = originImg.width, h = originImg.height, width = 320, middleImg = imagefactory.imageAsResized(originImg, {
        width: width,
        height: h * (width / w)
    });
    middleImg = imagefactory.compress(middleImg, 0.65);
    var thumb = imagefactory.imageAsResized(originImg, {
        width: 120,
        height: h * (120 / w)
    });
    thumb = imagefactory.compress(thumb, 0.65);
    return {
        middleImg: {
            src: middleImg,
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