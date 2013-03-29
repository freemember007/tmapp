function Controller() {
    function exit() {
        Ti.App.Properties.removeProperty("id");
        Alloy.Globals.menu.animate({
            left: -200
        });
        Alloy.Globals.blogList.animate({
            left: 0
        });
        var login = Alloy.createController("login").getView();
        login.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        Alloy.Globals.slide = !1;
        Alloy.Globals.tabGroup.close();
        Alloy.Globals.menu.close();
    }
    function touchStart(e) {
        start = e.globalPoint.x;
    }
    function touchMove(e) {
        move = e.globalPoint.x;
        if (start > move) {
            Alloy.Globals.blogList.animate({
                left: 0
            });
            $.menu.animate({
                left: -200
            });
            Alloy.Globals.slide = !1;
            Alloy.Globals.tableBlog.scrollable = !0;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.menu = Ti.UI.createWindow({
        backgroundImage: "menuBack.png",
        left: -200,
        width: 200,
        id: "menu"
    });
    $.addTopLevelView($.__views.menu);
    touchStart ? $.__views.menu.addEventListener("touchstart", touchStart) : __defers["$.__views.menu!touchstart!touchStart"] = !0;
    touchMove ? $.__views.menu.addEventListener("touchmove", touchMove) : __defers["$.__views.menu!touchmove!touchMove"] = !0;
    $.__views.accountSet = Ti.UI.createLabel({
        top: 44,
        left: 0,
        width: 200,
        height: 44,
        id: "accountSet"
    });
    $.__views.menu.add($.__views.accountSet);
    $.__views.exit = Ti.UI.createLabel({
        top: 88,
        left: 0,
        width: 200,
        height: 44,
        id: "exit"
    });
    $.__views.menu.add($.__views.exit);
    exit ? $.__views.exit.addEventListener("click", exit) : __defers["$.__views.exit!click!exit"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var start, move;
    __defers["$.__views.menu!touchstart!touchStart"] && $.__views.menu.addEventListener("touchstart", touchStart);
    __defers["$.__views.menu!touchmove!touchMove"] && $.__views.menu.addEventListener("touchmove", touchMove);
    __defers["$.__views.exit!click!exit"] && $.__views.exit.addEventListener("click", exit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;