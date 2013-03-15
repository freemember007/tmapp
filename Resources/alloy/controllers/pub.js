function Controller() {
    function donotOpen(e) {
        Alloy.Globals.index.setActiveTab(e.previousTab);
        $.dialog.show();
        previousTab = e.previousTab;
    }
    function choose(e) {
        switch (e.index) {
          case 0:
            takePhoto();
            break;
          case 1:
            openPhoto();
        }
    }
    function openPhoto() {
        Ti.Media.openPhotoGallery({
            success: function(e) {
                $.window.show();
                $.window.showNavBar();
                $.tab3.removeEventListener("focus", donotOpen);
                Alloy.Globals.index.setActiveTab($.tab3);
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            }
        });
    }
    function takePhoto() {
        Ti.Media.showCamera({
            success: function(e) {
                $.window.show();
                $.window.showNavBar();
                $.tab3.removeEventListener("focus", donotOpen);
                Alloy.Globals.index.setActiveTab($.tab3);
                Ti.Media.hideCamera();
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            autohide: !1
        });
    }
    function showPhoto(imgs) {
        $.window.remove($.imageContainer);
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
            Alloy.Globals.index.setActiveTab(Alloy.Globals.tab1);
            Alloy.Globals.tableBlog.scrollToTop();
            Alloy.Globals.fetchBlog();
        });
    }
    function clearPub() {
        $.window.add($.imageContainer);
        $.image.image = "null";
        $.commentInput.value = "";
        $.cancelButton.removeEventListener("click", clearPub);
        $.pubButton.removeEventListener("click", pub);
        Alloy.Globals.index.setActiveTab(previousTab);
        $.tab3.addEventListener("focus", donotOpen);
        $.window.hide();
        $.window.hideNavBar();
    }
    function openZoomImage() {
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.window = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        id: "window",
        title: "记录这一刻"
    });
    $.__views.cancelButton = Ti.UI.createButton({
        id: "cancelButton",
        title: "取消"
    });
    $.__views.window.leftNavButton = $.__views.cancelButton;
    $.__views.imageContainer = Ti.UI.createView({
        top: 20,
        width: 120,
        height: 120,
        borderColor: "#999",
        id: "imageContainer"
    });
    $.__views.window.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 0,
        width: 120,
        id: "image"
    });
    $.__views.window.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.__alloyId21 = Ti.UI.createScrollView({
        id: "__alloyId21"
    });
    $.__views.window.add($.__views.__alloyId21);
    var __alloyId23 = [];
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
    __alloyId23.push($.__views.commentInput);
    $.__views.__alloyId24 = Ti.UI.createButton({
        systemButton: Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE
    });
    __alloyId23.push($.__views.__alloyId24);
    $.__views.pubButton = Ti.UI.createButton({
        style: Titanium.UI.iPhone.SystemButtonStyle.BORDERED,
        id: "pubButton",
        title: "发布"
    });
    __alloyId23.push($.__views.pubButton);
    $.__views.toolbar = Ti.UI.iOS.createToolbar({
        bottom: 0,
        barColor: "#999",
        items: __alloyId23,
        id: "toolbar"
    });
    $.__views.__alloyId21.add($.__views.toolbar);
    var __alloyId26 = [];
    __alloyId26.push("照相");
    __alloyId26.push("从相册选取");
    __alloyId26.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId26,
        id: "dialog",
        cancel: "2",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.window,
        id: "tab3",
        title: "记录"
    });
    $.addTopLevelView($.__views.tab3);
    donotOpen ? $.__views.tab3.addEventListener("focus", donotOpen) : __defers["$.__views.tab3!focus!donotOpen"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.window.hide();
    $.window.hideNavBar();
    var previousTab;
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    __defers["$.__views.tab3!focus!donotOpen"] && $.__views.tab3.addEventListener("focus", donotOpen);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;