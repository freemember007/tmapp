function Controller() {
    function showOptions() {
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
                showPhoto(util.computeImageSize(e.media));
            },
            error: function() {
                alert("error");
            }
        });
    }
    function takePhoto() {
        Ti.Media.showCamera({
            success: function(e) {
                showPhoto(util.computeImageSize(e.media));
            },
            error: function() {
                alert("error");
            },
            autohide: !1
        });
    }
    function showPhoto(imgs) {
        $.image.image = imgs.thumb.src;
        $.TextField.visible = !0;
        $.pubButton.visible = !0;
        $.pubButton.addEventListener("click", function() {
            util.send("api/uploadPhoto", {
                photo: imgs.img.src,
                content: $.pubButton.value,
                id: "1"
            }, function(res) {
                var data = JSON.parse(res);
                item = data.item;
                Alloy.Globals.tabGroup.setActiveTab("tab1");
                var feeds = Alloy.Collections.feed, feed = Alloy.createModel("feed", {
                    content: item.content,
                    date: "2013/" + item.month + "/" + item.day,
                    image: item.image
                });
                feeds.add(feed, {
                    at: 0
                });
            });
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pubWindow = Ti.UI.createWindow({
        id: "pubWindow",
        title: "记录这一刻"
    });
    $.addTopLevelView($.__views.pubWindow);
    showOptions ? $.__views.pubWindow.addEventListener("open", showOptions) : __defers["$.__views.pubWindow!open!showOptions"] = !0;
    $.__views.image = Ti.UI.createImageView({
        top: 0,
        width: 120,
        id: "image"
    });
    $.__views.pubWindow.add($.__views.image);
    $.__views.TextField = Ti.UI.createTextField({
        top: 120,
        left: 10,
        width: 180,
        hight: 30,
        borderColor: "#ccc",
        visible: !1,
        id: "TextField"
    });
    $.__views.pubWindow.add($.__views.TextField);
    $.__views.pubButton = Ti.UI.createButton({
        top: 120,
        left: 200,
        width: 60,
        hight: 20,
        visible: !1,
        id: "pubButton",
        title: "发布"
    });
    $.__views.pubWindow.add($.__views.pubButton);
    var __alloyId19 = [];
    __alloyId19.push("照相");
    __alloyId19.push("从相册选取");
    __alloyId19.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        cancel: 2,
        options: __alloyId19,
        id: "dialog",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.pubWindow!open!showOptions"] && $.__views.pubWindow.addEventListener("open", showOptions);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;