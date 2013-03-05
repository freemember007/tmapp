function Controller() {
    function fetchFeed() {
        util.send("api/login", {
            email: user.get("email"),
            password: user.get("password")
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    }, section = Alloy.createController("_section", arg).getView();
                    tabledata.push(section);
                }
                $.table.setData(tabledata);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.mainlist = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        title: "今年",
        id: "mainlist"
    });
    $.addTopLevelView($.__views.mainlist);
    fetchFeed ? $.__views.mainlist.addEventListener("open", fetchFeed) : __defers["$.__views.mainlist!open!fetchFeed"] = !0;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.mainlist.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var user = Alloy.createModel("user", {
        email: "freemem@163.com",
        password: "666666"
    });
    __defers["$.__views.mainlist!open!fetchFeed"] && $.__views.mainlist.addEventListener("open", fetchFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;