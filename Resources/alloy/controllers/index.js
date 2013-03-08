function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        backgroundColor: "#fff",
        barColor: "gray",
        tabsBackgroundColor: "darkgray",
        id: "index"
    });
    $.__views.__alloyId1 = Alloy.createController("mainlist", {
        id: "__alloyId1"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId1.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最新"
    });
    $.__views.index.addTab($.__views.tab1);
    $.__views.__alloyId3 = Alloy.createController("pub", {
        id: "__alloyId3"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId3.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "发布"
    });
    $.__views.index.addTab($.__views.tab2);
    $.__views.__alloyId5 = Ti.UI.createWindow({
        title: "设置",
        id: "__alloyId5"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId5,
        id: "tab3",
        title: "设置"
    });
    $.__views.index.addTab($.__views.tab3);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    if (Ti.App.Properties.hasProperty("id")) $.index.open(); else {
        var login = Alloy.createController("login").getView();
        login.open();
    }
    Alloy.Globals.index = $.index;
    Alloy.Globals.tab1 = $.tab1;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;