function Controller() {
    function back() {
        $.register.close();
    }
    function showDialog() {
        $.dialog.show();
    }
    function choose(e) {
        switch (e.index) {
          case 0:
            takePhoto();
            break;
          case 1:
            openPhoto();
        }
    }
    function openPhoto() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            allowEditing: !0
        });
    }
    function takePhoto() {
        Ti.Media.showCamera({
            success: function(e) {
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            saveToPhotoGallery: !0,
            allowEditing: !0
        });
    }
    function showPhoto(imgs) {
        $.avatar.image = imgs.thumb.src;
    }
    function register() {
        util.send("api/register", {
            email: $.emailInput.value,
            password: $.passwordInput.value,
            domain_name: $.nicknameInput.value,
            avatar: $.avatar.image,
            device_token: Ti.App.Properties.getString("device_token")
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                Ti.App.Properties.setString("id", data.id);
                Ti.App.Properties.setString("email", $.emailInput.value);
                Ti.App.Properties.setString("password", $.passwordInput.value);
                Ti.App.Properties.setString("domain_name", data.domain_name);
                Ti.App.Properties.setString("avatar", data.avatar);
                Alloy.Globals.avatar.image = $.avatar.image;
                Alloy.Globals.tabGroup.open({
                    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
                });
                Alloy.Globals.menu.open();
                $.register.close();
            } else data.type == "fail" ? alert("注册失败") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        tabBarHidden: !0,
        id: "register"
    });
    $.addTopLevelView($.__views.register);
    $.__views.top = Ti.UI.createView({
        width: "100%",
        height: 47,
        top: 0,
        backgroundImage: "top0.png",
        id: "top"
    });
    $.__views.register.add($.__views.top);
    $.__views.registerButton = Ti.UI.createLabel({
        right: 10,
        top: 7,
        width: 51,
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
        id: "registerButton",
        text: "注册"
    });
    $.__views.top.add($.__views.registerButton);
    register ? $.__views.registerButton.addEventListener("click", register) : __defers["$.__views.registerButton!click!register"] = !0;
    $.__views.backButton = Ti.UI.createLabel({
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
        id: "backButton",
        text: "返回"
    });
    $.__views.top.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = !0;
    $.__views.container = Ti.UI.createView({
        top: 55,
        bottom: 10,
        left: 10,
        right: 10,
        layout: "vertical",
        id: "container"
    });
    $.__views.register.add($.__views.container);
    $.__views.registerTitle = Ti.UI.createLabel({
        left: 0,
        font: {
            fontSize: 16
        },
        id: "registerTitle",
        text: "注册一个新帐户："
    });
    $.__views.container.add($.__views.registerTitle);
    $.__views.__alloyId50 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId50"
    });
    $.__views.container.add($.__views.__alloyId50);
    $.__views.__alloyId51 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "邮箱",
        id: "__alloyId51"
    });
    $.__views.__alloyId50.add($.__views.__alloyId51);
    $.__views.emailInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        id: "emailInput"
    });
    $.__views.__alloyId50.add($.__views.emailInput);
    $.__views.__alloyId52 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId52"
    });
    $.__views.container.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "密码",
        id: "__alloyId53"
    });
    $.__views.__alloyId52.add($.__views.__alloyId53);
    $.__views.passwordInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        passwordMask: !0,
        id: "passwordInput"
    });
    $.__views.__alloyId52.add($.__views.passwordInput);
    $.__views.__alloyId54 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId54"
    });
    $.__views.container.add($.__views.__alloyId54);
    $.__views.__alloyId55 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "昵称",
        id: "__alloyId55"
    });
    $.__views.__alloyId54.add($.__views.__alloyId55);
    $.__views.nicknameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        id: "nicknameInput"
    });
    $.__views.__alloyId54.add($.__views.nicknameInput);
    $.__views.__alloyId56 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId56"
    });
    $.__views.container.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "头像",
        id: "__alloyId57"
    });
    $.__views.__alloyId56.add($.__views.__alloyId57);
    $.__views.avatar = Ti.UI.createImageView({
        preventDefaultImage: !0,
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        image: "avatar.png",
        id: "avatar"
    });
    $.__views.__alloyId56.add($.__views.avatar);
    showDialog ? $.__views.avatar.addEventListener("click", showDialog) : __defers["$.__views.avatar!click!showDialog"] = !0;
    var __alloyId59 = [];
    __alloyId59.push("拍照");
    __alloyId59.push("从相册选取");
    __alloyId59.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId59,
        id: "dialog",
        cancel: "2",
        title: "上传头像"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.registerButton!click!register"] && $.__views.registerButton.addEventListener("click", register);
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    __defers["$.__views.avatar!click!showDialog"] && $.__views.avatar.addEventListener("click", showDialog);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;