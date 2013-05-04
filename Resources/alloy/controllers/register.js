function Controller() {
    function back() {
        $.register.close();
    }
    function focusPassword() {
        $.passwordInput.focus();
    }
    function focusNickname() {
        $.nicknameInput.focus();
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
            allowEditing: true
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
            saveToPhotoGallery: true,
            allowEditing: true
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
            if ("success" == data.type) {
                Ti.App.Properties.setString("id", data.id);
                Ti.App.Properties.setString("email", data.email);
                Ti.App.Properties.setString("password", $.passwordInput.value);
                Ti.App.Properties.setString("domain_name", data.domain_name);
                Ti.App.Properties.setString("avatar", data.avatar);
                Alloy.Globals.avatar.image = $.avatar.image;
                Alloy.Globals.tabGroup.open({
                    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
                });
                Alloy.Globals.menu.open();
                $.register.close();
            } else "fail" == data.type ? alert("注册失败") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.register = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        id: "register"
    });
    $.__views.register && $.addTopLevelView($.__views.register);
    $.__views.top = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
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
    register ? $.__views.registerButton.addEventListener("click", register) : __defers["$.__views.registerButton!click!register"] = true;
    $.__views.backButton = Ti.UI.createLabel({
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
        id: "backButton",
        text: "返回"
    });
    $.__views.top.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = true;
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
    $.__views.__alloyId45 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId45"
    });
    $.__views.container.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "邮箱",
        id: "__alloyId46"
    });
    $.__views.__alloyId45.add($.__views.__alloyId46);
    $.__views.emailInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        autocapitalization: false,
        autocorrect: false,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        id: "emailInput"
    });
    $.__views.__alloyId45.add($.__views.emailInput);
    focusPassword ? $.__views.emailInput.addEventListener("return", focusPassword) : __defers["$.__views.emailInput!return!focusPassword"] = true;
    $.__views.__alloyId47 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId47"
    });
    $.__views.container.add($.__views.__alloyId47);
    $.__views.__alloyId48 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "密码",
        id: "__alloyId48"
    });
    $.__views.__alloyId47.add($.__views.__alloyId48);
    $.__views.passwordInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        autocapitalization: false,
        autocorrect: false,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        passwordMask: true,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        id: "passwordInput"
    });
    $.__views.__alloyId47.add($.__views.passwordInput);
    focusNickname ? $.__views.passwordInput.addEventListener("return", focusNickname) : __defers["$.__views.passwordInput!return!focusNickname"] = true;
    $.__views.__alloyId49 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId49"
    });
    $.__views.container.add($.__views.__alloyId49);
    $.__views.__alloyId50 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "昵称",
        id: "__alloyId50"
    });
    $.__views.__alloyId49.add($.__views.__alloyId50);
    $.__views.nicknameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        autocapitalization: false,
        autocorrect: false,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        id: "nicknameInput"
    });
    $.__views.__alloyId49.add($.__views.nicknameInput);
    showDialog ? $.__views.nicknameInput.addEventListener("return", showDialog) : __defers["$.__views.nicknameInput!return!showDialog"] = true;
    $.__views.__alloyId51 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId51"
    });
    $.__views.container.add($.__views.__alloyId51);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "头像",
        id: "__alloyId52"
    });
    $.__views.__alloyId51.add($.__views.__alloyId52);
    $.__views.avatar = Ti.UI.createImageView({
        preventDefaultImage: true,
        left: 10,
        right: 10,
        height: 34,
        color: "#666",
        font: {
            fontSize: 16
        },
        autocapitalization: false,
        autocorrect: false,
        returnKeyType: Ti.UI.RETURNKEY_NEXT,
        image: "avatar.png",
        id: "avatar"
    });
    $.__views.__alloyId51.add($.__views.avatar);
    showDialog ? $.__views.avatar.addEventListener("click", showDialog) : __defers["$.__views.avatar!click!showDialog"] = true;
    var __alloyId54 = [];
    __alloyId54.push("拍照");
    __alloyId54.push("从相册选取");
    __alloyId54.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId54,
        id: "dialog",
        cancel: "2",
        title: "上传头像"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.registerButton!click!register"] && $.__views.registerButton.addEventListener("click", register);
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    __defers["$.__views.emailInput!return!focusPassword"] && $.__views.emailInput.addEventListener("return", focusPassword);
    __defers["$.__views.passwordInput!return!focusNickname"] && $.__views.passwordInput.addEventListener("return", focusNickname);
    __defers["$.__views.nicknameInput!return!showDialog"] && $.__views.nicknameInput.addEventListener("return", showDialog);
    __defers["$.__views.avatar!click!showDialog"] && $.__views.avatar.addEventListener("click", showDialog);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;