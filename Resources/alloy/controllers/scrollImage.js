function Controller() {
    function back() {
        $.scrollImage.close({
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.scrollImage = Ti.UI.createWindow({
        backgroundColor: "#000",
        navBarHidden: true,
        borderRadius: 3,
        id: "scrollImage"
    });
    $.__views.scrollImage && $.addTopLevelView($.__views.scrollImage);
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        backgroundImage: "topBlankBlack.png",
        color: "#fff",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        opacity: .7,
        zIndex: 1,
        id: "top"
    });
    $.__views.scrollImage.add($.__views.top);
    $.__views.backButton = Ti.UI.createLabel({
        left: 10,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "backBlankBlack.png",
        color: "#fff",
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        opacity: 1,
        zIndex: 2,
        id: "backButton"
    });
    $.__views.scrollImage.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = true;
    var __alloyId58 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView(function() {
        var o = {};
        _.extend(o, {
            width: 330,
            showPagingControl: true
        });
        Alloy.isTablet && _.extend(o, {
            width: Ti.Platform.displayCaps.platformWidth
        });
        _.extend(o, {
            views: __alloyId58,
            id: "scrollableView"
        });
        return o;
    }());
    $.__views.scrollImage.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    var index = args.index;
    var items = args.items;
    var data = [];
    for (var i = 0; items.length > i; i++) {
        var view = Ti.UI.createScrollView({
            maxZoomScale: 2,
            created_at: items[i].created_at
        });
        var image = Ti.UI.createImageView({
            width: Ti.Platform.displayCaps.platformWidth,
            image: items[i].url,
            preventDefaultImage: true
        });
        view.add(image);
        data.push(view);
    }
    $.scrollableView.setViews(data);
    $.scrollableView.scrollToView(index);
    $.scrollableView.addEventListener("dblclick", function() {
        var view = $.scrollableView.views[$.scrollableView.currentPage];
        1 >= view.zoomScale ? view.setZoomScale(2, {
            animated: true
        }) : view.setZoomScale(1, {
            animated: true
        });
    });
    $.scrollableView.addEventListener("scrollEnd", function(e) {
        if (null != e.view) {
            var hour = e.view.created_at.match(/[0-9]+:[0-9]+/)[0];
            $.top.text = util.formatTime(parseInt(hour)) + " " + hour;
        }
    });
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;