function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.yearSection = Ti.UI.createTableViewSection({
        id: "yearSection"
    });
    $.addTopLevelView($.__views.yearSection);
    $.__views.headerLabel = Ti.UI.createLabel({
        height: 40,
        backgroundImage: "line.png",
        opacity: 0.7,
        color: "#333",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "HelveticaNeue-CondensedBlack"
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