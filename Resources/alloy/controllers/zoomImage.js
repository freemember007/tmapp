function Controller() {
    function closeWin() {
        $.zoomImage.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "zoomImage";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.zoomImage = Ti.UI.createWindow({
        backgroundColor: "black",
        navBarHidden: true,
        borderRadius: 3,
        fullscreen: true,
        id: "zoomImage"
    });
    $.__views.zoomImage && $.addTopLevelView($.__views.zoomImage);
    $.__views.scrollView = Ti.UI.createScrollView({
        maxZoomScale: 2,
        id: "scrollView"
    });
    $.__views.zoomImage.add($.__views.scrollView);
    closeWin ? $.__views.scrollView.addEventListener("click", closeWin) : __defers["$.__views.scrollView!click!closeWin"] = true;
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: true,
        width: Ti.Platform.displayCaps.platformWidth,
        id: "image"
    });
    $.__views.scrollView.add($.__views.image);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args;
    $.zoomImage.open();
    __defers["$.__views.scrollView!click!closeWin"] && $.__views.scrollView.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;