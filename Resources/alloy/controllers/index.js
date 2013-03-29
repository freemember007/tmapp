function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: !0,
        id: "tabGroup"
    });
    $.__views.__alloyId7 = Alloy.createController("blogList", {
        id: "__alloyId7"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId7.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最近"
    });
    $.__views.tabGroup.addTab($.__views.tab1);
    $.__views.__alloyId9 = Alloy.createController("monthList", {
        id: "__alloyId9"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "本月"
    });
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.__alloyId11 = Ti.UI.createWindow({
        id: "__alloyId11"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId11,
        id: "tab3"
    });
    $.__views.tabGroup.addTab($.__views.tab3);
    $.__views.__alloyId12 = Alloy.createController("yearList", {
        id: "__alloyId12"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId12.getViewEx({
            recurse: !0
        }),
        id: "tab4",
        title: "今年"
    });
    $.__views.tabGroup.addTab($.__views.tab4);
    $.__views.__alloyId14 = Alloy.createController("random", {
        id: "__alloyId14"
    });
    $.__views.tab5 = Ti.UI.createTab({
        window: $.__views.__alloyId14.getViewEx({
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