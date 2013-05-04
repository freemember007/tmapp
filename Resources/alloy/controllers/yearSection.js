function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.yearSection = Ti.UI.createTableViewSection({
        id: "yearSection"
    });
    $.__views.yearSection && $.addTopLevelView($.__views.yearSection);
    $.__views.headerLabel = Ti.UI.createLabel({
        height: 40,
        backgroundImage: "line.png",
        opacity: .7,
        color: "#333",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "headerLabel"
    });
    $.__views.yearSection.headerView = $.__views.headerLabel;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = args.month + "月";
    var items = args.feeds;
    var row = Alloy.createController("yearRow", items).getView();
    $.yearSection.add(row);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;