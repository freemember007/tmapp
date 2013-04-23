function Controller() {
    function exit() {
        util.send("api/login", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password"),
            device_token: ""
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                Ti.App.Properties.removeProperty("id");
                Ti.App.Properties.removeProperty("email");
                Ti.App.Properties.removeProperty("password");
                Ti.App.Properties.removeProperty("domain_name");
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
                Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow.close();
            } else data.type == "fail" ? alert("退出失败，请重新退出！") : alert("unknown error");
        });
    }
    function openMytime() {
        hideMenu();
        Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow.close();
        Alloy.Globals.currentWindow = undefined;
    }
    function openFriends() {
        hideMenu();
        var friends = Alloy.createController("friends").getView();
        friends.open();
        friends.animate({
            left: 0
        });
        Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow != friends && Alloy.Globals.currentWindow.close();
        Alloy.Globals.currentWindow = friends;
    }
    function openSharetome() {
        hideMenu();
        Alloy.Globals.sharetome.open();
        Alloy.Globals.sharetome.animate({
            left: 0
        });
        Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow != Alloy.Globals.sharetome && Alloy.Globals.currentWindow.close();
        Alloy.Globals.currentWindow = Alloy.Globals.sharetome;
    }
    function touchStart(e) {
        start = e.x;
    }
    function touchMove(e) {
        move = e.x;
        start > move && hideMenu();
    }
    function hideMenu() {
        $.menu.animate({
            left: -200
        });
        if (Alloy.Globals.currentWindow == undefined) {
            Alloy.Globals.tabGroup.animate({
                left: 0
            });
            Alloy.Globals.tableBlog.scrollable = !0;
        } else Alloy.Globals.currentWindow.animate({
            left: 0
        });
        Alloy.Globals.slide = !1;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Models.instance("badge");
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
    $.__views.shareBadge = Ti.UI.createLabel({
        top: 85,
        left: 140,
        height: 22,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#fff",
        backgroundColor: "red",
        color: "#fff",
        font: {
            fontSize: 14,
            fontWeight: "bolder",
            fontFamily: "HelveticaNeue-CondensedBlack"
        },
        zIndex: 1,
        textAlign: "center",
        id: "shareBadge"
    });
    $.__views.menu.add($.__views.shareBadge);
    $.__views.exit = Ti.UI.createLabel({
        top: 132,
        left: 0,
        width: 200,
        height: 44,
        id: "exit"
    });
    $.__views.menu.add($.__views.exit);
    exit ? $.__views.exit.addEventListener("click", exit) : __defers["$.__views.exit!click!exit"] = !0;
    var __alloyId40 = function() {
        $.shareBadge.text = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform().number : Alloy.Models.badge.get("number");
        $.shareBadge.visible = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform().visible : Alloy.Models.badge.get("visible");
        $.shareBadge.width = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform().width : Alloy.Models.badge.get("width");
    };
    Alloy.Models.badge.on("fetch change destroy", __alloyId40);
    exports.destroy = function() {
        Alloy.Models.badge.off("fetch change destroy", __alloyId40);
    };
    _.extend($, $.__views);
    var start, move;
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