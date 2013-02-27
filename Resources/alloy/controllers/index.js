function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.tabGroup = Ti.UI.createTabGroup({
        backgroundColor: "#fff",
        barColor: "darkgray",
        id: "tabGroup"
    });
    $.__views.__alloyId0 = Alloy.createController("mainlist", {
        id: "__alloyId0"
    });
    $.__views.tab1 = Ti.UI.createTab({
        window: $.__views.__alloyId0.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最新"
    });
    $.__views.tabGroup.addTab($.__views.tab1);
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
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.__alloyId4 = Ti.UI.createWindow({
        title: "设置",
        id: "__alloyId4"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId4,
        id: "tab3",
        title: "设置"
    });
    $.__views.tabGroup.addTab($.__views.tab3);
    $.addTopLevelView($.__views.tabGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabGroup.open();
    Alloy.Globals.tabGroup = $.tabGroup;
    Alloy.Globals.tab2 = $.tab2;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;