function Controller() {
    function showOptions() {
        if ($.image.image == null) {
            $.dialog.show();
            $.pub.setLeftNavButton(null);
        }
    }
    function choose(e) {
        $.dialog.hide();
        switch (e.index) {
          case 0:
            takePhoto();
            break;
          case 1:
            openPhoto();
            break;
          case 2:
            Alloy.Globals.index.setActiveTab("tab1");
        }
    }
    function openPhoto() {
        $.image.image = "notNull";
        Ti.Media.openPhotoGallery({
            success: function(e) {
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {
                $.image.image = null;
                $.dialog.show();
            },
            error: function() {
                alert("error");
            }
        });
    }
    function takePhoto() {
        $.image.image = "notNull";
        Ti.Media.showCamera({
            success: function(e) {
                Ti.Media.hideCamera();
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {
                $.image.image = null;
                $.dialog.show();
            },
            error: function() {
                alert("error");
            },
            autohide: !1
        });
    }
    function showPhoto(imgs) {
        var cancelButton = Ti.UI.createButton({
            title: "取消"
        });
        $.pub.setLeftNavButton(cancelButton);
        cancelButton.addEventListener("click", clearPub);
        $.pub.remove($.imageContainer);
        $.image.image = imgs.middleImg.src;
        $.toolbar.visible = !0;
        $.commentInput.focus();
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
            Alloy.Globals.table.scrollToTop();
            util.fetchFeed();
        });
    }
    function clearPub() {
        $.pub.setLeftNavButton(null);
        $.pub.add($.imageContainer);
        $.image.image = null;
        $.commentInput.value = "";
        $.commentInput.blur();
        $.toolbar.visible = !1;
        Alloy.Globals.index.setActiveTab("tab1");
        $.pubButton.removeEventListener("click", pub);
    }
    function openZoomImage() {
        var image = Alloy.createController("zoomImage", $.image.image).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pub = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        title: "记录这一刻",
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    showOptions ? $.__views.pub.addEventListener("focus", showOptions) : __defers["$.__views.pub!focus!showOptions"] = !0;
    $.__views.pub.leftNavButton = undefined;
    $.__views.imageContainer = Ti.UI.createView({
        top: 20,
        width: 120,
        height: 120,
        borderColor: "#ccc",
        id: "imageContainer"
    });
    $.__views.pub.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        top: 0,
        width: 120,
        preventDefaultImage: !0,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.__alloyId16 = Ti.UI.createScrollView({
        id: "__alloyId16"
    });
    $.__views.pub.add($.__views.__alloyId16);
    var __alloyId18 = [];
    $.__views.commentInput = Ti.UI.createTextField({
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
        id: "commentInput"
    });
    __alloyId18.push($.__views.commentInput);
    $.__views.__alloyId19 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId18.push($.__views.__alloyId19);
    $.__views.pubButton = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
        id: "pubButton",
        title: "发布"
    });
    __alloyId18.push($.__views.pubButton);
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        bottom: 0,
        barColor: "#999",
        visible: !1,
        zIndex: 1,
        items: __alloyId18,
        id: "toolbar"
    });
    $.__views.__alloyId16.add($.__views.toolbar);
    var __alloyId21 = [];
    __alloyId21.push("照相");
    __alloyId21.push("从相册选取");
    __alloyId21.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId21,
        id: "dialog",
        cancel: "2",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.pub!focus!showOptions"] && $.__views.pub.addEventListener("focus", showOptions);
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;