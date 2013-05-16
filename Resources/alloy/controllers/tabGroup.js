function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        backgroundColor: "transparent",
        id: "tabGroup"
    });
    $.__views.__alloyId59 = Alloy.createController("blogList", {
        id: "__alloyId59"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId59.getViewEx({
            recurse: true
        }),
        id: "tab1",
        title: "最近"
    });
    $.__views.tabGroup.addTab($.__views.tab1);
    $.__views.__alloyId62 = Alloy.createController("monthList", {
        id: "__alloyId62"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId62.getViewEx({
            recurse: true
        }),
        id: "tab2",
        title: "本月"
    });
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.__alloyId64 = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        id: "__alloyId64"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId64,
        id: "tab3"
    });
    $.__views.tabGroup.addTab($.__views.tab3);
    $.__views.__alloyId65 = Alloy.createController("yearList", {
        id: "__alloyId65"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId65.getViewEx({
            recurse: true
        }),
        id: "tab4",
        title: "今年"
    });
    $.__views.tabGroup.addTab($.__views.tab4);
    $.__views.__alloyId67 = Alloy.createController("random", {
        id: "__alloyId67"
    });
    $.__views.tab5 = Ti.UI.createTab({
        window: $.__views.__alloyId67.getViewEx({
            recurse: true
        }),
        id: "tab5",
        title: "随机"
    });
    $.__views.tabGroup.addTab($.__views.tab5);
    $.__views.tabGroup && $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.App.Properties.hasProperty("id")) {
        $.tabGroup.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
        Alloy.Globals.menu.open();
        setTimeout(function() {
            Alloy.Globals.index.close();
        }, 500);
    } else {
        var login = Alloy.createController("login").getView();
        login.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        setTimeout(function() {
            Alloy.Globals.index.close();
        }, 500);
    }
    var badge = Alloy.Models.instance("badge");
    badge.set({
        number: Ti.UI.iPhone.getAppBadge()
    });
    0 == badge.get("number") ? badge.set({
        visible: false,
        width: 0
    }) : 10 > badge.get("number") ? badge.set({
        visible: true,
        width: 22
    }) : badge.set({
        visible: true,
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
        callback: function() {
            if ("true" == Ti.App.Properties.getString("isInForeground")) {
                var badgeCount = Ti.UI.iPhone.getAppBadge();
                badgeCount += 1;
                Ti.UI.iPhone.setAppBadge(badgeCount);
                badge.set({
                    number: badgeCount
                });
                0 == badge.get("number") ? badge.set({
                    visible: false,
                    width: 0
                }) : 10 > badge.get("number") ? badge.set({
                    visible: true,
                    width: 22
                }) : badge.set({
                    visible: true,
                    width: 32
                });
                badge.save();
            } else if (Alloy.Globals.currentWindow != Alloy.Globals.sharetome) {
                void 0 != Alloy.Globals.currentWindow && Alloy.Globals.currentWindow.close();
                Alloy.Globals.sharetome.open({
                    left: 0
                });
                Alloy.Globals.currentWindow = Alloy.Globals.sharetome;
            }
        }
    });
    Alloy.Globals.tabGroup = $.tabGroup;
    Alloy.Globals.tab1 = $.tab1;
    Alloy.Globals.tab2 = $.tab2;
    Alloy.Globals.tab4 = $.tab4;
    Alloy.Globals.tab5 = $.tab5;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;