function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    $.__views.blogSection = Ti.UI.createTableViewSection({
        id: "blogSection"
    });
    $.__views.blogSection && $.addTopLevelView($.__views.blogSection);
    $.__views.Container = Ti.UI.createLabel({
        backgroundColor: "#f3f3f3",
        top: 0,
        height: 44,
        opacity: .6,
        text: "",
        id: "Container"
    });
    $.__views.dayLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            left: 10,
            height: 44,
            font: {
                fontFamily: "HelveticaNeue-CondensedBlack",
                fontSize: 32,
                fontWeight: "bold"
            },
            shadowColor: "#fff",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        Alloy.isTablet && _.extend(o, {
            left: 24
        });
        _.extend(o, {
            id: "dayLabel"
        });
        return o;
    }());
    $.__views.Container.add($.__views.dayLabel);
    $.__views.weekLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
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
            }
        });
        Alloy.isTablet && _.extend(o, {
            left: 64
        });
        _.extend(o, {
            id: "weekLabel"
        });
        return o;
    }());
    $.__views.Container.add($.__views.weekLabel);
    $.__views.monthLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
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
            }
        });
        Alloy.isTablet && _.extend(o, {
            left: 62
        });
        _.extend(o, {
            id: "monthLabel"
        });
        return o;
    }());
    $.__views.Container.add($.__views.monthLabel);
    $.__views.blogSection.headerView = $.__views.Container;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.dayLabel.text = args.day.match(/[0-9]+$/)[0];
    $.monthLabel.text = args.day.match(/^[0-9]+-[0-9]+/)[0].replace("-", ".");
    $.weekLabel.text = util.getWeek(args.day);
    var items = args.feeds;
    for (var i = 0; items.length > i; i++) {
        var row = Alloy.createController("blogRow", items[i]).getView();
        $.blogSection.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;