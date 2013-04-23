function Controller() {
    function back() {
        $.scrollImage.close({
            animated: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.scrollImage = Ti.UI.createWindow({
        backgroundColor: "#000",
        id: "scrollImage"
    });
    $.addTopLevelView($.__views.scrollImage);
    $.__views.top = Ti.UI.createLabel({
        width: "100%",
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
        color: "#555",
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
        opacity: 0.9,
        zIndex: 1,
        id: "top"
    });
    $.__views.scrollImage.add($.__views.top);
    $.__views.backButton = Ti.UI.createLabel({
        left: 10,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "backBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        opacity: 0.9,
        zIndex: 2,
        id: "backButton"
    });
    $.__views.scrollImage.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = !0;
    var __alloyId63 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        width: 330,
        views: __alloyId63,
        id: "scrollableView",
        showPagingControl: "true"
    });
    $.__views.scrollImage.add($.__views.scrollableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, index = args.index, items = args.items;
    data = [];
    for (i = 0; i < items.length; i++) {
        var view = Ti.UI.createScrollView({
            maxZoomScale: 1.5,
            created_at: items[i].created_at
        }), image = Ti.UI.createImageView({
            width: 320,
            image: items[i].url
        });
        view.add(image);
        data.push(view);
    }
    $.scrollableView.setViews(data);
    $.scrollableView.scrollToView(index);
    $.scrollableView.addEventListener("doubletap", function(e) {
        var view = $.scrollableView.views[$.scrollableView.currentPage];
        view.zoomScale <= 1 ? view.setZoomScale(2, {
            animated: !0
        }) : view.setZoomScale(1, {
            animated: !0
        });
    });
    $.scrollableView.addEventListener("scrollEnd", function(e) {
        var hour = e.view.created_at.match(/[0-9]+:[0-9]+/)[0];
        $.top.text = util.formatTime(parseInt(hour)) + " " + hour;
    });
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;