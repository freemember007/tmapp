function Controller() {
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    function showShare() {
        var ownerID = parseInt(Ti.App.Properties.getString("id"));
        var friends = Alloy.Collections.instance("friend");
        friends.fetch();
        var myFriends = friends.where({
            owner: ownerID
        });
        if (0 != myFriends.length) {
            var chooseShare = Alloy.createController("chooseShare", args.id).getView();
            chooseShare.left = 0;
            chooseShare.open({
                modal: true,
                modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL
            });
        } else util.alert("暂无自己人，无法分享，请添加至少一个自己人后再分享。");
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
            0 == e.index && util.send("api/delete", {
                id: args.id
            }, function(res) {
                var data = JSON.parse(res);
                "success" == data.type && Alloy.Globals.fetchBlog();
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "blogRow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.blogRow = Ti.UI.createTableViewRow({
        backgroundColor: "#f3f3f3",
        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
        layout: "vertical",
        id: "blogRow"
    });
    $.__views.blogRow && $.addTopLevelView($.__views.blogRow);
    $.__views.container = Ti.UI.createLabel({
        top: 0,
        width: 308,
        backgroundImage: "image_back.png",
        layout: "vertical",
        text: "",
        id: "container"
    });
    $.__views.blogRow.add($.__views.container);
    openZoomImage ? $.__views.container.addEventListener("click", openZoomImage) : __defers["$.__views.container!click!openZoomImage"] = true;
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: true,
        top: 9,
        width: 286,
        id: "image"
    });
    $.__views.container.add($.__views.image);
    $.__views.label = Ti.UI.createLabel({
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
        height: 17,
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
        preventDefaultImage: true,
        right: 30,
        height: 17,
        width: 17,
        image: "share.png",
        id: "shareImg"
    });
    $.__views.actionContainer.add($.__views.shareImg);
    showShare ? $.__views.shareImg.addEventListener("click", showShare) : __defers["$.__views.shareImg!click!showShare"] = true;
    $.__views.deleteImg = Ti.UI.createImageView({
        preventDefaultImage: true,
        right: 0,
        height: 17,
        width: 17,
        image: "delete.png",
        id: "deleteImg"
    });
    $.__views.actionContainer.add($.__views.deleteImg);
    showDialog ? $.__views.deleteImg.addEventListener("click", showDialog) : __defers["$.__views.deleteImg!click!showDialog"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = Alloy.Globals.sitePath + args.url;
    $.shareImg.itemID = args.id;
    $.container.backgroundImage = "image_back.png";
    var hour = args.created_at.match(/[0-9]+:[0-9]+/)[0];
    $.timeLabel.text = util.formatTime(parseInt(hour)) + " " + hour;
    if ("" == args.content) $.label.height = 11 * Alloy.CFG.GUI_widthScale; else {
        $.label.height = 40 * Alloy.CFG.GUI_widthScale;
        $.label.text = args.content.substring(0, 20);
    }
    __defers["$.__views.container!click!openZoomImage"] && $.__views.container.addEventListener("click", openZoomImage);
    __defers["$.__views.shareImg!click!showShare"] && $.__views.shareImg.addEventListener("click", showShare);
    __defers["$.__views.deleteImg!click!showDialog"] && $.__views.deleteImg.addEventListener("click", showDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;