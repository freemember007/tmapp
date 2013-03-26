function Controller() {
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogRow = Ti.UI.createTableViewRow({
        backgroundColor: "#fff",
        borderColor: "#ccc",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "vertical",
        id: "blogRow"
    });
    $.addTopLevelView($.__views.blogRow);
    $.__views.container = Ti.UI.createLabel({
        width: 308,
        backgroundImage: "image_back.png",
        layout: "vertical",
        text: "",
        id: "container"
    });
    $.__views.blogRow.add($.__views.container);
    openZoomImage ? $.__views.container.addEventListener("click", openZoomImage) : __defers["$.__views.container!click!openZoomImage"] = !0;
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 9,
        width: 286,
        id: "image"
    });
    $.__views.container.add($.__views.image);
    $.__views.label = Ti.UI.createLabel({
        height: 40,
        width: 286,
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
        backgroundColor: "transparent",
        id: "label"
    });
    $.__views.container.add($.__views.label);
    $.__views.actionContainer = Ti.UI.createLabel({
        bottom: 5,
        height: 30,
        width: 286,
        text: "",
        id: "actionContainer"
    });
    $.__views.blogRow.add($.__views.actionContainer);
    $.__views.timeLabel = Ti.UI.createLabel({
        left: 0,
        color: "#999",
        font: {
            fontSize: 12,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        },
        id: "timeLabel",
        text: "清晨 06:38"
    });
    $.__views.actionContainer.add($.__views.timeLabel);
    $.__views.shareImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        right: 30,
        height: 16,
        width: 16,
        image: "share.png",
        id: "shareImg"
    });
    $.__views.actionContainer.add($.__views.shareImg);
    $.__views.deleteImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        right: 0,
        height: 16,
        width: 16,
        image: "delete.png",
        id: "deleteImg"
    });
    $.__views.actionContainer.add($.__views.deleteImg);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args.url;
    args.content == "" ? $.label.height = 11 : $.label.text = args.content;
    __defers["$.__views.container!click!openZoomImage"] && $.__views.container.addEventListener("click", openZoomImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;