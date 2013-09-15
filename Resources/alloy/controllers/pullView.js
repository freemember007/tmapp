function Controller() {
    function formatDate() {
        var date = new Date();
        var datestr = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        datestr += date.getHours() >= 12 ? " " + (12 == date.getHours() ? date.getHours() : date.getHours() - 12) + ":" + date.getMinutes() + " 下午" : " " + date.getHours() + ":" + date.getMinutes() + " 上午";
        return datestr;
    }
    function beginReloading() {
        fetch();
        setTimeout(endReloading, 2e3);
    }
    function endReloading() {
        table.setContentInsets({
            top: 0
        }, {
            animated: true
        });
        reloading = false;
        $.lastUpdatedLabel.text = "上次更新: " + formatDate();
        $.statusLabel.text = "下拉刷新...";
        $.actInd.hide();
        $.arrow.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "pullView";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.pullView = Ti.UI.createView({
        backgroundColor: "#ddd",
        width: Ti.Platform.displayCaps.platformWidth,
        height: 60,
        id: "pullView"
    });
    $.__views.pullView && $.addTopLevelView($.__views.pullView);
    $.__views.border1 = Ti.UI.createView({
        backgroundColor: "#ccc",
        height: 1,
        bottom: 1,
        id: "border1"
    });
    $.__views.pullView.add($.__views.border1);
    $.__views.border2 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: 1,
        bottom: 0,
        id: "border2"
    });
    $.__views.pullView.add($.__views.border2);
    $.__views.container = Ti.UI.createView({
        width: 240,
        id: "container"
    });
    $.__views.pullView.add($.__views.container);
    $.__views.arrow = Ti.UI.createView({
        backgroundImage: "whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 0,
        id: "arrow"
    });
    $.__views.container.add($.__views.arrow);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        left: 0,
        bottom: 13,
        width: 30,
        height: 30,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "actInd"
    });
    $.__views.container.add($.__views.actInd);
    $.__views.statusLabel = Ti.UI.createLabel({
        text: "下拉刷新",
        left: 25,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#666",
        textAlign: "center",
        font: {
            fontSize: 13,
            fontWeight: "bold"
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "statusLabel"
    });
    $.__views.container.add($.__views.statusLabel);
    $.__views.lastUpdatedLabel = Ti.UI.createLabel({
        text: "上次更新: 尚未更新过",
        left: 25,
        width: 200,
        bottom: 15,
        height: "auto",
        color: "#666",
        textAlign: "center",
        font: {
            fontSize: 12
        },
        shadowColor: "#999",
        shadowOffset: {
            x: 0,
            y: 1
        },
        id: "lastUpdatedLabel"
    });
    $.__views.container.add($.__views.lastUpdatedLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var table = args.table;
    var fetch = args.fetch;
    var pulling = false;
    var reloading = false;
    table.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        if (-65 > offset && !pulling && !reloading) {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = true;
            $.arrow.animate({
                transform: t,
                duration: 180
            });
            $.statusLabel.text = "释放刷新...";
        } else if (offset > -65 && 0 > offset && pulling && !reloading) {
            pulling = false;
            var t = Ti.UI.create2DMatrix();
            $.arrow.animate({
                transform: t,
                duration: 180
            });
            $.statusLabel.text = "下拉刷新...";
        }
    });
    table.addEventListener("dragEnd", function() {
        if (pulling && !reloading) {
            reloading = true;
            pulling = false;
            $.arrow.hide();
            $.actInd.show();
            $.statusLabel.text = "加载中...";
            table.setContentInsets({
                top: 60
            }, {
                animated: true
            });
            table.scrollToTop(-60, true);
            $.arrow.transform = Ti.UI.create2DMatrix();
            beginReloading();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;