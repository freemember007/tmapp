function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.yearSection = Ti.UI.createTableViewSection({
        id: "yearSection"
    });
    $.addTopLevelView($.__views.yearSection);
    $.__views.headerLabel = Ti.UI.createLabel({
        height: 50,
        backgroundColor: Alloy.Globals.GUI_bkC,
        opacity: 0.8,
        color: Alloy.Globals.GUI_FC,
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        },
        textAlign: "center",
        id: "headerLabel"
    });
    $.__views.yearSection.headerView = $.__views.headerLabel;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = args.month + "月";
    var items = args.feeds, row = Alloy.createController("yearRow", items).getView();
    $.yearSection.add(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;