function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogSection = Ti.UI.createTableViewSection({
        id: "blogSection"
    });
    $.addTopLevelView($.__views.blogSection);
    $.__views.headerLabel = Ti.UI.createLabel({
        backgroundColor: "transparent",
        height: 30,
        color: "white",
        font: {
            fontFamily: "迷你简瘦金书",
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
    $.__views.blogSection.headerView = $.__views.headerLabel;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = " " + args.day;
    var items = args.feeds;
    for (i = 0; i < items.length; i++) {
        var row = Alloy.createController("blogRow", items[i]).getView();
        $.blogSection.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;