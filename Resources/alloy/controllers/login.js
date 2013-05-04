function Controller() {
    function editNext() {
        $.passwordInput.focus();
    }
    function login() {
        user.set({
            email: $.emailInput.value,
            password: $.passwordInput.value
        });
        util.send("api/login", {
            email: user.get("email"),
            password: user.get("password"),
            device_token: Ti.App.Properties.getString("device_token")
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                Ti.App.Properties.setString("id", data.id);
                Ti.App.Properties.setString("email", data.email);
                Ti.App.Properties.setString("password", $.passwordInput.value);
                Ti.App.Properties.setString("domain_name", data.domain_name);
                Ti.App.Properties.setString("avatar", data.avatar);
                Alloy.Globals.avatar.image = data.avatar ? Alloy.Globals.sitePath + data.avatar : "avatar.png";
                Alloy.Globals.tabGroup.open({
                    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
                });
                Alloy.Globals.menu.open();
                $.login.close();
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    function showRegister() {
        var register = Alloy.createController("register").getView();
        register.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        id: "login"
    });
    $.__views.login && $.addTopLevelView($.__views.login);
    $.__views.top = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        backgroundImage: "top0.png",
        id: "top"
    });
    $.__views.login.add($.__views.top);
    $.__views.loginButton = Ti.UI.createLabel({
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
        id: "loginButton",
        text: "登录"
    });
    $.__views.top.add($.__views.loginButton);
    login ? $.__views.loginButton.addEventListener("click", login) : __defers["$.__views.loginButton!click!login"] = true;
    $.__views.container = Ti.UI.createView({
        top: 55,
        bottom: 10,
        left: 10,
        right: 10,
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        layout: "vertical",
        id: "container"
    });
    $.__views.login.add($.__views.container);
    $.__views.loginTitle = Ti.UI.createLabel({
        left: 0,
        font: {
            fontSize: 16
        },
        id: "loginTitle",
        text: "登录您的时光帐户："
    });
    $.__views.container.add($.__views.loginTitle);
    $.__views.__alloyId29 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId29"
    });
    $.__views.container.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "邮箱",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
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
    $.__views.__alloyId29.add($.__views.emailInput);
    editNext ? $.__views.emailInput.addEventListener("return", editNext) : __defers["$.__views.emailInput!return!editNext"] = true;
    $.__views.__alloyId31 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId31"
    });
    $.__views.container.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "密码",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
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
        returnKeyType: Ti.UI.RETURNKEY_GO,
        passwordMask: true,
        keyboardType: Ti.UI.KEYBOARD_NUMBERS_PUNCTUATION,
        id: "passwordInput"
    });
    $.__views.__alloyId31.add($.__views.passwordInput);
    login ? $.__views.passwordInput.addEventListener("return", login) : __defers["$.__views.passwordInput!return!login"] = true;
    $.__views.registerTips = Ti.UI.createView({
        top: 8,
        layout: "horizontal",
        font: {
            fontSize: 16
        },
        id: "registerTips"
    });
    $.__views.container.add($.__views.registerTips);
    $.__views.registerLabel = Ti.UI.createLabel({
        left: 0,
        height: 30,
        font: {
            fontSize: 16
        },
        id: "registerLabel",
        text: "还没有注册？"
    });
    $.__views.registerTips.add($.__views.registerLabel);
    $.__views.registerButton = Ti.UI.createLabel({
        left: 10,
        height: 30,
        width: 140,
        font: {
            size: 14
        },
        textAlign: "center",
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#ccc",
        id: "registerButton",
        text: "创建一个时光帐户"
    });
    $.__views.registerTips.add($.__views.registerButton);
    showRegister ? $.__views.registerButton.addEventListener("click", showRegister) : __defers["$.__views.registerButton!click!showRegister"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    __defers["$.__views.loginButton!click!login"] && $.__views.loginButton.addEventListener("click", login);
    __defers["$.__views.emailInput!return!editNext"] && $.__views.emailInput.addEventListener("return", editNext);
    __defers["$.__views.passwordInput!return!login"] && $.__views.passwordInput.addEventListener("return", login);
    __defers["$.__views.registerButton!click!showRegister"] && $.__views.registerButton.addEventListener("click", showRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;