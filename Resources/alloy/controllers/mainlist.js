function Controller() {
    function a() {
        var feed = Alloy.createModel("feed", {
            content: "测试",
            date: "2013/02/25",
            image: "http://www.baidu.com/img/shouye_b5486898c692066bd2cbaeda86d74448.gif"
        });
        feeds.add(feed, {
            at: 0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    Alloy.Collections.instance("feed");
    $.__views.mainlist = Ti.UI.createWindow({
        title: "今天",
        id: "mainlist"
    });
    $.addTopLevelView($.__views.mainlist);
    a ? $.__views.mainlist.addEventListener("click", a) : __defers["$.__views.mainlist!click!a"] = !0;
    $.__views.__alloyId9 = Ti.UI.createTableView({
        id: "__alloyId9"
    });
    $.__views.mainlist.add($.__views.__alloyId9);
    var __alloyId19 = function(e) {
        var models = Alloy.Collections.feed.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId11 = models[i];
            __alloyId11.__transform = {};
            var __alloyId12 = Ti.UI.createTableViewSection({
                headerTitle: typeof __alloyId11.__transform.date != "undefined" ? __alloyId11.__transform.date : __alloyId11.get("date"),
                id: "__alloyId10"
            });
            rows.push(__alloyId12);
            var __alloyId14 = Ti.UI.createTableViewRow({
                id: "__alloyId13"
            });
            __alloyId12.add(__alloyId14);
            var __alloyId16 = Ti.UI.createImageView({
                image: typeof __alloyId11.__transform.image != "undefined" ? __alloyId11.__transform.image : __alloyId11.get("image"),
                id: "__alloyId15"
            });
            __alloyId14.add(__alloyId16);
            var __alloyId18 = Ti.UI.createLabel({
                text: typeof __alloyId11.__transform.content != "undefined" ? __alloyId11.__transform.content : __alloyId11.get("content"),
                id: "__alloyId17"
            });
            __alloyId14.add(__alloyId18);
        }
        $.__views.__alloyId9.setData(rows);
    };
    Alloy.Collections.feed.on("fetch destroy change add remove reset", __alloyId19);
    exports.destroy = function() {
        Alloy.Collections.feed.off("fetch destroy change add remove reset", __alloyId19);
    };
    _.extend($, $.__views);
    var util = require("util"), user = Alloy.createModel("user", {
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
    __defers["$.__views.mainlist!click!a"] && $.__views.mainlist.addEventListener("click", a);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;