function Controller() {
    function tableScroolable() {
        $.table.scrollable = Alloy.Globals.slide ? false : true;
    }
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            $.sharetome.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            Alloy.Globals.slide = false;
        } else {
            $.sharetome.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            Alloy.Globals.slide = true;
        }
    }
    function firstfetchSharetome() {
        if (Ti.App.Properties.hasProperty("sharetomeData") && 0 == Ti.UI.iPhone.getAppBadge()) {
            var data = JSON.parse(Ti.App.Properties.getString("sharetomeData"));
            setData(data, false);
        } else fetchSharetome();
    }
    function fetchSharetome() {
        util.send("api/fetchSharetome", {
            id: Ti.App.Properties.getString("id")
        }, function(res) {
            var data = JSON.parse(res);
            if ("success" == data.type) {
                setData(data, false);
                Ti.UI.iPhone.setAppBadge(0);
                var badge = Alloy.Models.instance("badge");
                badge.set({
                    visible: false,
                    width: 0,
                    number: 0
                });
                badge.save();
                Ti.App.Properties.setString("sharetomeData", JSON.stringify(data));
            }
        });
    }
    function setData(data, isAppend) {
        var users = data.users;
        var items = data.items;
        if (0 == users.length) {
            $.table.setData(null);
            $.hint.setVisible(true);
        } else {
            $.hint.setVisible(false);
            var tabledata = [];
            for (var i = 0; users.length > i; i++) {
                var hour = items[i].created_at.match(/[0-9]+:[0-9]+/)[0];
                var row = Ti.UI.createTableViewRow({
                    selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
                });
                var avatar = Ti.UI.createImageView({
                    top: 10,
                    left: 10 * Alloy.CFG.GUI_widthScale,
                    width: 32,
                    height: 32,
                    preventDefaultImage: true,
                    borderRadius: 3,
                    image: null != users[i].avatar_url ? Alloy.Globals.sitePath + users[i].avatar_url : "avatar.png"
                });
                var username = Ti.UI.createLabel({
                    top: 10,
                    left: 60,
                    height: 32,
                    text: users[i].domain_name,
                    color: "#555",
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    shadowColor: "#eee",
                    shadowOffset: {
                        x: 1,
                        y: 1
                    }
                });
                var date = Ti.UI.createLabel({
                    top: 10,
                    right: 10 * Alloy.CFG.GUI_widthScale,
                    height: 32,
                    text: util.formatTime(parseInt(hour)) + " " + hour,
                    color: "#888",
                    shadowColor: "#fff",
                    shadowOffset: {
                        x: 1,
                        y: 1
                    },
                    font: {
                        fontSize: 12,
                        fontWeight: "bold"
                    },
                    textAlign: "right"
                });
                var imageContainer = Ti.UI.createLabel({
                    top: 45,
                    width: 308 * Alloy.CFG.GUI_widthScale,
                    backgroundImage: "image_back.png",
                    layout: "vertical"
                });
                var image = Ti.UI.createImageView({
                    top: 10 * Alloy.CFG.GUI_widthScale,
                    width: 286 * Alloy.CFG.GUI_widthScale,
                    preventDefaultImage: true,
                    image: Alloy.Globals.sitePath + items[i].url
                });
                imageContainer.addEventListener("click", function(e) {
                    void 0 !== e.source.image && Alloy.createController("zoomImage", e.source.image).getView();
                });
                var describe = Ti.UI.createLabel({
                    width: 286 * Alloy.CFG.GUI_widthScale,
                    font: {
                        fontSize: 14,
                        fontWeight: "bold"
                    },
                    color: "#555",
                    shadowColor: "#eee",
                    shadowOffset: {
                        x: 1,
                        y: 1
                    }
                });
                if ("" == items[i].content) describe.height = 11 * Alloy.CFG.GUI_widthScale; else {
                    describe.text = items[i].content;
                    describe.height = 40 * Alloy.CFG.GUI_widthScale;
                }
                row.add(avatar);
                row.add(username);
                row.add(date);
                imageContainer.add(image);
                imageContainer.add(describe);
                row.add(imageContainer);
                isAppend ? $.table.appendRow(row, {
                    animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
                }) : tabledata.push(row);
            }
            isAppend || $.table.setData(tabledata);
        }
        isAppend || $.sharetome.remove(actInd);
    }
    function beginUpdate() {
        updating = true;
        $.table.appendRow(loadingRow);
        loadingInd.show();
        setTimeout(endUpdate, 2e3);
    }
    function endUpdate() {
        updating = false;
        lastRow += 10;
        util.send("api/fetchSharetome", {
            id: Ti.App.Properties.getString("id")
        }, function(res) {
            var data = JSON.parse(res);
            $.table.deleteRow($.table.data.length - 1, {
                animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
            });
            loadingInd.hide();
            if ("success" == data.type) {
                setData(data, true);
                $.table.scrollToIndex(lastRow - 9, {
                    animated: true,
                    position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
                });
                fetchOffset += 10;
            } else util.alert("刷新失败，请重试！");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.sharetome = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        left: 200,
        id: "sharetome"
    });
    $.__views.sharetome && $.addTopLevelView($.__views.sharetome);
    tableScroolable ? $.__views.sharetome.addEventListener("postlayout", tableScroolable) : __defers["$.__views.sharetome!postlayout!tableScroolable"] = true;
    firstfetchSharetome ? $.__views.sharetome.addEventListener("open", firstfetchSharetome) : __defers["$.__views.sharetome!open!firstfetchSharetome"] = true;
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        left: 0,
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
        text: "分享给我的"
    });
    $.__views.sharetome.add($.__views.top);
    $.__views.menuButton = Ti.UI.createLabel({
        left: 10,
        top: 9,
        width: 32,
        height: 27,
        backgroundImage: "menuIcon.png",
        zIndex: 1,
        id: "menuButton"
    });
    $.__views.sharetome.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = true;
    $.__views.hint = Ti.UI.createLabel({
        top: 100,
        width: 280,
        height: 280,
        color: "#666",
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
        visible: false,
        zIndex: 1,
        id: "hint",
        text: "暂无人分享时光给你。\n请告诉朋友添加你为自己人，以便他们可以分享时光给他们。"
    });
    $.__views.sharetome.add($.__views.hint);
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        top: 44,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 0,
        id: "table"
    });
    $.__views.sharetome.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.sharetome.add(actInd);
    var pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchSharetome
    }).getView();
    $.table.headerPullView = pullView;
    var fetchOffset = 10;
    var lastRow = 10;
    var updating = false;
    var loadingInd = Ti.UI.createActivityIndicator({
        width: 30,
        height: 30,
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    });
    var loadingRow = Ti.UI.createTableViewRow({
        height: 40
    });
    loadingRow.add(loadingInd);
    $.table.addEventListener("scroll", function(e) {
        !updating && e.contentSize.height > 3360 && e.contentOffset.y + e.size.height + 100 > e.contentSize.height && beginUpdate();
    });
    __defers["$.__views.sharetome!postlayout!tableScroolable"] && $.__views.sharetome.addEventListener("postlayout", tableScroolable);
    __defers["$.__views.sharetome!open!firstfetchSharetome"] && $.__views.sharetome.addEventListener("open", firstfetchSharetome);
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;