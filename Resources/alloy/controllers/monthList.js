function Controller() {
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
    function firstFetchMonth() {
        if (Ti.App.Properties.hasProperty("monthData") && "{}" != Ti.App.Properties.getString("monthData")) {
            var items = JSON.parse(Ti.App.Properties.getString("monthData"));
            var tabledata = [];
            for (key in items) {
                var arg = {
                    day: key,
                    feeds: items[key]
                };
                var row = Alloy.createController("monthRow", arg).getView();
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
            if ("success" == data.type) {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        day: key,
                        feeds: items[key]
                    };
                    var row = Alloy.createController("monthRow", arg).getView();
                    tabledata.push(row);
                }
                $.table.setData(tabledata);
                Ti.App.Properties.setString("monthData", JSON.stringify(items));
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    function preFetchMonth() {
        Ti.App.Properties.hasProperty("monthData") && "{}" != Ti.App.Properties.getString("monthData") || fetchMonth();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "monthList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.monthList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        title: "本月",
        id: "monthList"
    });
    $.__views.monthList && $.addTopLevelView($.__views.monthList);
    firstFetchMonth ? $.__views.monthList.addEventListener("open", firstFetchMonth) : __defers["$.__views.monthList!open!firstFetchMonth"] = true;
    preFetchMonth ? $.__views.monthList.addEventListener("focus", preFetchMonth) : __defers["$.__views.monthList!focus!preFetchMonth"] = true;
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        backgroundImage: "top2.png",
        color: "#555",
        opacity: .9,
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
        text: "本月"
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
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = true;
    $.__views.__alloyId36 = Alloy.createController("bottom", {
        id: "__alloyId36",
        __parentSymbol: $.__views.monthList
    });
    $.__views.__alloyId36.setParent($.__views.monthList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.monthList.add(actInd);
    var offset = 0;
    var isHide = false;
    var pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchMonth
    }).getView();
    $.table.headerPullView = pullView;
    __defers["$.__views.monthList!open!firstFetchMonth"] && $.__views.monthList.addEventListener("open", firstFetchMonth);
    __defers["$.__views.monthList!focus!preFetchMonth"] && $.__views.monthList.addEventListener("focus", preFetchMonth);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;