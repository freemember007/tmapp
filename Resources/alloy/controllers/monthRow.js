function Controller() {
    function showDay() {
        var monthDay = Alloy.createController("monthDay", items).getView();
        monthDay.children[0].text = args.day + "日";
        Alloy.Globals.tab2.open(monthDay);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.row = Ti.UI.createTableViewRow(function() {
        var o = {};
        _.extend(o, {
            backgroundColor: "#f3f3f3",
            selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
            layout: "vertical",
            height: 100
        });
        Alloy.isTablet && _.extend(o, {
            height: 240
        });
        _.extend(o, {
            id: "row"
        });
        return o;
    }());
    $.__views.row && $.addTopLevelView($.__views.row);
    showDay ? $.__views.row.addEventListener("click", showDay) : __defers["$.__views.row!click!showDay"] = true;
    $.__views.label = Ti.UI.createLabel({
        top: 5,
        bottom: 5,
        height: 20,
        color: "#666",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 16
        },
        left: 10,
        id: "label"
    });
    $.__views.row.add($.__views.label);
    $.__views.imageContainer = Ti.UI.createView({
        layout: "horizontal",
        left: 10,
        id: "imageContainer"
    });
    $.__views.row.add($.__views.imageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.label.text = args.day + "日";
    var items = args.feeds;
    for (var i = 0; items.length > i; i++) {
        if (3 > i) {
            var image = Ti.UI.createImageView({
                image: Alloy.Globals.sitePath + items[i].url,
                width: 75 * Alloy.CFG.GUI_widthScale,
                height: 75 * Alloy.CFG.GUI_widthScale
            });
            image.image = image.toBlob().imageAsThumbnail(150 * Alloy.CFG.GUI_widthScale);
            $.imageContainer.add(image);
        }
        if (4 == i) {
            var view = Ti.UI.createView({});
            var image = Ti.UI.createImageView({
                image: Alloy.Globals.sitePath + items[i].url,
                width: 75 * Alloy.CFG.GUI_widthScale,
                height: 75 * Alloy.CFG.GUI_widthScale
            });
            var label = Ti.UI.createLabel({
                width: 75 * Alloy.CFG.GUI_widthScale,
                height: 75 * Alloy.CFG.GUI_widthScale,
                backgroundColor: "black",
                opacity: .5
            });
            var arrow = Ti.UI.createImageView({
                width: 75,
                height: 45,
                top: 0,
                image: "arrow.png"
            });
            var text = Ti.UI.createLabel({
                width: 75 * Alloy.CFG.GUI_widthScale,
                height: 30 * Alloy.CFG.GUI_widthScale,
                bottom: 10,
                font: {
                    fontSize: 12
                },
                color: "#fff",
                shadowColor: "#000",
                shadowOffset: {
                    x: 1,
                    y: 1
                },
                textAlign: "center",
                text: "共" + items.length + "张"
            });
            image.image = image.toBlob().imageAsThumbnail(120 * Alloy.CFG.GUI_widthScale);
            view.add(image);
            view.add(label);
            view.add(arrow);
            view.add(text);
            $.imageContainer.add(view);
        }
    }
    __defers["$.__views.row!click!showDay"] && $.__views.row.addEventListener("click", showDay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;