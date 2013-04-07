function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.welcome = Ti.UI.createView({
        top: 47,
        bottom: 54,
        left: 0,
        right: 0,
        layout: "vertical",
        backgroundColor: Alloy.Globals.GUI_bkC,
        id: "welcome"
    });
    $.addTopLevelView($.__views.welcome);
    $.__views.text = Ti.UI.createLabel({
        top: 20,
        bottom: 20,
        height: 100,
        width: 300,
        left: 10,
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
        text: "欢迎来到时光笔记！\n	\n		时光笔记是一部由手机书写个人生活志。\n	\n		要使用它，从上传您的第一张照片开始。"
    });
    $.__views.welcome.add($.__views.text);
    $.__views.button = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "welcome.png",
        width: 163,
        height: 41,
        left: 75,
        bottom: 30,
        id: "button"
    });
    $.__views.welcome.add($.__views.button);
    Alloy.Globals.showDialog ? $.__views.button.addEventListener("click", Alloy.Globals.showDialog) : __defers["$.__views.button!click!Alloy.Globals.showDialog"] = !0;
    $.__views.slogan = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "slogan.png",
        width: 292,
        height: 100,
        left: 20,
        id: "slogan"
    });
    $.__views.welcome.add($.__views.slogan);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.button!click!Alloy.Globals.showDialog"] && $.__views.button.addEventListener("click", Alloy.Globals.showDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;