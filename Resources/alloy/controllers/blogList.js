function Controller() {
    function firstFetchBlog() {
        if (Ti.App.Properties.hasProperty("blogData")) {
            var data = JSON.parse(Ti.App.Properties.getString("blogData"));
            items = data.items;
            var tabledata = [];
            for (key in items) {
                var arg = {
                    day: key,
                    feeds: items[key]
                }, section = Alloy.createController("blogSection", arg).getView();
                tabledata.push(section);
            }
            Alloy.Globals.tableBlog.setData(tabledata);
            fetchOffset = 10;
            lastRow = 10;
            $.blogList.remove(actInd);
        } else fetchBlog();
    }
    function fetchBlog() {
        util.send("api/login", {
            email: "freemem@163.com",
            password: "666666",
            offset: 0
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    }, section = Alloy.createController("blogSection", arg).getView();
                    tabledata.push(section);
                }
                Alloy.Globals.tableBlog.setData(tabledata);
                fetchOffset = 10;
                lastRow = 10;
                Ti.App.Properties.setString("blogData", res);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
            $.blogList.remove(actInd);
        });
    }
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10 && isHide == 0) {
            $.top.animate({
                top: -47
            });
            $.table.animate({
                top: 0
            });
            offset = e.contentOffset.y;
            isHide = !0;
        }
        if (e.contentOffset.y - offset < -10 && isHide == 1) {
            $.top.animate({
                top: 0
            });
            $.table.animate({
                top: 44
            });
            offset = e.contentOffset.y;
            isHide = !1;
        }
        e.contentOffset.y <= 0 && (offset = 0);
        e.contentOffset.y >= e.contentSize.height - e.size.height && (offset = e.contentSize.height - e.size.height);
    }
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            $.blogList.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            Alloy.Globals.slide = !1;
            $.table.scrollable = !0;
        } else {
            $.table.scrollable = !1;
            $.blogList.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            Alloy.Globals.slide = !0;
        }
    }
    function beginUpdate() {
        updating = !0;
        $.table.appendSection(loadingSection);
        loadingInd.show();
        setTimeout(endUpdate, 2000);
    }
    function endUpdate() {
        updating = !1;
        lastRow += 10;
        util.send("api/login", {
            email: "freemem@163.com",
            password: "666666",
            offset: fetchOffset
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                $.table.deleteSection($.table.data.length - 1, {
                    animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
                });
                loadingInd.hide();
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    }, section = Alloy.createController("blogSection", arg).getView();
                    $.table.appendSection(section, {
                        animationStyle: Titanium.UI.iPhone.RowAnimationStyle.NONE
                    });
                }
                $.table.scrollToIndex(lastRow - 10, {
                    animated: !0,
                    position: Ti.UI.iPhone.TableViewScrollPosition.BOTTOM
                });
                fetchOffset += 10;
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        id: "blogList"
    });
    $.addTopLevelView($.__views.blogList);
    firstFetchBlog ? $.__views.blogList.addEventListener("open", firstFetchBlog) : __defers["$.__views.blogList!open!firstFetchBlog"] = !0;
    $.__views.top = Ti.UI.createView({
        width: 320,
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
        height: 27,
        backgroundImage: "menuIcon.png",
        zIndex: 1,
        id: "menuButton"
    });
    $.__views.top.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = !0;
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        top: 44,
        width: 320,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 49,
        id: "table"
    });
    $.__views.blogList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    $.__views.__alloyId0 = Alloy.createController("bottom", {
        id: "__alloyId0"
    });
    $.__views.__alloyId0.setParent($.__views.blogList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.blogList = $.blogList;
    Alloy.Globals.tableBlog = $.table;
    Alloy.Globals.fetchBlog = fetchBlog;
    var actInd = Alloy.createController("actInd").getView();
    actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
    actInd.color = "black";
    $.blogList.add(actInd);
    var fetchOffset = 10, lastRow = 10, offset = 0, isHide = !1, pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchBlog
    }).getView();
    $.table.headerPullView = pullView;
    var updating = !1, loadingInd = Titanium.UI.createActivityIndicator({
        bottom: 5,
        width: 30,
        height: 30,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
    }), loadingRow = Ti.UI.createTableViewRow(), loadingSection = Ti.UI.createTableViewSection();
    loadingSection.add(loadingRow);
    loadingRow.add(loadingInd);
    $.table.addEventListener("scroll", function(e) {
        !updating && e.contentOffset.y + e.size.height + 100 > e.contentSize.height && beginUpdate();
    });
    __defers["$.__views.blogList!open!firstFetchBlog"] && $.__views.blogList.addEventListener("open", firstFetchBlog);
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;