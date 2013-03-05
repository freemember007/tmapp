var sitePath = "http://localhost:3000/", jpgcompressor = require("com.sideshowcoder.jpgcompressor");

jpgcompressor.setCompressSize(102400);

jpgcompressor.setWorstCompressQuality(0.65);

exports.computeImageSize = function(img) {
    var imageAsTaken = Ti.UI.createImageView({
        image: img,
        width: "auto",
        height: "auto"
    });
    imageAsTaken = imageAsTaken.toImage();
    var w = imageAsTaken.width, h = imageAsTaken.height, width = 500, cImage = jpgcompressor.scale(img, width, h * (width / w)), img = jpgcompressor.compress(cImage), cImage = jpgcompressor.scale(img, 120, h * (120 / w)), thumb = jpgcompressor.compress(cImage);
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