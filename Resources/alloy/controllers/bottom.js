function Controller() {
    function openRecent() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab1);
    }
    function openMonth() {
        Alloy.Globals.tabGroup.setActiveTab(Alloy.Globals.tab2);
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
            saveToPhotoGallery: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "bottom";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.bottom = Ti.UI.createView({
        backgroundImage: "bottomRound.png",
        height: 54,
        width: Ti.Platform.displayCaps.platformWidth,
        bottom: 0,
        left: 0,
        zIndex: 1,
        layout: "horizontal",
        id: "bottom"
    });
    $.__views.bottom && $.addTopLevelView($.__views.bottom);
    $.__views.recentImg = Ti.UI.createLabel({
        bottom: 0,
        width: 64,
        height: 49,
        zIndex: 1,
        id: "recentImg"
    });
    $.__views.bottom.add($.__views.recentImg);
    openRecent ? $.__views.recentImg.addEventListener("click", openRecent) : __defers["$.__views.recentImg!click!openRecent"] = true;
    $.__views.monthImg = Ti.UI.createLabel({
        bottom: 0,
        width: 64,
        height: 49,
        zIndex: 1,
        id: "monthImg"
    });
    $.__views.bottom.add($.__views.monthImg);
    openMonth ? $.__views.monthImg.addEventListener("click", openMonth) : __defers["$.__views.monthImg!click!openMonth"] = true;
    $.__views.cameraImg = Ti.UI.createLabel({
        bottom: 0,
        width: 64,
        height: 49,
        zIndex: 1,
        id: "cameraImg"
    });
    $.__views.bottom.add($.__views.cameraImg);
    showDialog ? $.__views.cameraImg.addEventListener("click", showDialog) : __defers["$.__views.cameraImg!click!showDialog"] = true;
    $.__views.yearImg = Ti.UI.createLabel({
        bottom: 0,
        width: 64,
        height: 49,
        zIndex: 1,
        id: "yearImg"
    });
    $.__views.bottom.add($.__views.yearImg);
    openYear ? $.__views.yearImg.addEventListener("click", openYear) : __defers["$.__views.yearImg!click!openYear"] = true;
    $.__views.randomImg = Ti.UI.createLabel({
        bottom: 0,
        width: 64,
        height: 49,
        zIndex: 1,
        id: "randomImg"
    });
    $.__views.bottom.add($.__views.randomImg);
    openRandom ? $.__views.randomImg.addEventListener("click", openRandom) : __defers["$.__views.randomImg!click!openRandom"] = true;
    var __alloyId11 = [];
    __alloyId11.push("照相");
    __alloyId11.push("从相册选取");
    __alloyId11.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        bubbleParent: false,
        options: __alloyId11,
        id: "dialog",
        cancel: "2",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = true;
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

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;