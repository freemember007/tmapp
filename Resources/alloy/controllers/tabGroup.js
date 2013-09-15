function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tabGroup";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        number: 0
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
    Alloy.Globals.tabGroup = $.tabGroup;
    Alloy.Globals.tab1 = $.tab1;
    Alloy.Globals.tab2 = $.tab2;
    Alloy.Globals.tab4 = $.tab4;
    Alloy.Globals.tab5 = $.tab5;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;