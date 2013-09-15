function Controller() {
    function __alloyId27() {
        __alloyId27.opts || {};
        var models = filterFunction(__alloyId26);
        var len = models.length;
        var children = $.__views.userList.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.userList.remove(children[d]);
        for (var i = 0; len > i; i++) {
            var __alloyId23 = models[i];
            __alloyId23.__transform = transformFunction(__alloyId23);
            var __alloyId24 = Ti.UI.createImageView({
                preventDefaultImage: true,
                left: 15,
                top: 15,
                width: 85,
                height: 85,
                borderRadius: 5,
                image: "undefined" != typeof __alloyId23.__transform["avatar"] ? __alloyId23.__transform["avatar"] : __alloyId23.get("avatar")
            });
            $.__views.userList.add(__alloyId24);
            var __alloyId25 = Ti.UI.createLabel({
                bottom: 3,
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
                opacity: .9,
                text: "undefined" != typeof __alloyId23.__transform["domain_name"] ? __alloyId23.__transform["domain_name"] : __alloyId23.get("domain_name")
            });
            __alloyId24.add(__alloyId25);
        }
    }
    function filterFunction(collection) {
        return collection.where({
            owner: ownerID
        });
    }
    function transformFunction(model) {
        var transform = model.toJSON();
        transform.avatar = null == transform.avatar ? "avatar.png" : Alloy.Globals.sitePath + transform.avatar;
        return transform;
    }
    function addFriend() {
        if ($.input.value.match(/^\s*$/)) {
            $.input.value = "";
            return;
        }
        $.input.value == Ti.App.Properties.getString("domain_name") ? util.alert("不可添加自己为自己人") : 9 == friends.where({
            owner: ownerID
        }).length ? util.alert("自己人最多可设9人，现在达上限，请删除不必要的自己人。") : 0 != friends.length && 0 != friends.where({
            owner: ownerID,
            domain_name: $.input.value
        }).length ? util.alert("用户已经在您的自己人列表中！") : util.send("api/userInfo", {
            domain_name: $.input.value
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                var friend = Alloy.createModel("friend", {
                    uid: data.uid,
                    owner: ownerID,
                    avatar: data.avatar,
                    domain_name: data.domain_name
                });
                friend.save();
                $.hint.setVisible(false);
                friends.add(friend);
            } else util.alert("用户名不存在，请确认添加的用户名是否正确！");
        });
        $.input.value = "";
        $.input.blur();
    }
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            $.friends.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            Alloy.Globals.slide = false;
        } else {
            $.friends.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            $.input.blur();
            $.input.value = "";
            Alloy.Globals.slide = true;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "friends";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Collections.instance("friend");
    $.__views.friends = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        left: 200,
        id: "friends"
    });
    $.__views.friends && $.addTopLevelView($.__views.friends);
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        left: 0,
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
        text: "自己人"
    });
    $.__views.friends.add($.__views.top);
    $.__views.menuButton = Ti.UI.createLabel({
        left: 10,
        top: 9,
        width: 32,
        height: 27,
        backgroundImage: "menuIcon.png",
        zIndex: 2,
        id: "menuButton"
    });
    $.__views.friends.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = true;
    $.__views.toolbar = Ti.UI.createView({
        left: 0,
        top: 44,
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
        zIndex: 1,
        id: "toolbar"
    });
    $.__views.friends.add($.__views.toolbar);
    $.__views.input = Ti.UI.createTextField({
        left: 7,
        top: 7,
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "添加自己人",
        autocapitalization: false,
        autocorrect: false,
        enableReturnKey: true,
        returnKeyType: Ti.UI.RETURNKEY_GO,
        zIndex: 1,
        id: "input"
    });
    $.__views.toolbar.add($.__views.input);
    addFriend ? $.__views.input.addEventListener("return", addFriend) : __defers["$.__views.input!return!addFriend"] = true;
    $.__views.submit = Ti.UI.createLabel({
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
        id: "submit",
        text: "添加"
    });
    $.__views.toolbar.add($.__views.submit);
    addFriend ? $.__views.submit.addEventListener("click", addFriend) : __defers["$.__views.submit!click!addFriend"] = true;
    $.__views.hint = Ti.UI.createLabel({
        top: 100,
        width: 280,
        height: 280,
        color: "#666",
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
        visible: false,
        id: "hint",
        text: "暂无自己人。\\n请添加自己人，以便能分享时光给他们。"
    });
    $.__views.friends.add($.__views.hint);
    $.__views.userList = Ti.UI.createView({
        left: 0,
        top: 100,
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.Platform.displayCaps.platformWidth,
        layout: "horizontal",
        dataTransform: "transformFunction",
        id: "userList"
    });
    $.__views.friends.add($.__views.userList);
    var __alloyId26 = Alloy.Collections["friend"] || friend;
    __alloyId26.on("fetch destroy change add remove reset", __alloyId27);
    exports.destroy = function() {
        __alloyId26.off("fetch destroy change add remove reset", __alloyId27);
    };
    _.extend($, $.__views);
    var ownerID = parseInt(Ti.App.Properties.getString("id"));
    var friends = Alloy.Collections.friend;
    friends.fetch();
    var myFriends = filterFunction(friends);
    $.hint.setVisible(0 == myFriends.length ? true : false);
    $.friends.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    __defers["$.__views.input!return!addFriend"] && $.__views.input.addEventListener("return", addFriend);
    __defers["$.__views.submit!click!addFriend"] && $.__views.submit.addEventListener("click", addFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;