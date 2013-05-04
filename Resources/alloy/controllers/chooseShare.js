function Controller() {
    function __alloyId20() {
        var models = filterFunction(__alloyId19);
        var len = models.length;
        var children = $.__views.userAvatarList.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.userAvatarList.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId17 = models[i];
            __alloyId17.__transform = transformFunction(__alloyId17);
            var __alloyId18 = Ti.UI.createImageView({
                preventDefaultImage: true,
                left: 10,
                right: 10,
                bottom: 20,
                width: 50,
                height: 50,
                opacity: .3,
                borderRadius: 5,
                image: "undefined" != typeof __alloyId17.__transform["avatar"] ? __alloyId17.__transform["avatar"] : __alloyId17.get("avatar"),
                uid: "undefined" != typeof __alloyId17.__transform["uid"] ? __alloyId17.__transform["uid"] : __alloyId17.get("uid"),
                modelId: "undefined" != typeof __alloyId17.__transform["alloy_id"] ? __alloyId17.__transform["alloy_id"] : __alloyId17.get("alloy_id")
            });
            $.__views.userAvatarList.add(__alloyId18);
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
    function share() {
        util.send("api/share", {
            itemID: args,
            domain_name: Ti.App.Properties.getString("domain_name"),
            friendsID: friendsID.toString()
        }, function(res) {
            var data = JSON.parse(res);
            (data.type = "success") ? clearShare() : util.alert("分享失败，请重试！");
        });
    }
    function clearShare() {
        $.cancelButton.removeEventListener("click", clearShare);
        $.shareButton.removeEventListener("click", share);
        $.chooseShare.close();
    }
    function close() {
        $.chooseShare.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("friend");
    $.__views.chooseShare = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        layout: "vertical",
        id: "chooseShare"
    });
    $.__views.chooseShare && $.addTopLevelView($.__views.chooseShare);
    close ? $.__views.chooseShare.addEventListener("blur", close) : __defers["$.__views.chooseShare!blur!close"] = true;
    $.__views.shareLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            left: 25,
            top: 90,
            height: 36,
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            color: "#666",
            shadowColor: "#fff",
            shadowOffset: {
                x: 1,
                y: 1
            }
        });
        Alloy.isTablet && _.extend(o, {
            top: 240
        });
        _.extend(o, {
            id: "shareLabel",
            text: "分享这则时光给："
        });
        return o;
    }());
    $.__views.chooseShare.add($.__views.shareLabel);
    $.__views.userAvatarList = Ti.UI.createView({
        left: 15,
        right: 15,
        top: 20,
        height: 150,
        layout: "horizontal",
        dataTransform: "transformFunction",
        id: "userAvatarList"
    });
    $.__views.chooseShare.add($.__views.userAvatarList);
    var __alloyId19 = Alloy.Collections["friend"] || friend;
    __alloyId19.on("fetch destroy change add remove reset", __alloyId20);
    addShare ? $.__views.userAvatarList.addEventListener("click", addShare) : __defers["$.__views.userAvatarList!click!addShare"] = true;
    $.__views.buttons = Ti.UI.createView({
        top: 20,
        height: 36,
        id: "buttons"
    });
    $.__views.chooseShare.add($.__views.buttons);
    $.__views.cancelButton = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: 0,
            left: 80,
            width: 70,
            height: 36,
            font: {
                size: 14
            },
            color: "#999",
            textAlign: "center",
            backgroundColor: "#ddd",
            borderColor: "#ccc",
            borderRadius: 5,
            shadowColor: "#fff"
        });
        Alloy.isTablet && _.extend(o, {
            left: 260
        });
        _.extend(o, {
            id: "cancelButton",
            text: "取 消"
        });
        return o;
    }());
    $.__views.buttons.add($.__views.cancelButton);
    close ? $.__views.cancelButton.addEventListener("click", close) : __defers["$.__views.cancelButton!click!close"] = true;
    $.__views.shareButton = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {
            top: 0,
            right: 80,
            width: 70,
            height: 36,
            font: {
                size: 14
            },
            color: "#fff",
            textAlign: "center",
            backgroundColor: "#51A351",
            borderColor: "#387038",
            borderRadius: 5,
            shadowColor: "#ccc"
        });
        Alloy.isTablet && _.extend(o, {
            right: 260
        });
        _.extend(o, {
            id: "shareButton",
            text: "确 定"
        });
        return o;
    }());
    $.__views.buttons.add($.__views.shareButton);
    share ? $.__views.shareButton.addEventListener("click", share) : __defers["$.__views.shareButton!click!share"] = true;
    exports.destroy = function() {
        __alloyId19.off("fetch destroy change add remove reset", __alloyId20);
    };
    _.extend($, $.__views);
    var args = arguments[0] || {};
    Ti.API.info(args);
    var friendsID = [];
    var ownerID = parseInt(Ti.App.Properties.getString("id"));
    var friends = Alloy.Collections.friend;
    friends.fetch();
    var myFriends = filterFunction(friends);
    0 == myFriends.length && $.shareLabel.setVisible(false);
    $.chooseShare.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.chooseShare!blur!close"] && $.__views.chooseShare.addEventListener("blur", close);
    __defers["$.__views.userAvatarList!click!addShare"] && $.__views.userAvatarList.addEventListener("click", addShare);
    __defers["$.__views.cancelButton!click!close"] && $.__views.cancelButton.addEventListener("click", close);
    __defers["$.__views.shareButton!click!share"] && $.__views.shareButton.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;