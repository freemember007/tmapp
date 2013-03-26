function Controller() {
    function formatDate() {
        var date = new Date, datestr = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
        date.getHours() >= 12 ? datestr += " " + (date.getHours() == 12 ? date.getHours() : date.getHours() - 12) + ":" + date.getMinutes() + " 下午" : datestr += " " + date.getHours() + ":" + date.getMinutes() + " 上午";
        return datestr;
    }
    function beginReloading() {
        fetch();
        setTimeout(endReloading, 2000);
    }
    function endReloading() {
        table.setContentInsets({
            top: 0
        }, {
            animated: !0
        });
        reloading = !1;
        $.lastUpdatedLabel.text = "上次更新: " + formatDate();
        $.statusLabel.text = "下拉刷新...";
        $.actInd.hide();
        $.arrow.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pullView = Ti.UI.createView({
        backgroundColor: "#f4f4f4",
        width: 320,
        height: 60,
        id: "pullView"
    });
    $.addTopLevelView($.__views.pullView);
    $.__views.border1 = Ti.UI.createView({
        backgroundColor: "#eee",
        height: 1,
        bottom: 1,
        id: "border1"
    });
    $.__views.pullView.add($.__views.border1);
    $.__views.border2 = Ti.UI.createView({
        backgroundColor: "#eee",
        height: 1,
        bottom: 0,
        id: "border2"
    });
    $.__views.pullView.add($.__views.border2);
    $.__views.arrow = Ti.UI.createView({
        backgroundImage: "whiteArrow.png",
        width: 23,
        height: 60,
        bottom: 10,
        left: 20,
        id: "arrow"
    });
    $.__views.pullView.add($.__views.arrow);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        left: 20,
        bottom: 13,
        width: 30,
        height: 30,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "actInd"
    });
    $.__views.pullView.add($.__views.actInd);
    $.__views.statusLabel = Ti.UI.createLabel({
        text: "下拉刷新",
        left: 55,
        width: 200,
        bottom: 30,
        height: "auto",
        color: "#333",
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
    $.__views.pullView.add($.__views.statusLabel);
    $.__views.lastUpdatedLabel = Ti.UI.createLabel({
        text: "上次更新: 尚未更新过",
        left: 55,
        width: 200,
        bottom: 15,
        height: "auto",
        color: "#333",
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
    $.__views.pullView.add($.__views.lastUpdatedLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, table = args.table, fetch = args.fetch, pulling = !1, reloading = !1;
    table.addEventListener("scroll", function(e) {
        var offset = e.contentOffset.y;
        if (offset < -65 && !pulling && !reloading) {
            var t = Ti.UI.create2DMatrix();
            t = t.rotate(-180);
            pulling = !0;
            $.arrow.animate({
                transform: t,
                duration: 180
            });
            $.statusLabel.text = "释放刷新...";
        } else if (offset > -65 && offset < 0 && pulling && !reloading) {
            pulling = !1;
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
            reloading = !0;
            pulling = !1;
            $.arrow.hide();
            $.actInd.show();
            $.statusLabel.text = "加载中...";
            table.setContentInsets({
                top: 60
            }, {
                animated: !0
            });
            table.scrollToTop(-60, !0);
            $.arrow.transform = Ti.UI.create2DMatrix();
            beginReloading();
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;