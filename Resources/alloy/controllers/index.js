function Controller() {
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
                pub.open({
                    modal: !0
                });
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
                pub.open({
                    modal: !0
                });
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
    $.__views.index = Ti.UI.createWindow({
        navBarHidden: !0,
        id: "index"
    });
    $.addTopLevelView($.__views.index);
    $.__views.tabWin = Ti.UI.createWindow({
        navBarHidden: !0,
        id: "tabWin"
    });
    var __alloyId5 = [];
    __alloyId5.push("照相");
    __alloyId5.push("从相册选取");
    __alloyId5.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId5,
        id: "dialog",
        cancel: "2",
        title: "添加照片"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = !0;
    $.__views.tabGroup = Ti.UI.createTabGroup({
        barColor: "#333",
        tabsBackgroundColor: "#000",
        id: "tabGroup"
    });
    $.__views.tabWin.add($.__views.tabGroup);
    $.__views.__alloyId9 = Alloy.createController("blogList", {
        id: "__alloyId9"
    });
    $.__views.tab1 = Ti.UI.createTab({
        images: {
            selected: "recent.png",
            unselected: "recent.png"
        },
        window: $.__views.__alloyId9.getViewEx({
            recurse: !0
        }),
        id: "tab1",
        title: "最近"
    });
    $.__views.tabGroup.addTab($.__views.tab1);
    $.__views.__alloyId11 = Alloy.createController("monthList", {
        id: "__alloyId11"
    });
    $.__views.tab2 = Ti.UI.createTab({
        images: {
            selected: "month.png",
            unselected: "month.png"
        },
        window: $.__views.__alloyId11.getViewEx({
            recurse: !0
        }),
        id: "tab2",
        title: "本月"
    });
    $.__views.tabGroup.addTab($.__views.tab2);
    $.__views.__alloyId13 = Ti.UI.createWindow({
        navBarHidden: !0,
        id: "__alloyId13"
    });
    $.__views.tab3 = Ti.UI.createTab({
        window: $.__views.__alloyId13,
        id: "tab3"
    });
    $.__views.tabGroup.addTab($.__views.tab3);
    $.__views.__alloyId14 = Alloy.createController("yearList", {
        id: "__alloyId14"
    });
    $.__views.tab4 = Ti.UI.createTab({
        images: {
            selected: "year.png",
            unselected: "year.png"
        },
        window: $.__views.__alloyId14.getViewEx({
            recurse: !0
        }),
        id: "tab4",
        title: "今年"
    });
    $.__views.tabGroup.addTab($.__views.tab4);
    $.__views.__alloyId16 = Alloy.createController("random", {
        id: "__alloyId16"
    });
    $.__views.tab5 = Ti.UI.createTab({
        images: {
            selected: "random.png",
            unselected: "random.png"
        },
        window: $.__views.__alloyId16.getViewEx({
            recurse: !0
        }),
        id: "tab5",
        title: "随机"
    });
    $.__views.tabGroup.addTab($.__views.tab5);
    $.__views.snapView = Ti.UI.createView({
        bottom: 0,
        width: 47,
        height: 47,
        backgroundImage: "camera.png",
        id: "snapView"
    });
    $.__views.tabWin.add($.__views.snapView);
    showDialog ? $.__views.snapView.addEventListener("singletap", showDialog) : __defers["$.__views.snapView!singletap!showDialog"] = !0;
    $.__views.navGroup = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.tabWin,
        id: "navGroup"
    });
    $.__views.index.add($.__views.navGroup);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tabGroup = $.tabGroup;
    Alloy.Globals.tab1 = $.tab1;
    Alloy.Globals.tab2 = $.tab2;
    Alloy.Globals.tab4 = $.tab4;
    var startWin = Ti.UI.createWindow({
        backgroundImage: "Default.png"
    }), actInd = Titanium.UI.createActivityIndicator({
        left: 135,
        bottom: 90,
        height: 50,
        width: 50,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    startWin.add(actInd);
    actInd.show();
    startWin.open();
    if (Ti.App.Properties.hasProperty("id")) {
        $.index.open({
            transition: Ti.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
        });
        $.tabGroup.open();
    } else {
        var login = Alloy.createController("login").getView();
        login.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_DOWN
        });
        startWin.close();
    }
    var ticustomtab = require("de.marcelpociot.ticustomtab");
    ticustomtab.customText({
        textColor: "#666",
        font: {
            fontSize: 12,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        }
    });
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    __defers["$.__views.snapView!singletap!showDialog"] && $.__views.snapView.addEventListener("singletap", showDialog);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;