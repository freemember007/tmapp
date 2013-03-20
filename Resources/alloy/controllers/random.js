function Controller() {
    function fetchRandom() {
        var actInd = Alloy.createController("actInd").getView();
        $.random.add(actInd);
        util.send("api/fetchRandom", {
            email: "freemem@163.com",
            password: "666666"
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                items = data.items;
                data = [];
                for (i = 0; i < items.length; i++) if (items[i].url != null) {
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
            $.random.remove(actInd);
            $.scrollableView.scrollToView(0);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.random = Ti.UI.createWindow({
        backgroundColor: "black",
        barImage: "navBar.png",
        id: "random"
    });
    $.addTopLevelView($.__views.random);
    fetchRandom ? $.__views.random.addEventListener("focus", fetchRandom) : __defers["$.__views.random!focus!fetchRandom"] = !0;
    $.__views.__alloyId35 = Ti.UI.createLabel({
        font: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        },
        color: "#fff",
        shadowOffset: {
            x: 1,
            y: -1
        },
        text: "随机",
        id: "__alloyId35"
    });
    $.__views.random.titleControl = $.__views.__alloyId35;
    var __alloyId36 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId36,
        id: "scrollableView"
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
    __defers["$.__views.random!focus!fetchRandom"] && $.__views.random.addEventListener("focus", fetchRandom);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;