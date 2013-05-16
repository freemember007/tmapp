function Controller() {
    function fetchRandom() {
        var actInd = Alloy.createController("actInd").getView();
        if (null != $.image.image) {
            actInd.message = null;
            actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
        }
        $.random.add(actInd);
        util.send("api/fetchRandom", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password")
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                item = data.item;
                if (null != item.url) {
                    $.image.image = Alloy.Globals.sitePath + item.url;
                    $.scrollView.zoomScale = 1;
                }
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
            $.random.remove(actInd);
        });
    }
    function zoom() {
        1 >= $.scrollView.zoomScale ? $.scrollView.setZoomScale(2, {
            animated: true
        }) : $.scrollView.setZoomScale(1, {
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.random = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        id: "random"
    });
    $.__views.random && $.addTopLevelView($.__views.random);
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
        color: "#555",
        opacity: 1,
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "top",
        text: "随机"
    });
    $.__views.random.add($.__views.top);
    $.__views.scrollView = Ti.UI.createScrollView({
        width: Ti.Platform.displayCaps.platformWidth,
        maxZoomScale: 2,
        id: "scrollView"
    });
    $.__views.random.add($.__views.scrollView);
    fetchRandom ? $.__views.scrollView.addEventListener("singletap", fetchRandom) : __defers["$.__views.scrollView!singletap!fetchRandom"] = true;
    zoom ? $.__views.scrollView.addEventListener("doubletap", zoom) : __defers["$.__views.scrollView!doubletap!zoom"] = true;
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: true,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "image"
    });
    $.__views.scrollView.add($.__views.image);
    $.__views.__alloyId44 = Alloy.createController("bottom", {
        id: "__alloyId44",
        __parentSymbol: $.__views.random
    });
    $.__views.__alloyId44.setParent($.__views.random);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.fetchRandom = fetchRandom;
    __defers["$.__views.scrollView!singletap!fetchRandom"] && $.__views.scrollView.addEventListener("singletap", fetchRandom);
    __defers["$.__views.scrollView!doubletap!zoom"] && $.__views.scrollView.addEventListener("doubletap", zoom);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;