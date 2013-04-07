function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogSection = Ti.UI.createTableViewSection({
        id: "blogSection"
    });
    $.addTopLevelView($.__views.blogSection);
    $.__views.Container = Ti.UI.createLabel({
        backgroundColor: "#f3f3f3",
        height: 44,
        opacity: 0.6,
        text: "",
        id: "Container"
    });
    $.__views.dayLabel = Ti.UI.createLabel({
        left: 10,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 32,
            fontWeight: "bold"
        },
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "dayLabel"
    });
    $.__views.Container.add($.__views.dayLabel);
    $.__views.weekLabel = Ti.UI.createLabel({
        left: 50,
        top: 9,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 12,
            fontWeight: "bold"
        },
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "weekLabel"
    });
    $.__views.Container.add($.__views.weekLabel);
    $.__views.monthLabel = Ti.UI.createLabel({
        left: 48,
        bottom: 7,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 12,
            fontWeight: "bold"
        },
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        id: "monthLabel"
    });
    $.__views.Container.add($.__views.monthLabel);
    $.__views.blogSection.headerView = $.__views.Container;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.dayLabel.text = args.day.match(/[0-9]+$/)[0];
    $.monthLabel.text = args.day.match(/^[0-9]+-[0-9]+/)[0].replace("-", ".");
    $.weekLabel.text = util.getWeek(args.day);
    var items = args.feeds;
    for (i = 0; i < items.length; i++) {
        var row = Alloy.createController("blogRow", items[i]).getView();
        $.blogSection.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;