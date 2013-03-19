function Controller() {
    function showPhoto(imgs) {
        $.pub.remove($.imageContainer);
        $.image.image = imgs.middleImg.src;
        $.commentInput.focus();
        $.cancelButton.addEventListener("click", clearPub);
        $.pubButton.addEventListener("click", pub);
    }
    function pub() {
        $.commentInput.blur();
        util.send("api/uploadPhoto", {
            photo: $.image.image,
            content: $.commentInput.value,
            id: "1"
        }, function(res) {
            var data = JSON.parse(res);
            item = data.item;
            clearPub();
            Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
            Alloy.Globals.tableBlog.scrollToTop();
            Alloy.Globals.fetchBlog();
        });
    }
    function clearPub() {
        $.pub.add($.imageContainer);
        $.image.image = "null";
        $.commentInput.value = "";
        $.cancelButton.removeEventListener("click", clearPub);
        $.pubButton.removeEventListener("click", pub);
        $.pub.close();
    }
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pub = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        barColor: "white",
        title: "记录这一刻",
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    $.__views.cancelButton = Ti.UI.createButton({
        id: "cancelButton",
        title: "取消"
    });
    $.__views.pub.leftNavButton = $.__views.cancelButton;
    $.__views.imageContainer = Ti.UI.createView({
        top: 20,
        width: 120,
        height: 120,
        borderColor: "#999",
        id: "imageContainer"
    });
    $.__views.pub.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 0,
        width: 120,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.__alloyId30 = Ti.UI.createScrollView({
        id: "__alloyId30"
    });
    $.__views.pub.add($.__views.__alloyId30);
    var __alloyId32 = [];
    $.__views.commentInput = Ti.UI.createTextField({
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        zIndex: 1,
        id: "commentInput"
    });
    __alloyId32.push($.__views.commentInput);
    $.__views.__alloyId33 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId32.push($.__views.__alloyId33);
    $.__views.pubButton = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
        id: "pubButton",
        title: "发布"
    });
    __alloyId32.push($.__views.pubButton);
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        bottom: 0,
        barColor: "#999",
        items: __alloyId32,
        id: "toolbar"
    });
    $.__views.__alloyId30.add($.__views.toolbar);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.showPhoto = showPhoto;
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;