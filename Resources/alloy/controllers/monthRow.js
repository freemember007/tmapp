function Controller() {
    function showDay() {
        var monthDay = Alloy.createController("monthDay", items).getView();
        monthDay.children[0].text = args.day + "日";
        Alloy.Globals.tab2.open(monthDay);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: "#f3f3f3",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "vertical",
        height: 100,
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    showDay ? $.__views.row.addEventListener("click", showDay) : __defers["$.__views.row!click!showDay"] = !0;
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
            fontSize: 16,
            fontFamily: "HelveticaNeue-CondensedBlack"
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
    for (i = 0; i < items.length; i++) {
        if (i < 3) {
            var image = Ti.UI.createImageView({
                image: items[i].url
            });
            image.image = image.toBlob().imageAsThumbnail(75);
            $.imageContainer.add(image);
        }
        if (i == 4) {
            var view = Ti.UI.createView({}), image = Ti.UI.createImageView({
                image: items[i].url
            }), label = Ti.UI.createLabel({
                width: 75,
                height: 75,
                backgroundColor: "black",
                opacity: 0.5
            }), arrow = Ti.UI.createImageView({
                width: 75,
                height: 45,
                top: 0,
                image: "arrow.png"
            }), text = Ti.UI.createLabel({
                width: 75,
                height: 30,
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
            image.image = image.toBlob().imageAsThumbnail(75);
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;