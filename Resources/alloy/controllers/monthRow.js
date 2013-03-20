function Controller() {
    function showDay() {
        Alloy.createController("monthDay", items).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.Globals.GUI_bkC,
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
        color: Alloy.Globals.GUI_FC,
        font: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: "迷你简瘦金书"
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
                opacity: 0.6,
                font: {
                    fontSize: 12,
                    fontWeight: "bold",
                    fontFamily: "迷你简南宫"
                },
                color: "white",
                textAlign: "center",
                text: "共" + items.length + "张 »"
            });
            image.image = image.toBlob().imageAsThumbnail(75);
            view.add(image);
            view.add(label);
            $.imageContainer.add(view);
        }
    }
    __defers["$.__views.row!click!showDay"] && $.__views.row.addEventListener("click", showDay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;