function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("feed");
    $.__views.mainlist = Ti.UI.createWindow({
        title: "今天",
        id: "mainlist"
    });
    $.addTopLevelView($.__views.mainlist);
    $.__views.__alloyId7 = Ti.UI.createTableView({
        id: "__alloyId7"
    });
    $.__views.mainlist.add($.__views.__alloyId7);
    var __alloyId17 = function(e) {
        var models = Alloy.Collections.feed.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId9 = models[i];
            __alloyId9.__transform = {};
            var __alloyId10 = Ti.UI.createTableViewSection({
                headerTitle: typeof __alloyId9.__transform.date != "undefined" ? __alloyId9.__transform.date : __alloyId9.get("date"),
                id: "__alloyId8"
            });
            rows.push(__alloyId10);
            var __alloyId12 = Ti.UI.createTableViewRow({
                id: "__alloyId11"
            });
            __alloyId10.add(__alloyId12);
            var __alloyId14 = Ti.UI.createImageView({
                image: typeof __alloyId9.__transform.image != "undefined" ? __alloyId9.__transform.image : __alloyId9.get("image"),
                id: "__alloyId13"
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createLabel({
                text: typeof __alloyId9.__transform.content != "undefined" ? __alloyId9.__transform.content : __alloyId9.get("content"),
                id: "__alloyId15"
            });
            __alloyId12.add(__alloyId16);
        }
        $.__views.__alloyId7.setData(rows);
    };
    Alloy.Collections.feed.on("fetch destroy change add remove reset", __alloyId17);
    exports.destroy = function() {
        Alloy.Collections.feed.off("fetch destroy change add remove reset", __alloyId17);
    };
    _.extend($, $.__views);
    var user = Alloy.createModel("user", {
        email: "freemem@163.com",
        password: "666666"
    }), feeds = Alloy.Collections.feed;
    util.send("api/login", {
        email: user.get("email"),
        password: user.get("password")
    }, function(res) {
        var data = JSON.parse(res);
        if (data.type == "success") {
            items = data.items;
            for (var i = 0; i < items.length; i++) {
                var feed = Alloy.createModel("feed", {
                    content: items[i].content,
                    date: items[i].date,
                    image: items[i].image
                });
                feeds.add(feed);
            }
        } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
    });
    user.save();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;