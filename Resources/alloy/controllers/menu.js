function Controller() {
    function exit() {
        util.send("api/login", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password"),
            device_token: ""
        });
        Ti.App.Properties.removeProperty("id");
        Ti.App.Properties.removeProperty("email");
        Ti.App.Properties.removeProperty("password");
        Ti.App.Properties.removeProperty("avatar");
        Ti.App.Properties.removeProperty("blogData");
        Ti.App.Properties.removeProperty("monthData");
        Ti.App.Properties.removeProperty("yearData");
        hideMenu();
        var login = Alloy.createController("login").getView();
        login.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        Alloy.Globals.tabGroup.close();
        Alloy.Globals.menu.close();
        currentWindow != undefined && currentWindow.close();
    }
    function openMytime() {
        hideMenu();
        currentWindow != undefined && currentWindow.close();
        currentWindow = undefined;
    }
    function openFriends() {
        hideMenu();
        currentWindow != undefined && currentWindow != friends && currentWindow.close();
        friends.open();
        friends.animate({
            left: 0
        });
        currentWindow = friends;
    }
    function openSharetome() {
        hideMenu();
        currentWindow != undefined && currentWindow != sharetome && currentWindow.close();
        sharetome.open();
        sharetome.animate({
            left: 0
        });
        currentWindow = sharetome;
    }
    function touchStart(e) {
        start = e.globalPoint.x;
    }
    function touchMove(e) {
        move = e.globalPoint.x;
        start > move && hideMenu();
    }
    function hideMenu() {
        $.menu.animate({
            left: -200
        });
        Alloy.Globals.slide = !1;
        if (currentWindow == undefined) {
            Alloy.Globals.tabGroup.animate({
                left: 0
            });
            Alloy.Globals.tableBlog.scrollable = !0;
        } else currentWindow.animate({
            left: 0
        });
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
    $.__views.mytime = Ti.UI.createLabel({
        top: 0,
        left: 0,
        width: 200,
        height: 44,
        id: "mytime"
    });
    $.__views.menu.add($.__views.mytime);
    openMytime ? $.__views.mytime.addEventListener("click", openMytime) : __defers["$.__views.mytime!click!openMytime"] = !0;
    $.__views.friends = Ti.UI.createLabel({
        top: 44,
        left: 0,
        width: 200,
        height: 44,
        id: "friends"
    });
    $.__views.menu.add($.__views.friends);
    openFriends ? $.__views.friends.addEventListener("click", openFriends) : __defers["$.__views.friends!click!openFriends"] = !0;
    $.__views.sharetome = Ti.UI.createLabel({
        top: 88,
        left: 0,
        width: 200,
        height: 44,
        id: "sharetome"
    });
    $.__views.menu.add($.__views.sharetome);
    openSharetome ? $.__views.sharetome.addEventListener("click", openSharetome) : __defers["$.__views.sharetome!click!openSharetome"] = !0;
    $.__views.exit = Ti.UI.createLabel({
        top: 132,
        left: 0,
        width: 200,
        height: 44,
        id: "exit"
    });
    $.__views.menu.add($.__views.exit);
    exit ? $.__views.exit.addEventListener("click", exit) : __defers["$.__views.exit!click!exit"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var currentWindow, friends = Alloy.createController("friends").getView(), sharetome = Alloy.createController("sharetome").getView(), start, move;
    __defers["$.__views.menu!touchstart!touchStart"] && $.__views.menu.addEventListener("touchstart", touchStart);
    __defers["$.__views.menu!touchmove!touchMove"] && $.__views.menu.addEventListener("touchmove", touchMove);
    __defers["$.__views.mytime!click!openMytime"] && $.__views.mytime.addEventListener("click", openMytime);
    __defers["$.__views.friends!click!openFriends"] && $.__views.friends.addEventListener("click", openFriends);
    __defers["$.__views.sharetome!click!openSharetome"] && $.__views.sharetome.addEventListener("click", openSharetome);
    __defers["$.__views.exit!click!exit"] && $.__views.exit.addEventListener("click", exit);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;