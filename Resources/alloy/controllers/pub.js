function Controller() {
    function __alloyId48(e) {
        var models = filterFunction(__alloyId47), len = models.length, children = $.__views.userAvatarList.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.userAvatarList.remove(children[d]);
        for (var i = 0; i < len; i++) {
            var __alloyId45 = models[i];
            __alloyId45.__transform = transformFunction(__alloyId45);
            var __alloyId46 = Ti.UI.createImageView({
                preventDefaultImage: !0,
                top: 4,
                left: 8,
                width: 24,
                height: 24,
                borderRadius: 3,
                opacity: 0.3,
                id: "userAvatar",
                image: typeof __alloyId45.__transform.avatar != "undefined" ? __alloyId45.__transform.avatar : __alloyId45.get("avatar"),
                uid: typeof __alloyId45.__transform.uid != "undefined" ? __alloyId45.__transform.uid : __alloyId45.get("uid"),
                modelId: typeof __alloyId45.__transform.alloy_id != "undefined" ? __alloyId45.__transform.alloy_id : __alloyId45.get("alloy_id")
            });
            $.__views.userAvatarList.add(__alloyId46);
        }
    }
    function filterFunction(collection) {
        return collection.where({
            owner: ownerID
        });
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.avatar != null ? transform.avatar = Alloy.Globals.sitePath + transform.avatar : transform.avatar = "avatar.png";
        return transform;
    }
    function addShare(e) {
        if (e.source.opacity == 0.3) {
            e.source.opacity = 0.99;
            friendsID.push(e.source.uid);
            return;
        }
        if (e.source.opacity == 0.99) {
            e.source.opacity = 0.3;
            for (var i = 0; i < friendsID.length; i++) friendsID[i] == e.source.uid && friendsID.splice(i, 1);
        }
    }
    function showPhoto(imgs) {
        $.pub.remove($.imageContainer);
        $.image.image = imgs.middleImg.src;
        $.cancelButton.addEventListener("click", clearPub);
        $.pubButton.addEventListener("click", pub);
    }
    function pub() {
        $.commentInput.blur();
        util.send("api/uploadPhoto", {
            photo: $.image.image,
            content: $.commentInput.value,
            id: Ti.App.Properties.getString("id"),
            friendsID: friendsID.toString()
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type = "success") {
                clearPub();
                Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
                Alloy.Globals.fetchBlog();
                Alloy.Globals.tableBlog.scrollToTop();
            } else util.alert("上传失败，请重新发布！");
        });
    }
    function clearPub() {
        $.pub.add($.imageContainer);
        $.image.image = "null";
        $.commentInput.value = "";
        $.cancelButton.removeEventListener("click", clearPub);
        $.pubButton.removeEventListener("click", pub);
        $.pub.close();
    }
    function openZoomImage() {
        $.commentInput.blur();
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    function showKeybroad() {
        $.commentInput.focus();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("friend");
    $.__views.pub = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: !0,
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    showKeybroad ? $.__views.pub.addEventListener("focus", showKeybroad) : __defers["$.__views.pub!focus!showKeybroad"] = !0;
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "top",
        text: "记录这一刻"
    });
    $.__views.pub.add($.__views.top);
    $.__views.cancelButton = Ti.UI.createLabel({
        left: 10,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "backBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "cancelButton",
        text: "取消"
    });
    $.__views.pub.add($.__views.cancelButton);
    $.__views.imageContainer = Ti.UI.createView({
        top: 64,
        width: 90,
        height: 90,
        borderColor: "#999",
        id: "imageContainer"
    });
    $.__views.pub.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 44,
        width: 90,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.__alloyId44 = Ti.UI.createScrollView({
        height: 320,
        bottom: 0,
        id: "__alloyId44"
    });
    $.__views.pub.add($.__views.__alloyId44);
    $.__views.shareLabel = Ti.UI.createLabel({
        left: 0,
        bottom: 44,
        width: 320,
        height: 32,
        opacity: 0.8,
        font: {
            fontSize: 12,
            fontWeight: "bold"
        },
        verticalAlign: "center",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        zIndex: 1,
        id: "shareLabel",
        text: "  分享给："
    });
    $.__views.__alloyId44.add($.__views.shareLabel);
    $.__views.userAvatarList = Ti.UI.createView({
        left: 50,
        bottom: 44,
        height: 32,
        layout: "horizontal",
        zIndex: 1,
        dataTransform: "transformFunction",
        id: "userAvatarList"
    });
    $.__views.__alloyId44.add($.__views.userAvatarList);
    var __alloyId47 = Alloy.Collections.friend || friend;
    __alloyId47.on("fetch destroy change add remove reset", __alloyId48);
    addShare ? $.__views.userAvatarList.addEventListener("click", addShare) : __defers["$.__views.userAvatarList!click!addShare"] = !0;
    $.__views.toolbar = Ti.UI.createView({
        bottom: 0,
        height: 44,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#666",
                offset: 0
            }, {
                color: "#fff",
                offset: 0.025
            }, {
                color: "#eee",
                offset: 0.05
            }, {
                color: "#ccc",
                offset: 1
            } ]
        },
        id: "toolbar"
    });
    $.__views.__alloyId44.add($.__views.toolbar);
    $.__views.commentInput = Ti.UI.createTextField({
        left: 7,
        top: 7,
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "添加照片描述",
        enableReturnKey: !0,
        zIndex: 1,
        id: "commentInput"
    });
    $.__views.toolbar.add($.__views.commentInput);
    $.__views.pubButton = Ti.UI.createLabel({
        right: 7,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "buttonBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "pubButton",
        text: "发布"
    });
    $.__views.toolbar.add($.__views.pubButton);
    exports.destroy = function() {
        __alloyId47.off("fetch destroy change add remove reset", __alloyId48);
    };
    _.extend($, $.__views);
    Alloy.Globals.showPhoto = showPhoto;
    var friendsID = [], ownerID = parseInt(Ti.App.Properties.getString("id")), friends = Alloy.Collections.friend;
    friends.fetch();
    var myFriends = filterFunction(friends);
    myFriends.length == 0 && $.shareLabel.setVisible(!1);
    $.pub.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.pub!focus!showKeybroad"] && $.__views.pub.addEventListener("focus", showKeybroad);
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    __defers["$.__views.userAvatarList!click!addShare"] && $.__views.userAvatarList.addEventListener("click", addShare);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;