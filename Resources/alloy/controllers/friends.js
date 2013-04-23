function Controller() {
    function __alloyId23(e) {
        var models = filterFunction(__alloyId22), len = models.length, children = $.__views.userList.children;
        for (var d = children.length - 1; d >= 0; d--) $.__views.userList.remove(children[d]);
        for (var i = 0; i < len; i++) {
            var __alloyId17 = models[i];
            __alloyId17.__transform = transformFunction(__alloyId17);
            var __alloyId19 = Ti.UI.createImageView({
                preventDefaultImage: !0,
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                width: 85,
                height: 85,
                borderRadius: 5,
                image: typeof __alloyId17.__transform.avatar != "undefined" ? __alloyId17.__transform.avatar : __alloyId17.get("avatar"),
                id: "__alloyId18"
            });
            $.__views.userList.add(__alloyId19);
            var __alloyId21 = Ti.UI.createLabel({
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
                opacity: 0.9,
                text: typeof __alloyId17.__transform.domain_name != "undefined" ? __alloyId17.__transform.domain_name : __alloyId17.get("domain_name"),
                id: "__alloyId20"
            });
            __alloyId19.add(__alloyId21);
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
    function addFriend() {
        if ($.input.value.match(/^\s*$/)) {
            $.input.value = "";
            return;
        }
        $.input.value == Ti.App.Properties.getString("domain_name") ? util.alert("不可添加自己为自己人") : friends.where({
            owner: ownerID
        }).length == 9 ? util.alert("自己人最多可设9人，现在达上限，请删除不必要的自己人。") : friends.length != 0 && friends.where({
            owner: ownerID,
            domain_name: $.input.value
        }).length != 0 ? util.alert("用户已经在您的自己人列表中！") : util.get("api/userInfo?domain_name=" + $.input.value, function(res) {
            var data = JSON.parse(res);
            if (data.success) {
                var friend = Alloy.createModel("friend", {
                    uid: data.uid,
                    owner: ownerID,
                    avatar: data.avatar,
                    domain_name: data.domain_name
                });
                friend.save();
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
            Alloy.Globals.slide = !1;
        } else {
            $.friends.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            $.input.blur();
            $.input.value = "";
            Alloy.Globals.slide = !0;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("friend");
    $.__views.friends = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        id: "friends"
    });
    $.addTopLevelView($.__views.friends);
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        left: 0,
        top: 0,
        backgroundImage: "top5.png",
        color: "#555",
        opacity: 0.9,
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
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = !0;
    $.__views.toolbar = Ti.UI.createView({
        left: 0,
        top: 44,
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
        zIndex: 1,
        id: "input"
    });
    $.__views.toolbar.add($.__views.input);
    $.__views.submit = Ti.UI.createLabel({
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
        id: "submit",
        text: "添加"
    });
    $.__views.toolbar.add($.__views.submit);
    addFriend ? $.__views.submit.addEventListener("click", addFriend) : __defers["$.__views.submit!click!addFriend"] = !0;
    $.__views.userList = Ti.UI.createView({
        left: 0,
        top: 100,
        width: 320,
        layout: "horizontal",
        dataTransform: "transformFunction",
        id: "userList"
    });
    $.__views.friends.add($.__views.userList);
    var __alloyId22 = Alloy.Collections.friend || friend;
    __alloyId22.on("fetch destroy change add remove reset", __alloyId23);
    exports.destroy = function() {
        __alloyId22.off("fetch destroy change add remove reset", __alloyId23);
    };
    _.extend($, $.__views);
    var ownerID = parseInt(Ti.App.Properties.getString("id")), friends = Alloy.Collections.friend;
    friends.fetch();
    $.friends.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    __defers["$.__views.submit!click!addFriend"] && $.__views.submit.addEventListener("click", addFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;