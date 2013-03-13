function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.scrollImage = Ti.UI.createWindow({
        backgroundColor: "black",
        barColor: "transparent",
        tabBarHidden: !0,
        id: "scrollImage"
    });
    $.addTopLevelView($.__views.scrollImage);
    var __alloyId30 = [];
    $.__views.scrollableView = Ti.UI.createScrollableView({
        views: __alloyId30,
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
            maxZoomScale: 1.5
        }), image = Ti.UI.createImageView({
            width: 318,
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
    $.scrollImage.title = "某时";
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;