function Controller() {
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    function showDialog() {
        var dialog = Ti.UI.createOptionDialog({
            cancel: 1,
            options: [ "删除", "取消" ],
            destructive: 0,
            title: "确认删除？"
        });
        dialog.show();
        dialog.addEventListener("click", function(e) {
            e.index == 0 && util.get("api/delete?id=" + args.id, function(res) {
                var data = JSON.parse(res);
                data.success && Alloy.Globals.fetchBlog();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogRow = Ti.UI.createTableViewRow({
        backgroundColor: "#f3f3f3",
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
            fontWeight: "bold"
        },
        color: "#555",
        shadowColor: "#eee",
        shadowOffset: {
            x: 1,
            y: 1
        },
        backgroundColor: "transparent",
        id: "label"
    });
    $.__views.container.add($.__views.label);
    $.__views.actionContainer = Ti.UI.createView({
        bottom: 5,
        height: 30,
        width: 286,
        id: "actionContainer"
    });
    $.__views.blogRow.add($.__views.actionContainer);
    $.__views.timeLabel = Ti.UI.createLabel({
        left: 0,
        color: "#888",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 12,
            fontStyle: "italic",
            fontWeight: "bold"
        },
        id: "timeLabel"
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
    showDialog ? $.__views.deleteImg.addEventListener("click", showDialog) : __defers["$.__views.deleteImg!click!showDialog"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args.url;
    var hour = args.created_at.match(/[0-9]+:[0-9]+/)[0];
    $.timeLabel.text = util.formatTime(parseInt(hour)) + " " + hour;
    args.content == "" ? $.label.height = 11 : $.label.text = args.content;
    __defers["$.__views.container!click!openZoomImage"] && $.__views.container.addEventListener("click", openZoomImage);
    __defers["$.__views.deleteImg!click!showDialog"] && $.__views.deleteImg.addEventListener("click", showDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;