function Controller() {
    function __alloyId43() {
        __alloyId43.opts || {};
        var models = filterFunction(__alloyId42);
        var len = models.length;
        var children = $.__views.userAvatarList.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.userAvatarList.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId40 = models[i];
            __alloyId40.__transform = transformFunction(__alloyId40);
            var __alloyId41 = Ti.UI.createImageView({
                preventDefaultImage: true,
                left: 8,
                top: 4,
                width: 24,
                height: 24,
                borderRadius: 3,
                opacity: .3,
                image: "undefined" != typeof __alloyId40.__transform["avatar"] ? __alloyId40.__transform["avatar"] : __alloyId40.get("avatar"),
                uid: "undefined" != typeof __alloyId40.__transform["uid"] ? __alloyId40.__transform["uid"] : __alloyId40.get("uid"),
                modelId: "undefined" != typeof __alloyId40.__transform["alloy_id"] ? __alloyId40.__transform["alloy_id"] : __alloyId40.get("alloy_id")
            });
            $.__views.userAvatarList.add(__alloyId41);
        }
    }
    function filterFunction(collection) {
        return collection.where({
            owner: ownerID
        });
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.avatar = null != transform.avatar ? Alloy.Globals.sitePath + transform.avatar : "avatar.png";
        return transform;
    }
    function addShare(e) {
        if (.3 == e.source.opacity) {
            e.source.opacity = .99;
            friendsID.push(e.source.uid);
            return;
        }
        if (.99 == e.source.opacity) {
            e.source.opacity = .3;
            for (var i = 0; friendsID.length > i; i++) friendsID[i] == e.source.uid && friendsID.splice(i, 1);
        }
    }
    function showPhoto(imgs) {
        $.image.image = imgs.middleImg.src;
        $.cancelButton.addEventListener("click", clearPub);
        $.pubButton.addEventListener("click", pub);
    }
    function hideActInd() {
        $.imageContainer.hide();
        $.actInd.hide();
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
                Alloy.Globals.tableBlog.scrollToTop();
                Alloy.Globals.fetchBlog();
            } else util.alert("上传失败，请重新发布！");
        });
    }
    function clearPub() {
        $.cancelButton.removeEventListener("click", clearPub);
        $.pubButton.removeEventListener("click", pub);
        hideActInd();
        $.image.image = "null";
        $.commentInput.value = "";
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
    this.__controllerPath = "pub";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("friend");
    $.__views.pub = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        id: "pub"
    });
    $.__views.pub && $.addTopLevelView($.__views.pub);
    showKeybroad ? $.__views.pub.addEventListener("focus", showKeybroad) : __defers["$.__views.pub!focus!showKeybroad"] = true;
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
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
        text: "记录你的时光"
    });
    $.__views.pub.add($.__views.top);
    $.__views.cancelButton = Ti.UI.createLabel({
        left: 10,
        top: 8,
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
    $.__views.actInd = Ti.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "actInd"
    });
    $.__views.imageContainer.add($.__views.actInd);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: true,
        top: 44,
        height: 120,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = true;
    hideActInd ? $.__views.image.addEventListener("load", hideActInd) : __defers["$.__views.image!load!hideActInd"] = true;
    $.__views.__alloyId39 = Ti.UI.createScrollView({
        left: 0,
        bottom: 0,
        width: Ti.Platform.displayCaps.platformWidth,
        height: 330,
        disableBounce: true,
        id: "__alloyId39"
    });
    $.__views.pub.add($.__views.__alloyId39);
    $.__views.shareLabel = Ti.UI.createLabel({
        left: 0,
        bottom: 44,
        width: Ti.Platform.displayCaps.platformWidth,
        height: 32,
        backgroundColor: Alloy.Globals.GUI_bkC,
        opacity: .8,
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
        id: "shareLabel",
        text: "  分享给："
    });
    $.__views.__alloyId39.add($.__views.shareLabel);
    $.__views.userAvatarList = Ti.UI.createView({
        left: 50,
        bottom: 44,
        height: 32,
        width: "auto",
        layout: "horizontal",
        zIndex: 1,
        dataTransform: "transformFunction",
        id: "userAvatarList"
    });
    $.__views.__alloyId39.add($.__views.userAvatarList);
    var __alloyId42 = Alloy.Collections["friend"] || friend;
    __alloyId42.on("fetch destroy change add remove reset", __alloyId43);
    addShare ? $.__views.userAvatarList.addEventListener("click", addShare) : __defers["$.__views.userAvatarList!click!addShare"] = true;
    $.__views.toolbar = Ti.UI.createView({
        left: 0,
        bottom: 0,
        height: 44,
        width: Ti.Platform.displayCaps.platformWidth,
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
                offset: .025
            }, {
                color: "#eee",
                offset: .05
            }, {
                color: "#ccc",
                offset: 1
            } ]
        },
        id: "toolbar"
    });
    $.__views.__alloyId39.add($.__views.toolbar);
    $.__views.commentInput = Ti.UI.createTextField({
        left: 7,
        top: 7,
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "描述这则时光",
        enableReturnKey: true,
        autocapitalization: false,
        autocorrect: false,
        id: "commentInput"
    });
    $.__views.toolbar.add($.__views.commentInput);
    $.__views.pubButton = Ti.UI.createLabel({
        right: 7,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "buttonRound.png",
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
        __alloyId42.off("fetch destroy change add remove reset", __alloyId43);
    };
    _.extend($, $.__views);
    $.actInd.show();
    Alloy.Globals.showPhoto = showPhoto;
    var friendsID = [];
    var ownerID = parseInt(Ti.App.Properties.getString("id"));
    var friends = Alloy.Collections.friend;
    friends.fetch();
    var myFriends = filterFunction(friends);
    0 == myFriends.length && $.shareLabel.setVisible(false);
    $.pub.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.pub!focus!showKeybroad"] && $.__views.pub.addEventListener("focus", showKeybroad);
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    __defers["$.__views.image!load!hideActInd"] && $.__views.image.addEventListener("load", hideActInd);
    __defers["$.__views.userAvatarList!click!addShare"] && $.__views.userAvatarList.addEventListener("click", addShare);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;