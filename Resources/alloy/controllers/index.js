function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        backgroundColor: "#ccc",
        barColor: "gray",
        tabsBackgroundColor: "darkgray",
        id: "index"
    });
    $.__views.__alloyId2 = Alloy.createController("blogList", {
        id: "__alloyId2"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId2.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最近"
    });
    $.__views.index.addTab($.__views.tab1);
    $.__views.__alloyId4 = Alloy.createController("monthList", {
        id: "__alloyId4"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId4.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "本月"
    });
    $.__views.index.addTab($.__views.tab2);
    $.__views.__alloyId6 = Alloy.createController("pub", {
        id: "__alloyId6"
    });
    $.__views.index.addTab($.__views.__alloyId6.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId7 = Alloy.createController("yearList", {
        id: "__alloyId7"
    });
    $.__views.tab4 = Ti.UI.createTab({
        window: $.__views.__alloyId7.getViewEx({
            recurse: !0
        }),
        id: "tab4",
        title: "今年"
    });
    $.__views.index.addTab($.__views.tab4);
    $.__views.__alloyId9 = Alloy.createController("random", {
        id: "__alloyId9"
    });
    $.__views.tab5 = Ti.UI.createTab({
        window: $.__views.__alloyId9.getViewEx({
            recurse: !0
        }),
        id: "tab5",
        title: "随机"
    });
    $.__views.index.addTab($.__views.tab5);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.App.Properties.hasProperty("id")) $.index.open(); else {
        var login = Alloy.createController("login").getView();
        login.open();
    }
    Alloy.Globals.index = $.index;
    Alloy.Globals.tab1 = $.tab1;
    Alloy.Globals.tab2 = $.tab2;
    Alloy.Globals.tab4 = $.tab4;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;