function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogSection = Ti.UI.createTableViewSection({
        id: "blogSection"
    });
    $.addTopLevelView($.__views.blogSection);
    $.__views.Container = Ti.UI.createView({
        backgroundColor: "#fff",
        height: 50,
        opacity: 0.6,
        layout: "horizontal",
        verticalAlign: "center",
        id: "Container"
    });
    $.__views.headerLabel = Ti.UI.createLabel({
        left: 3,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 32,
            fontWeight: "bold"
        },
        id: "headerLabel"
    });
    $.__views.Container.add($.__views.headerLabel);
    $.__views.Container2 = Ti.UI.createView({
        left: 5,
        id: "Container2"
    });
    $.__views.Container.add($.__views.Container2);
    $.__views.weekLabel = Ti.UI.createLabel({
        left: 0,
        top: 10,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 12,
            fontWeight: "bold"
        },
        text: "星期六",
        id: "weekLabel"
    });
    $.__views.Container2.add($.__views.weekLabel);
    $.__views.monthLabel = Ti.UI.createLabel({
        left: 0,
        bottom: 10,
        font: {
            fontFamily: "HelveticaNeue-CondensedBlack",
            fontSize: 12,
            fontWeight: "bold"
        },
        text: "2013.03",
        id: "monthLabel"
    });
    $.__views.Container2.add($.__views.monthLabel);
    $.__views.blogSection.headerView = $.__views.Container;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = " " + args.day.match(/[0-9]+$/)[0];
    var items = args.feeds;
    for (i = 0; i < items.length; i++) {
        var row = Alloy.createController("blogRow", items[i]).getView();
        $.blogSection.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;