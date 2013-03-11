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
    $.__views.__alloyId2 = Alloy.createController("mainlist", {
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
    $.__views.__alloyId4 = Alloy.createController("pub", {
        id: "__alloyId4"
    });
    $.__views.index.addTab($.__views.__alloyId4.getViewEx({
        recurse: !0
    }));
    $.__views.__alloyId5 = Alloy.createController("galleryList", {
        id: "__alloyId5"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId5.getViewEx({
            recurse: !0
        }),
        id: "tab3",
        title: "总览"
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
    Alloy.Globals.tab3 = $.tab3;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;