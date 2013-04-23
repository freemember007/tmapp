var sitePath = "http://localhost:3000/";

exports.computeImageSize = function(originImg) {
    var imagefactory = require("ti.imagefactory"), w = originImg.width, h = originImg.height, width = 600, middleImg = imagefactory.imageAsResized(originImg, {
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
        alert(e.error + "测试");
    };
    xhr.open("POST", sitePath + url);
    xhr.send(data);
};

exports.get = function(url, onload) {
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
        alert(e.error + "测试");
    };
    xhr.open("get", sitePath + url);
    xhr.send();
};

exports.formatTime = function(hour) {
    var personalTime = "今天";
    hour < 9 ? personalTime = "清晨" : hour < 12 ? personalTime = "上午" : hour < 12 ? personalTime = "上午" : hour < 14 ? personalTime = "中午" : hour < 18 ? personalTime = "下午" : hour < 21 ? personalTime = "黄昏" : personalTime = "深夜";
    return personalTime;
};

exports.getWeek = function(date) {
    var arr = new Array;
    arr = date.split("-");
    var newDate = new Date(arr[0], parseInt(arr[1] - 1), arr[2]), weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"), week = weekArray[newDate.getDay()];
    return week;
};

exports.alert = function(message) {
    Ti.UI.createAlertDialog({
        title: "提示",
        message: message,
        ok: "确定"
    }).show();
};