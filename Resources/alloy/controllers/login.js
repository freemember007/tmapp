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
                $.login.close();
                var index = Alloy.createController("index").getView();
                index.open();
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
    $.__views.login = Ti.UI.createTabGroup({
        id: "login"
    });
    $.__views.__alloyId19 = Ti.UI.createWindow({
        backgroundColor: "#f4f4f4",
        barColor: "darkgray",
        tabBarHidden: !0,
        title: "时光笔记",
        id: "__alloyId19"
    });
    $.__views.submitButton = Ti.UI.createButton({
        id: "submitButton",
        title: "登录"
    });
    login ? $.__views.submitButton.addEventListener("click", login) : __defers["$.__views.submitButton!click!login"] = !0;
    $.__views.__alloyId19.rightNavButton = $.__views.submitButton;
    $.__views.container = Ti.UI.createView({
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
        layout: "vertical",
        id: "container"
    });
    $.__views.__alloyId19.add($.__views.container);
    $.__views.loginTitle = Ti.UI.createLabel({
        left: 0,
        id: "loginTitle",
        text: "请登录您的时光帐户："
    });
    $.__views.container.add($.__views.loginTitle);
    $.__views.__alloyId21 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId21"
    });
    $.__views.container.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "邮箱",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.usernameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "usernameInput"
    });
    $.__views.__alloyId21.add($.__views.usernameInput);
    $.__views.__alloyId23 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId23"
    });
    $.__views.container.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "密码",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    $.__views.passwordInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        passwordMask: !0,
        id: "passwordInput"
    });
    $.__views.__alloyId23.add($.__views.passwordInput);
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
    $.__views.__alloyId25 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "昵称",
        id: "__alloyId25"
    });
    $.__views.registerInputOne.add($.__views.__alloyId25);
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
    $.__views.__alloyId26 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "头像",
        id: "__alloyId26"
    });
    $.__views.registerInputTwo.add($.__views.__alloyId26);
    $.__views.avatarInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "avatarInput"
    });
    $.__views.registerInputTwo.add($.__views.avatarInput);
    $.__views.__alloyId18 = Ti.UI.createTab({
        window: $.__views.__alloyId19,
        id: "__alloyId18"
    });
    $.__views.login.addTab($.__views.__alloyId18);
    $.addTopLevelView($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    __defers["$.__views.submitButton!click!login"] && $.__views.submitButton.addEventListener("click", login);
    __defers["$.__views.registerButton!click!showRegister"] && $.__views.registerButton.addEventListener("click", showRegister);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;