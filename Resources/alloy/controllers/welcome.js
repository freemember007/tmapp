function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.welcome = Ti.UI.createView({
        top: 47,
        bottom: 54,
        left: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        layout: "vertical",
        backgroundColor: Alloy.Globals.GUI_bkC,
        id: "welcome"
    });
    $.__views.welcome && $.addTopLevelView($.__views.welcome);
    $.__views.text = Ti.UI.createLabel({
        top: 20,
        bottom: 20,
        width: Ti.Platform.displayCaps.platformWidth,
        height: 100,
        color: "#666",
        textAlign: "center",
        font: {
            fontSize: 16
        },
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "text",
        text: "欢迎来到时光笔记！\n\n时光笔记是一部由手机书写个人生活志。\n\n要使用它，从上传您的第一张照片开始。"
    });
    $.__views.welcome.add($.__views.text);
    $.__views.button = Ti.UI.createImageView({
        preventDefaultImage: true,
        image: "welcomeIcon.png",
        bottom: 30,
        width: 163,
        height: 41,
        id: "button"
    });
    $.__views.welcome.add($.__views.button);
    Alloy.Globals.showDialog ? $.__views.button.addEventListener("click", Alloy.Globals.showDialog) : __defers["$.__views.button!click!Alloy.Globals.showDialog"] = true;
    $.__views.slogan = Ti.UI.createImageView({
        preventDefaultImage: true,
        image: "slogan.png",
        width: 292,
        height: 100,
        id: "slogan"
    });
    $.__views.welcome.add($.__views.slogan);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.button!click!Alloy.Globals.showDialog"] && $.__views.button.addEventListener("click", Alloy.Globals.showDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;