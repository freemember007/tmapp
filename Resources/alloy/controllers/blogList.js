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
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            allowEditing: true
        });
    }
    function takePhoto() {
        Ti.Media.showCamera({
            success: function(e) {
                showPhoto(util.computeImageSize(e.media));
            },
            cancel: function() {},
            error: function() {
                alert("error");
            },
            saveToPhotoGallery: true,
            allowEditing: true
        });
    }
    function showPhoto(imgs) {
        $.avatar.image = imgs.thumb.src;
        util.send("api/altAvatar", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password"),
            avatar: $.avatar.image
        }, function(res) {
            var data = JSON.parse(res);
            "success" == data.type ? Ti.App.Properties.setString("avatar", data.avatar) : "fail" == data.type ? alert("上传头像失败") : alert("unknown error");
        });
    }
    function firstFetchBlog() {
        if (Ti.App.Properties.hasProperty("blogData") && "{}" != Ti.App.Properties.getString("blogData")) {
            var items = JSON.parse(Ti.App.Properties.getString("blogData"));
            var tabledata = [];
            for (key in items) {
                var arg = {
                    day: key,
                    feeds: items[key]
                };
                var section = Alloy.createController("blogSection", arg).getView();
                tabledata.push(section);
            }
            Alloy.Globals.tableBlog.setData(tabledata);
            fetchOffset = 10;
            lastRow = 10;
            $.blogList.remove(actInd);
        } else fetchBlog();
    }
    function fetchBlog() {
        util.send("api/fetchBlog", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password"),
            offset: 0
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                items = data.items;
                if ("{}" == JSON.stringify(items)) Alloy.Globals.tabGroup.add(welcome); else {
                    Alloy.Globals.tabGroup.remove(welcome);
                    var tabledata = [];
                    for (key in items) {
                        var arg = {
                            day: key,
                            feeds: items[key]
                        };
                        var section = Alloy.createController("blogSection", arg).getView();
                        tabledata.push(section);
                    }
                    Alloy.Globals.tableBlog.setData(tabledata);
                    fetchOffset = 10;
                    lastRow = 10;
                    Ti.App.Properties.setString("blogData", JSON.stringify(items));
                }
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
            $.blogList.remove(actInd);
        });
    }
    function preFetchBlog() {
        Ti.App.Properties.hasProperty("blogData") && "{}" != Ti.App.Properties.getString("blogData") || fetchBlog();
    }
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10 && e.contentSize.height > Ti.Platform.displayCaps.platformHeight && false == isHide) {
            $.top.animate({
                top: -47
            });
            $.table.animate({
                top: 0
            });
            offset = e.contentOffset.y;
            isHide = true;
        }
        if (-10 > e.contentOffset.y - offset && true == isHide) {
            $.top.animate({
                top: 0
            });
            $.table.animate({
                top: 44
            });
            offset = e.contentOffset.y;
            isHide = false;
        }
        0 >= e.contentOffset.y && (offset = 0);
        e.contentOffset.y >= e.contentSize.height - e.size.height && (offset = e.contentSize.height - e.size.height);
    }
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            Alloy.Globals.tabGroup.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            $.table.scrollable = true;
            Alloy.Globals.slide = false;
        } else {
            Alloy.Globals.tabGroup.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            $.table.scrollable = false;
            Alloy.Globals.slide = true;
        }
    }
    function beginUpdate() {
        updating = true;
        $.table.appendSection(loadingSection);
        loadingInd.show();
        setTimeout(endUpdate, 2e3);
    }
    function endUpdate() {
        updating = false;
        lastRow += 10;
        util.send("api/fetchBlog", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password"),
            offset: fetchOffset
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                items = data.items;
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    };
                    var section = Alloy.createController("blogSection", arg).getView();
                    $.table.appendSection(section, {
                        animated: false
                    });
                }
                $.table.deleteSection($.table.data.length - Object.keys(items).length - 1, {
                    animated: false
                });
                $.table.scrollToIndex(lastRow - 10, {
                    position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
                });
                fetchOffset += 10;
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    Alloy.Models.instance("badge");
    $.__views.blogList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        id: "blogList"
    });
    $.__views.blogList && $.addTopLevelView($.__views.blogList);
    firstFetchBlog ? $.__views.blogList.addEventListener("open", firstFetchBlog) : __defers["$.__views.blogList!open!firstFetchBlog"] = true;
    preFetchBlog ? $.__views.blogList.addEventListener("focus", preFetchBlog) : __defers["$.__views.blogList!focus!preFetchBlog"] = true;
    $.__views.top = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        left: 0,
        backgroundImage: "top1.png",
        zIndex: 1,
        id: "top"
    });
    $.__views.blogList.add($.__views.top);
    $.__views.menuButton = Ti.UI.createLabel({
        left: 10,
        top: 9,
        width: 32,
        height: 32,
        zIndex: 1,
        id: "menuButton"
    });
    $.__views.top.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = true;
    $.__views.shareBadge = Ti.UI.createLabel({
        top: 5,
        left: 45,
        height: 22,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#fff",
        backgroundColor: "red",
        color: "#fff",
        font: {
            fontSize: 14,
            fontWeight: "bolder",
            fontFamily: "HelveticaNeue-CondensedBlack"
        },
        zIndex: 1,
        textAlign: "center",
        id: "shareBadge"
    });
    $.__views.top.add($.__views.shareBadge);
    $.__views.avatar = Ti.UI.createImageView({
        preventDefaultImage: true,
        right: 10,
        top: 8,
        width: 30,
        height: 30,
        borderRadius: 3,
        zIndex: 1,
        id: "avatar"
    });
    $.__views.top.add($.__views.avatar);
    showDialog ? $.__views.avatar.addEventListener("click", showDialog) : __defers["$.__views.avatar!click!showDialog"] = true;
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        top: 44,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 49,
        id: "table"
    });
    $.__views.blogList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = true;
    $.__views.__alloyId2 = Alloy.createController("bottom", {
        id: "__alloyId2",
        __parentSymbol: $.__views.blogList
    });
    $.__views.__alloyId2.setParent($.__views.blogList);
    var __alloyId4 = [];
    __alloyId4.push("拍照");
    __alloyId4.push("从相册选取");
    __alloyId4.push("取消");
    $.__views.dialog = Ti.UI.createOptionDialog({
        options: __alloyId4,
        id: "dialog",
        cancel: "2",
        title: "修改头像"
    });
    choose ? $.__views.dialog.addEventListener("click", choose) : __defers["$.__views.dialog!click!choose"] = true;
    var __alloyId8 = function() {
        $.shareBadge.text = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform()["number"] : Alloy.Models.badge.get("number");
        $.shareBadge.visible = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform()["visible"] : Alloy.Models.badge.get("visible");
        $.shareBadge.width = _.isFunction(Alloy.Models.badge.transform) ? Alloy.Models.badge.transform()["width"] : Alloy.Models.badge.get("width");
    };
    Alloy.Models.badge.on("fetch change destroy", __alloyId8);
    exports.destroy = function() {
        Alloy.Models.badge.off("fetch change destroy", __alloyId8);
    };
    _.extend($, $.__views);
    Alloy.Globals.blogList = $.blogList;
    Alloy.Globals.tableBlog = $.table;
    Alloy.Globals.fetchBlog = fetchBlog;
    Alloy.Globals.avatar = $.avatar;
    $.avatar.image = null == Ti.App.Properties.getString("avatar") ? "avatar.png" : Alloy.Globals.sitePath + Ti.App.Properties.getString("avatar");
    var actInd = Alloy.createController("actInd").getView();
    actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.DARK;
    actInd.color = "black";
    $.blogList.add(actInd);
    var fetchOffset = 10;
    var lastRow = 10;
    var welcome = Alloy.createController("welcome").getView();
    var offset = 0;
    var isHide = false;
    var pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchBlog
    }).getView();
    $.table.headerPullView = pullView;
    var updating = false;
    var loadingInd = Ti.UI.createActivityIndicator({
        width: 30,
        height: 30,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    var loadingRow = Ti.UI.createTableViewRow({
        height: 40
    });
    var loadingSection = Ti.UI.createTableViewSection();
    loadingSection.add(loadingRow);
    loadingRow.add(loadingInd);
    $.table.addEventListener("scroll", function(e) {
        !updating && e.contentSize.height > 5 * Ti.Platform.displayCaps.platformHeight && e.contentOffset.y + e.size.height + 100 > e.contentSize.height && beginUpdate();
    });
    __defers["$.__views.blogList!open!firstFetchBlog"] && $.__views.blogList.addEventListener("open", firstFetchBlog);
    __defers["$.__views.blogList!focus!preFetchBlog"] && $.__views.blogList.addEventListener("focus", preFetchBlog);
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    __defers["$.__views.avatar!click!showDialog"] && $.__views.avatar.addEventListener("click", showDialog);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    __defers["$.__views.dialog!click!choose"] && $.__views.dialog.addEventListener("click", choose);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;