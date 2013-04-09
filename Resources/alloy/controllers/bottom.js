function Controller() {
    function openRecent() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
    }
    function openMonth() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab2);
    }
    function openCamera() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab3);
    }
    function openYear() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab4);
    }
    function openRandom() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab5);
        Alloy.Globals.fetchRandom();
    }
    function showDialog() {
        $.dialog.show();
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
                var pub = Alloy.createController("pub").getView();
                pub.open();
                Alloy.Globals.showPhoto(util.computeImageSize(e.media));
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
                var pub = Alloy.createController("pub").getView();
                pub.open();
                Alloy.Globals.showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            saveToPhotoGallery: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.bottom = Ti.UI.createView({
        backgroundImage: "bottom.png",
        height: 54,
        width: 320,
        bottom: 0,
        left: 0,
        zIndex: 1,
        layout: "horizontal",
        id: "bottom"
    });
    $.addTopLevelView($.__views.bottom);
    $.__views.recentImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "recentImg.png",
        top: 8,
        id: "recentImg"
    });
    $.__views.bottom.add($.__views.recentImg);
    openRecent ? $.__views.recentImg.addEventListener("click", openRecent) : __defers["$.__views.recentImg!click!openRecent"] = !0;
    $.__views.monthImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "monthImg.png",
        top: 6,
        id: "monthImg"
    });
    $.__views.bottom.add($.__views.monthImg);
    openMonth ? $.__views.monthImg.addEventListener("click", openMonth) : __defers["$.__views.monthImg!click!openMonth"] = !0;
    $.__views.cameraImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "cameraImg.png",
        top: 5,
        id: "cameraImg"
    });
    $.__views.bottom.add($.__views.cameraImg);
    showDialog ? $.__views.cameraImg.addEventListener("click", showDialog) : __defers["$.__views.cameraImg!click!showDialog"] = !0;
    $.__views.yearImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "yearImg.png",
        top: 6,
        id: "yearImg"
    });
    $.__views.bottom.add($.__views.yearImg);
    openYear ? $.__views.yearImg.addEventListener("click", openYear) : __defers["$.__views.yearImg!click!openYear"] = !0;
    $.__views.randomImg = Ti.UI.createImageView({
        preventDefaultImage: !0,
        image: "randomImg.png",
        top: 6,
        id: "randomImg"
    });
    $.__views.bottom.add($.__views.randomImg);
    openRandom ? $.__views.randomImg.addEventListener("click", openRandom) : __defers["$.__views.randomImg!click!openRandom"] = !0;
    var __alloyId8 = [];
    __alloyId8.push("照相");
    __alloyId8.push("从相册选取");
    __alloyId8.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId8,
        id: "dialog",
        cancel: "2",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.showDialog = showDialog;
    __defers["$.__views.recentImg!click!openRecent"] && $.__views.recentImg.addEventListener("click", openRecent);
    __defers["$.__views.monthImg!click!openMonth"] && $.__views.monthImg.addEventListener("click", openMonth);
    __defers["$.__views.cameraImg!click!showDialog"] && $.__views.cameraImg.addEventListener("click", showDialog);
    __defers["$.__views.yearImg!click!openYear"] && $.__views.yearImg.addEventListener("click", openYear);
    __defers["$.__views.randomImg!click!openRandom"] && $.__views.randomImg.addEventListener("click", openRandom);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;