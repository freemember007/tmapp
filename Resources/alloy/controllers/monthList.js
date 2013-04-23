function Controller() {
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10 && e.contentSize.height > 480 && isHide == 0) {
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
    function firstFetchMonth() {
        if (Ti.App.Properties.hasProperty("monthData") && Ti.App.Properties.getString("monthData") != "{}") {
            var items = JSON.parse(Ti.App.Properties.getString("monthData")), tabledata = [];
            for (key in items) {
                var arg = {
                    day: key,
                    feeds: items[key]
                }, row = Alloy.createController("monthRow", arg).getView();
                tabledata.push(row);
            }
            $.table.setData(tabledata);
            $.monthList.remove(actInd);
        } else fetchMonth();
    }
    function fetchMonth() {
        util.send("api/fetchMonth", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password")
        }, function(res) {
            var data = JSON.parse(res);
            $.monthList.remove(actInd);
            if (data.type == "success") {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    }, row = Alloy.createController("monthRow", arg).getView();
                    tabledata.push(row);
                }
                $.table.setData(tabledata);
                Ti.App.Properties.setString("monthData", JSON.stringify(items));
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    function preFetchMonth() {
        (!Ti.App.Properties.hasProperty("monthData") || Ti.App.Properties.getString("monthData") == "{}") && fetchMonth();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.monthList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        title: "本月",
        id: "monthList"
    });
    $.addTopLevelView($.__views.monthList);
    firstFetchMonth ? $.__views.monthList.addEventListener("open", firstFetchMonth) : __defers["$.__views.monthList!open!firstFetchMonth"] = !0;
    preFetchMonth ? $.__views.monthList.addEventListener("focus", preFetchMonth) : __defers["$.__views.monthList!focus!preFetchMonth"] = !0;
    $.__views.top = Ti.UI.createView({
        width: "100%",
        height: 47,
        top: 0,
        backgroundImage: "top2.png",
        zIndex: 1,
        id: "top"
    });
    $.__views.monthList.add($.__views.top);
    $.__views.table = Ti.UI.createTableView({
        top: 44,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 49,
        id: "table"
    });
    $.__views.monthList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    $.__views.__alloyId41 = Alloy.createController("bottom", {
        id: "__alloyId41"
    });
    $.__views.__alloyId41.setParent($.__views.monthList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.monthList.add(actInd);
    var offset = 0, isHide = !1, pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchMonth
    }).getView();
    $.table.headerPullView = pullView;
    __defers["$.__views.monthList!open!firstFetchMonth"] && $.__views.monthList.addEventListener("open", firstFetchMonth);
    __defers["$.__views.monthList!focus!preFetchMonth"] && $.__views.monthList.addEventListener("focus", preFetchMonth);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;