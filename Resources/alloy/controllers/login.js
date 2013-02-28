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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.login = Ti.UI.createTabGroup({
        id: "login"
    });
    $.__views.__alloyId8 = Ti.UI.createWindow({
        backgroundColor: "#f4f4f4",
        barColor: "darkgray",
        tabBarHidden: !0,
        title: "时光笔记",
        id: "__alloyId8"
    });
    $.__views.__alloyId10 = Ti.UI.createButton({
        title: "登录",
        id: "__alloyId10"
    });
    login ? $.__views.__alloyId10.addEventListener("click", login) : __defers["$.__views.__alloyId10!click!login"] = !0;
    $.__views.__alloyId8.rightNavButton = $.__views.__alloyId10;
    $.__views.__alloyId11 = Ti.UI.createView({
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
        layout: "vertical",
        id: "__alloyId11"
    });
    $.__views.__alloyId8.add($.__views.__alloyId11);
    $.__views.loginTitle = Ti.UI.createLabel({
        left: 0,
        id: "loginTitle",
        text: "请登录您的时光帐户："
    });
    $.__views.__alloyId11.add($.__views.loginTitle);
    $.__views.__alloyId12 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId12"
    });
    $.__views.__alloyId11.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "邮箱",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.usernameInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        id: "usernameInput"
    });
    $.__views.__alloyId12.add($.__views.usernameInput);
    $.__views.__alloyId14 = Ti.UI.createView({
        top: 10,
        height: 40,
        backgroundColor: "white",
        borderColor: "#ccc",
        borderRadius: 2,
        layout: "horizontal",
        id: "__alloyId14"
    });
    $.__views.__alloyId11.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createLabel({
        left: 10,
        height: 40,
        text: "密码",
        id: "__alloyId15"
    });
    $.__views.__alloyId14.add($.__views.__alloyId15);
    $.__views.passwordInput = Ti.UI.createTextField({
        left: 10,
        right: 10,
        height: 40,
        color: "#666",
        passwordMask: !0,
        id: "passwordInput"
    });
    $.__views.__alloyId14.add($.__views.passwordInput);
    $.__views.registerContainer = Ti.UI.createView({
        top: 10,
        layout: "horizontal",
        id: "registerContainer"
    });
    $.__views.__alloyId11.add($.__views.registerContainer);
    $.__views.registerLabel = Ti.UI.createLabel({
        left: 0,
        height: 30,
        id: "registerLabel",
        text: "还没有注册？"
    });
    $.__views.registerContainer.add($.__views.registerLabel);
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
    $.__views.registerContainer.add($.__views.registerButton);
    login ? $.__views.registerButton.addEventListener("click", login) : __defers["$.__views.registerButton!click!login"] = !0;
    $.__views.__alloyId7 = Ti.UI.createTab({
        window: $.__views.__alloyId8,
        id: "__alloyId7"
    });
    $.__views.login.addTab($.__views.__alloyId7);
    $.addTopLevelView($.__views.login);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user");
    __defers["$.__views.__alloyId10!click!login"] && $.__views.__alloyId10.addEventListener("click", login);
    __defers["$.__views.registerButton!click!login"] && $.__views.registerButton.addEventListener("click", login);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;