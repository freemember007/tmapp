function Controller() {
    function showPhoto(imgs) {
        $.pub.remove($.imageContainer);
        $.image.image = imgs.middleImg.src;
        $.cancelButton.addEventListener("click", clearPub);
        $.pubButton.addEventListener("click", pub);
    }
    function pub() {
        $.commentInput.blur();
        util.send("api/uploadPhoto", {
            photo: $.image.image,
            content: $.commentInput.value,
            id: Ti.App.Properties.getString("id"),
            friendsID: "1,"
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
        $.commentInput.blur();
        Alloy.createController("zoomImage", $.image.image).getView();
    }
    function showKeybroad() {
        $.commentInput.focus();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.pub = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: !0,
        id: "pub"
    });
    $.addTopLevelView($.__views.pub);
    showKeybroad ? $.__views.pub.addEventListener("focus", showKeybroad) : __defers["$.__views.pub!focus!showKeybroad"] = !0;
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "top",
        text: "记录这一刻"
    });
    $.__views.pub.add($.__views.top);
    $.__views.cancelButton = Ti.UI.createLabel({
        left: 10,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "backBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        zIndex: 1,
        id: "cancelButton",
        text: "取消"
    });
    $.__views.pub.add($.__views.cancelButton);
    $.__views.imageContainer = Ti.UI.createView({
        top: 64,
        width: 120,
        height: 120,
        borderColor: "#999",
        id: "imageContainer"
    });
    $.__views.pub.add($.__views.imageContainer);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        top: 44,
        width: 120,
        id: "image"
    });
    $.__views.pub.add($.__views.image);
    openZoomImage ? $.__views.image.addEventListener("click", openZoomImage) : __defers["$.__views.image!click!openZoomImage"] = !0;
    $.__views.__alloyId27 = Ti.UI.createScrollView({
        height: 290,
        bottom: 0,
        id: "__alloyId27"
    });
    $.__views.pub.add($.__views.__alloyId27);
    $.__views.toolbar = Ti.UI.createView({
        bottom: 0,
        height: 44,
        backgroundGradient: {
            type: "linear",
            startPoint: {
                x: "50%",
                y: "0%"
            },
            endPoint: {
                x: "50%",
                y: "100%"
            },
            colors: [ {
                color: "#666",
                offset: 0
            }, {
                color: "#fff",
                offset: 0.025
            }, {
                color: "#eee",
                offset: 0.05
            }, {
                color: "#ccc",
                offset: 1
            } ]
        },
        id: "toolbar"
    });
    $.__views.__alloyId27.add($.__views.toolbar);
    $.__views.commentInput = Ti.UI.createTextField({
        left: 7,
        top: 7,
        width: 240,
        height: 32,
        font: {
            fontSize: 14
        },
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        hintText: "添加照片描述",
        enableReturnKey: !0,
        suppressReturn: !1,
        zIndex: 1,
        id: "commentInput"
    });
    $.__views.toolbar.add($.__views.commentInput);
    $.__views.pubButton = Ti.UI.createLabel({
        right: 7,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "buttonBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "pubButton",
        text: "发布"
    });
    $.__views.toolbar.add($.__views.pubButton);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.showPhoto = showPhoto;
    __defers["$.__views.pub!focus!showKeybroad"] && $.__views.pub.addEventListener("focus", showKeybroad);
    __defers["$.__views.image!click!openZoomImage"] && $.__views.image.addEventListener("click", openZoomImage);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;