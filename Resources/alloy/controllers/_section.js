function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views._section = Ti.UI.createTableViewSection({
        id: "_section"
    });
    $.addTopLevelView($.__views._section);
    $.__views.headerLabel = Ti.UI.createLabel({
        backgroundColor: Alloy.Globals.GUI_bkC,
        height: 30,
        color: "white",
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 24,
            fontWeight: "bold"
        },
        opacity: 0.6,
        shadowColor: "#000",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "headerLabel"
    });
    $.__views._section.headerView = $.__views.headerLabel;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = " " + args.day;
    var items = args.feeds;
    for (i = 0; i < items.length; i++) {
        var row = Alloy.createController("_row", items[i]).getView();
        $._section.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;