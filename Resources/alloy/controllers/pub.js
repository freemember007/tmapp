function Controller() {
    function uploadCameraPhoto() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                alert(e.media);
                $.image.image = e.media;
            },
            error: function() {
                alert("error");
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pub = Ti.UI.createWindow({
        title: "记录这一刻",
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    uploadCameraPhoto ? $.__views.pub.addEventListener("open", uploadCameraPhoto) : __defers["$.__views.pub!open!uploadCameraPhoto"] = !0;
    $.__views.image = Ti.UI.createImageView({
        top: 0,
        height: "100",
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    $.__views.__alloyId20 = Ti.UI.createTextField({
        width: "280",
        hight: "50",
        id: "__alloyId20"
    });
    $.__views.pub.add($.__views.__alloyId20);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.pub!open!uploadCameraPhoto"] && $.__views.pub.addEventListener("open", uploadCameraPhoto);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;