var sitePath = "http://localhost:3000/";

exports.computeImageSize = function(originImg) {
    var imagefactory = require("ti.imagefactory");
    var w = originImg.width;
    var h = originImg.height;
    var width = 960;
    var middleImg = imagefactory.imageAsResized(originImg, {
        width: width,
        height: h * (width / w)
    });
    middleImg = imagefactory.compress(middleImg, .75);
    var thumb = imagefactory.imageAsResized(originImg, {
        width: 480,
        height: h * (480 / w)
    });
    thumb = imagefactory.compress(thumb, .75);
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
        Ti.UI.createAlertDialog({
            title: "提示",
            message: "网络连接异常，请检查。",
            ok: "确定"
        }).show();
        return;
    }
    var xhr = Titanium.Network.createHTTPClient();
    xhr.timeout = 6e4;
    xhr.onload = function(e) {
        if (200 != this.status) {
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

exports.get = function(url, onload) {
    var networkType = Ti.Network.getNetworkType();
    if (networkType == Ti.Network.NETWORK_NONE) {
        Ti.UI.createAlertDialog({
            title: "提示",
            message: "网络连接异常，请检查。",
            ok: "确定"
        }).show();
        return;
    }
    var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(e) {
        if (200 != this.status) {
            alert(e);
            alert(this.status);
        } else onload(this.responseText);
    };
    xhr.onerror = function(e) {
        alert(e.error);
    };
    xhr.open("get", sitePath + url);
    xhr.send();
};

exports.formatTime = function(hour) {
    var personalTime = "今天";
    personalTime = 9 > hour ? "清晨" : 12 > hour ? "上午" : 12 > hour ? "上午" : 14 > hour ? "中午" : 18 > hour ? "下午" : 21 > hour ? "黄昏" : "深夜";
    return personalTime;
};

exports.getWeek = function(date) {
    var arr = new Array();
    arr = date.split("-");
    var newDate = new Date(arr[0], parseInt(arr[1] - 1), arr[2]);
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var week = weekArray[newDate.getDay()];
    return week;
};

exports.alert = function(message) {
    Ti.UI.createAlertDialog({
        title: "提示",
        message: message,
        ok: "确定"
    }).show();
};