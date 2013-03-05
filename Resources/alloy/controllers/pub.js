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
                Ti.Media.hideCamera();
                showPhoto(util.computeImageSize(e.media));
            },
            error: function() {
                alert("error");
            },
            autohide: !1
        });
    }
    function showPhoto(imgs) {
        $.dialog.hide();
        $.image.image = imgs.thumb.src;
        $.textField.visible = !0;
        $.pubButton.visible = !0;
        $.pubButton.addEventListener("click", function() {
            util.send("api/uploadPhoto", {
                photo: imgs.img.src,
                content: $.textField.value,
                id: "1"
            }, function(res) {
                var data = JSON.parse(res);
                item = data.item;
                $.image.visible = !1;
                $.textField.visible = !1;
                $.pubButton.visible = !1;
                Alloy.Globals.index.setActiveTab("tab1");
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
    $.__views.pub = Ti.UI.createWindow({
        title: "记录这一刻",
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    showOptions ? $.__views.pub.addEventListener("focus", showOptions) : __defers["$.__views.pub!focus!showOptions"] = !0;
    $.__views.image = Ti.UI.createImageView({
        top: 0,
        width: 120,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    $.__views.textField = Ti.UI.createTextField({
        top: 170,
        left: 10,
        width: 180,
        height: 40,
        borderColor: "#ccc",
        visible: !1,
        id: "textField"
    });
    $.__views.pub.add($.__views.textField);
    $.__views.pubButton = Ti.UI.createButton({
        top: 170,
        left: 200,
        visible: !1,
        id: "pubButton",
        title: "发布"
    });
    $.__views.pub.add($.__views.pubButton);
    var __alloyId17 = [];
    __alloyId17.push("照相");
    __alloyId17.push("从相册选取");
    __alloyId17.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        cancel: 2,
        options: __alloyId17,
        id: "dialog",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.pub!focus!showOptions"] && $.__views.pub.addEventListener("focus", showOptions);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;