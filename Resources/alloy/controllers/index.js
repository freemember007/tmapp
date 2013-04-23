function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: !0,
        id: "tabGroup"
    });
    $.__views.__alloyId24 = Alloy.createController("blogList", {
        id: "__alloyId24"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId24.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最近"
    });
    $.__views.tabGroup.addTab($.__views.tab1);
    $.__views.__alloyId27 = Alloy.createController("monthList", {
        id: "__alloyId27"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId27.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "本月"
    });
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.__alloyId29 = Ti.UI.createWindow({
        id: "__alloyId29"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId29,
        id: "tab3"
    });
    $.__views.tabGroup.addTab($.__views.tab3);
    $.__views.__alloyId30 = Alloy.createController("yearList", {
        id: "__alloyId30"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId30.getViewEx({
            recurse: !0
        }),
        id: "tab4",
        title: "今年"
    });
    $.__views.tabGroup.addTab($.__views.tab4);
    $.__views.__alloyId32 = Alloy.createController("random", {
        id: "__alloyId32"
    });
    $.__views.tab5 = Ti.UI.createTab({
        window: $.__views.__alloyId32.getViewEx({
            recurse: !0
        }),
        id: "tab5",
        title: "随机"
    });
    $.__views.tabGroup.addTab($.__views.tab5);
    $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.tabGroup;
    Alloy.Globals.tab1 = $.tab1;
    Alloy.Globals.tab2 = $.tab2;
    Alloy.Globals.tab4 = $.tab4;
    Alloy.Globals.tab5 = $.tab5;
    var startWin = Ti.UI.createWindow({
        backgroundImage: "Default.png"
    }), actInd = Titanium.UI.createActivityIndicator({
        left: 135,
        bottom: 90,
        height: 50,
        width: 50,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    startWin.add(actInd);
    actInd.show();
    startWin.open();
    var badge = Alloy.Models.instance("badge");
    badge.set({
        number: Ti.UI.iPhone.getAppBadge()
    });
    badge.get("number") == 0 ? badge.set({
        visible: !1,
        width: 0
    }) : badge.get("number") < 10 ? badge.set({
        visible: !0,
        width: 22
    }) : badge.set({
        visible: !0,
        width: 32
    });
    badge.save();
    Titanium.Network.registerForPushNotifications({
        types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT, Titanium.Network.NOTIFICATION_TYPE_SOUND ],
        success: function(e) {
            var device_token = e.deviceToken;
            Ti.App.Properties.setString("device_token", device_token);
        },
        error: function(e) {
            Ti.API.info("Error during registration: " + e.error);
        },
        callback: function(e) {
            if (Ti.App.Properties.getString("isInForeground") == "true") {
                var badgeCount = Ti.UI.iPhone.getAppBadge();
                badgeCount += 1;
                Ti.UI.iPhone.setAppBadge(badgeCount);
                badge.set({
                    number: badgeCount
                });
                badge.get("number") == 0 ? badge.set({
                    visible: !1,
                    width: 0
                }) : badge.get("number") < 10 ? badge.set({
                    visible: !0,
                    width: 22
                }) : badge.set({
                    visible: !0,
                    width: 32
                });
                badge.save();
            } else if (Alloy.Globals.currentWindow != Alloy.Globals.sharetome) {
                Alloy.Globals.currentWindow != undefined && Alloy.Globals.currentWindow.close();
                Alloy.Globals.sharetome.open();
                Alloy.Globals.currentWindow = Alloy.Globals.sharetome;
            }
        }
    });
    if (Ti.App.Properties.hasProperty("id")) {
        $.tabGroup.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
        Alloy.Globals.menu.open();
        startWin.close();
    } else {
        var login = Alloy.createController("login").getView();
        login.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        startWin.close();
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;