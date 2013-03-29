function Controller() {
    function login() {
        user.set({
            email: $.usernameInput.value,
            password: $.passwordInput.value
        });
        util.send("api/login", {
            email: user.get("email"),
            password: user.get("password")
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                Ti.App.Properties.setString("id", data.id);
                Ti.App.Properties.setString("email", data.email);
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
    $.__views.loginButton = Ti.UI.createView({
        right: 10,
        top: 7,
        width: 51,
        height: 31,
        backgroundImage: "loginButton.png",
        id: "loginButton"
    });
    $.__views.top.add($.__views.loginButton);
    login ? $.__views.loginButton.addEventListener("click", login) : __defers["$.__views.loginButton!click!login"] = !0;
    $.__views.container = Ti.UI.createView({
        top: 64,
        bottom: 10,
        left: 10,
        right: 10,
        layout: "vertical",
        id: "container"
    });
    $.__views.login.add($.__views.container);
    $.__views.loginTitle = Ti.UI.createLabel({
        left: 0,
        id: "loginTitle",
        text: "请登录您的时光帐户："
    });
    $.__views.container.add($.__views.loginTitle);
    $.__views.__alloyId16 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId16"
    });
    $.__views.container.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "邮箱",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    $.__views.usernameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "usernameInput"
    });
    $.__views.__alloyId16.add($.__views.usernameInput);
    $.__views.__alloyId18 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId18"
    });
    $.__views.container.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "密码",
        id: "__alloyId19"
    });
    $.__views.__alloyId18.add($.__views.__alloyId19);
    $.__views.passwordInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        passwordMask: !0,
        id: "passwordInput"
    });
    $.__views.__alloyId18.add($.__views.passwordInput);
    $.__views.registerTips = Ti.UI.createView({
        top: 10,
        layout: "horizontal",
        id: "registerTips"
    });
    $.__views.container.add($.__views.registerTips);
    $.__views.registerLabel = Ti.UI.createLabel({
        left: 0,
        height: 30,
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
    $.__views.registerInputOne = Ti.UI.createView({
        visible: !1,
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "registerInputOne"
    });
    $.__views.container.add($.__views.registerInputOne);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "昵称",
        id: "__alloyId20"
    });
    $.__views.registerInputOne.add($.__views.__alloyId20);
    $.__views.nicknameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "nicknameInput"
    });
    $.__views.registerInputOne.add($.__views.nicknameInput);
    $.__views.registerInputTwo = Ti.UI.createView({
        visible: !1,
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "registerInputTwo"
    });
    $.__views.container.add($.__views.registerInputTwo);
    $.__views.__alloyId21 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "头像",
        id: "__alloyId21"
    });
    $.__views.registerInputTwo.add($.__views.__alloyId21);
    $.__views.avatarInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "avatarInput"
    });
    $.__views.registerInputTwo.add($.__views.avatarInput);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    __defers["$.__views.loginButton!click!login"] && $.__views.loginButton.addEventListener("click", login);
    __defers["$.__views.registerButton!click!showRegister"] && $.__views.registerButton.addEventListener("click", showRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;