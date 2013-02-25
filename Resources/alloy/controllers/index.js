function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.index = Ti.UI.createTabGroup({
        backgroundColor: "#fff",
        barColor: "darkgray",
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
    $.__views.__alloyId4 = Alloy.createController("pub", {
        id: "__alloyId4"
    });
    $.__views.tab2 = Ti.UI.createTab({
        window: $.__views.__alloyId4.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "拍照"
    });
    $.__views.index.addTab($.__views.tab2);
    $.__views.__alloyId6 = Ti.UI.createWindow({
        title: "设置",
        id: "__alloyId6"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId6,
        id: "tab3",
        title: "设置"
    });
    $.__views.index.addTab($.__views.tab3);
    $.addTopLevelView($.__views.index);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;