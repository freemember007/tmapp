var sitePath = "http://184.82.117.60/";

exports.fetchFeed = function() {
    util.send("api/login", {
        email: "freemem@163.com",
        password: "666666"
    }, function(res) {
        var data = JSON.parse(res);
        if (data.type == "success") {
            items = data.items;
            var tabledata = [];
            for (key in items) {
                var arg = {
                    day: key,
                    feeds: items[key]
                }, section = Alloy.createController("section", arg).getView();
                tabledata.push(section);
            }
            Alloy.Globals.table.setData(tabledata);
        } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
    });
};

exports.computeImageSize = function(originImg) {
    var imagefactory = require("ti.imagefactory"), w = originImg.width, h = originImg.height, width = 600, middleImg = imagefactory.imageAsResized(originImg, {
        width: width,
        height: h * (width / w)
    });
    middleImg = imagefactory.compress(middleImg, 0.7);
    var thumb = imagefactory.imageAsResized(originImg, {
        width: 120,
        height: h * (120 / w)
    });
    thumb = imagefactory.compress(thumb, 0.7);
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