function Controller() {
    function fetchRandom() {
        var actInd = Alloy.createController("actInd").getView();
        $.random.add(actInd);
        util.send("api/fetchRandom", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password")
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                item = data.item;
                item.url != null && ($.image.image = item.url);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
            $.random.remove(actInd);
        });
    }
    function zoom() {
        $.scrollView.zoomScale <= 1 ? $.scrollView.setZoomScale(2, {
            animated: !0
        }) : $.scrollView.setZoomScale(1, {
            animated: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.random = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        id: "random"
    });
    $.addTopLevelView($.__views.random);
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        top: 0,
        backgroundImage: "top5.png",
        color: "#555",
        opacity: 0.9,
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "top",
        text: "随机"
    });
    $.__views.random.add($.__views.top);
    $.__views.scrollView = Ti.UI.createScrollView({
        width: 320,
        maxZoomScale: 1.5,
        id: "scrollView"
    });
    $.__views.random.add($.__views.scrollView);
    zoom ? $.__views.scrollView.addEventListener("doubletap", zoom) : __defers["$.__views.scrollView!doubletap!zoom"] = !0;
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        width: 320,
        id: "image"
    });
    $.__views.scrollView.add($.__views.image);
    $.__views.__alloyId49 = Alloy.createController("bottom", {
        id: "__alloyId49"
    });
    $.__views.__alloyId49.setParent($.__views.random);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.fetchRandom = fetchRandom;
    __defers["$.__views.scrollView!doubletap!zoom"] && $.__views.scrollView.addEventListener("doubletap", zoom);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;