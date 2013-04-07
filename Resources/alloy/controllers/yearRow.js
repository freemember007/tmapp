function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "horizontal",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    for (key in args) {
        var view = Ti.UI.createView({
            width: 105,
            height: 105,
            left: 1,
            bottom: 1
        }), image = Ti.UI.createImageView({
            image: args[key][0].url,
            date: key + "日",
            data: args[key]
        });
        image.image = image.toBlob().imageAsThumbnail(105);
        var label1 = Ti.UI.createLabel({
            bottom: 5,
            left: 10,
            font: {
                fontSize: 12
            },
            color: "#fff",
            shadowColor: "black",
            shadowOffset: {
                x: 1,
                y: 1
            },
            textAlign: "left",
            opacity: 0.9,
            text: key + "日"
        }), label2 = Ti.UI.createLabel({
            bottom: 5,
            right: 10,
            font: {
                fontSize: 12
            },
            color: "#fff",
            shadowColor: "black",
            shadowOffset: {
                x: 1,
                y: 1
            },
            textAlign: "right",
            opacity: 0.9,
            text: args[key].length
        });
        image.addEventListener("click", function(e) {
            var yearDay = Alloy.createController("yearDay", e.source.data).getView();
            yearDay.children[0].text = e.source.date;
            Alloy.Globals.tab4.open(yearDay);
        });
        view.add(image);
        view.add(label1);
        view.add(label2);
        $.row.add(view);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;