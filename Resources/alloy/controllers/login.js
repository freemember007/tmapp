function Controller() {
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
            if (data.type == "success") {
                Ti.App.Properties.setString("id", data.id);
                Ti.App.Properties.setString("email", $.emailInput.value);
                Ti.App.Properties.setString("password", $.passwordInput.value);
                Ti.App.Properties.setString("avatar", data.avatar);
                Alloy.Globals.avatar.image = Alloy.Globals.sitePath + data.avatar;
                Alloy.Globals.tabGroup.open({
                    transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
                });
                Alloy.Globals.menu.open();
                $.login.close();
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    function showRegister() {
        var register = Alloy.createController("register").getView();
        register.open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.login = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        tabBarHidden: !0,
        id: "login"
    });
    $.addTopLevelView($.__views.login);
    $.__views.top = Ti.UI.createView({
        width: "100%",
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
    login ? $.__views.loginButton.addEventListener("click", login) : __defers["$.__views.loginButton!click!login"] = !0;
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
    $.__views.__alloyId22 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId22"
    });
    $.__views.container.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "邮箱",
        id: "__alloyId23"
    });
    $.__views.__alloyId22.add($.__views.__alloyId23);
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
    $.__views.__alloyId22.add($.__views.emailInput);
    $.__views.__alloyId24 = Ti.UI.createView({
        top: 8,
        height: 34,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId24"
    });
    $.__views.container.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createLabel({
        left: 10,
        height: 34,
        font: {
            fontSize: 16
        },
        text: "密码",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
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
    $.__views.__alloyId24.add($.__views.passwordInput);
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
    showRegister ? $.__views.registerButton.addEventListener("click", showRegister) : __defers["$.__views.registerButton!click!showRegister"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    __defers["$.__views.loginButton!click!login"] && $.__views.loginButton.addEventListener("click", login);
    __defers["$.__views.registerButton!click!showRegister"] && $.__views.registerButton.addEventListener("click", showRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;