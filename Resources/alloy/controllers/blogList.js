function Controller() {
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
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
            $.blogList.remove(actInd);
        });
    }
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10) {
            $.blogList.hideNavBar();
            offset = e.contentOffset.y;
        }
        if (e.contentOffset.y - offset < -10) {
            $.blogList.showNavBar();
            offset = e.contentOffset.y;
        }
        e.contentOffset.y <= 0 && (offset = 0);
        e.contentOffset.y >= e.contentSize.height - e.size.height && (offset = e.contentSize.height - e.size.height);
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
        barImage: "navBar1.png",
        id: "blogList"
    });
    $.addTopLevelView($.__views.blogList);
    fetchBlog ? $.__views.blogList.addEventListener("open", fetchBlog) : __defers["$.__views.blogList!open!fetchBlog"] = !0;
    $.__views.__alloyId1 = Ti.UI.createLabel({
        font: {
            fontSize: 24,
            fontWeight: "bold",
            fontFamily: "迷你简南宫"
        },
        color: "#fff",
        shadowOffset: {
            x: 1,
            y: -1
        },
        text: "时光笔记",
        id: "__alloyId1"
    });
    $.__views.blogList.titleControl = $.__views.__alloyId1;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "#ccc",
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.blogList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.tableBlog = $.table;
    Alloy.Globals.fetchBlog = fetchBlog;
    var actInd = Alloy.createController("actInd").getView();
    actInd.style = Titanium.UI.iPhone.ActivityIndicatorStyle.DARK;
    actInd.color = Alloy.Globals.GUI_bkC;
    $.blogList.add(actInd);
    var fetchOffset = 10, lastRow = 10, offset = 0, pullView = Alloy.createController("pullView", {
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
    __defers["$.__views.blogList!open!fetchBlog"] && $.__views.blogList.addEventListener("open", fetchBlog);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;