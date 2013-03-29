function Controller() {
    function closeWin() {
        $.zoomImage.close();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.zoomImage = Ti.UI.createWindow({
        backgroundColor: "black",
        fullscreen: !0,
        id: "zoomImage"
    });
    $.addTopLevelView($.__views.zoomImage);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        width: 320,
        id: "image"
    });
    $.__views.zoomImage.add($.__views.image);
    closeWin ? $.__views.image.addEventListener("click", closeWin) : __defers["$.__views.image!click!closeWin"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.image.image = args;
    $.zoomImage.open();
    __defers["$.__views.image!click!closeWin"] && $.__views.image.addEventListener("click", closeWin);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;