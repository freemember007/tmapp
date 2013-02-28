function Controller() {
    function fetchFeed() {
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
    fetchFeed ? $.__views.mainlist.addEventListener("open", fetchFeed) : __defers["$.__views.mainlist!open!fetchFeed"] = !0;
    $.__views.table = Ti.UI.createTableView({
        style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
        backgroundColor: "#ddd",
        id: "table"
    });
    $.__views.mainlist.add($.__views.table);
    var __alloyId24 = function(e) {
        var models = Alloy.Collections.feed.models, len = models.length, rows = [];
        for (var i = 0; i < len; i++) {
            var __alloyId18 = models[i];
            __alloyId18.__transform = {};
            var __alloyId19 = Ti.UI.createTableViewSection({
                id: "date",
                headerTitle: typeof __alloyId18.__transform.date != "undefined" ? __alloyId18.__transform.date : __alloyId18.get("date")
            });
            rows.push(__alloyId19);
            var __alloyId20 = Ti.UI.createTableViewRow({
                backgroundColor: "#fff",
                selectedBackgroundColor: "#fff",
                bottom: 5,
                id: "row"
            });
            __alloyId19.add(__alloyId20);
            var __alloyId21 = Ti.UI.createView({
                layout: "vertical",
                width: "95%",
                id: "rowContainer"
            });
            __alloyId20.add(__alloyId21);
            var __alloyId22 = Ti.UI.createImageView({
                top: 8,
                preventDefaultImage: !0,
                id: "image",
                image: typeof __alloyId18.__transform.image != "undefined" ? __alloyId18.__transform.image : __alloyId18.get("image")
            });
            __alloyId21.add(__alloyId22);
            var __alloyId23 = Ti.UI.createLabel({
                font: {
                    fontSize: 16
                },
                top: 5,
                left: 0,
                id: "content",
                text: typeof __alloyId18.__transform.content != "undefined" ? __alloyId18.__transform.content : __alloyId18.get("content")
            });
            __alloyId21.add(__alloyId23);
        }
        $.__views.table.setData(rows);
    };
    Alloy.Collections.feed.on("fetch destroy change add remove reset", __alloyId24);
    exports.destroy = function() {
        Alloy.Collections.feed.off("fetch destroy change add remove reset", __alloyId24);
    };
    _.extend($, $.__views);
    var user = Alloy.createModel("user", {
        email: "freemem@163.com",
        password: "666666"
    }), feeds = Alloy.Collections.feed;
    $.mainlist.addEventListener("close", function() {
        $.destroy();
    });
    __defers["$.__views.mainlist!open!fetchFeed"] && $.__views.mainlist.addEventListener("open", fetchFeed);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;