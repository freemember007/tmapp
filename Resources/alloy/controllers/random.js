function Controller() {
    function fetchRandom() {
        util.send("api/fetchRandom", {
            email: "freemem@163.com",
            password: "666666"
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                items = data.items;
                data = [];
                for (i = 0; i < items.length; i++) {
                    var view = Ti.UI.createScrollView({
                        maxZoomScale: 1.5
                    }), image = Ti.UI.createImageView({
                        width: 318,
                        image: items[i].url
                    });
                    view.add(image);
                    data.push(view);
                }
                $.scrollableView.setViews(data);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.random = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "transparent",
        title: "某时",
        id: "random"
    });
    $.addTopLevelView($.__views.random);
    fetchRandom ? $.__views.random.addEventListener("open", fetchRandom) : __defers["$.__views.random!open!fetchRandom"] = !0;
    var __alloyId30 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId30,
        id: "scrollableView",
        showPagingControl: "true"
    });
    $.__views.random.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.scrollableView.addEventListener("doubletap", function(e) {
        var view = $.scrollableView.views[$.scrollableView.currentPage];
        view.zoomScale <= 1 ? view.setZoomScale(2, {
            animated: !0
        }) : view.setZoomScale(1, {
            animated: !0
        });
    });
    $.random.title = "某时";
    __defers["$.__views.random!open!fetchRandom"] && $.__views.random.addEventListener("open", fetchRandom);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;