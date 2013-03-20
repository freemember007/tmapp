function Controller() {
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogRow = Ti.UI.createTableViewRow({
        backgroundColor: "#ccc",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "vertical",
        id: "blogRow"
    });
    $.addTopLevelView($.__views.blogRow);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 5,
        width: 300,
        borderWidth: 5,
        borderColor: "white",
        id: "image"
    });
    $.__views.blogRow.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.label = Ti.UI.createLabel({
        bottom: 5,
        height: 60,
        width: 300,
        font: {
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        },
        color: "black",
        shadowColor: "#000",
        shadowOffset: {
            x: 0,
            y: 0
        },
        backgroundColor: "white",
        id: "label"
    });
    $.__views.blogRow.add($.__views.label);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args.url;
    args.content == "" ? $.blogRow.remove($.label) : $.label.text = "  " + args.content;
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;