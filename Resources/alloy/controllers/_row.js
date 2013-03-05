function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.row = Ti.UI.createTableViewRow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "vertical",
        id: "row"
    });
    $.addTopLevelView($.__views.row);
    $.__views.image = Ti.UI.createImageView({
        top: 5,
        width: 300,
        borderWidth: 5,
        borderColor: "white",
        preventDefaultImage: !0,
        id: "image"
    });
    $.__views.row.add($.__views.image);
    $.__views.label = Ti.UI.createLabel({
        bottom: 5,
        height: 60,
        width: 300,
        font: {
            fontSize: 14,
            fontStyle: "italic"
        },
        shadowColor: "#ddd",
        backgroundColor: "white",
        id: "label"
    });
    $.__views.row.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args.url;
    args.content == "" ? $.row.remove($.label) : $.label.text = "  " + args.content;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;