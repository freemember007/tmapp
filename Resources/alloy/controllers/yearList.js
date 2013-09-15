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
    function firstFetchYear() {
        if (Ti.App.Properties.hasProperty("yearData") && "{}" != Ti.App.Properties.getString("yearData")) {
            var items = JSON.parse(Ti.App.Properties.getString("yearData"));
            var tabledata = [];
            for (key in items) {
                var arg = {
                    month: key,
                    feeds: items[key]
                };
                var section = Alloy.createController("yearSection", arg).getView();
                tabledata.push(section);
            }
            $.table.setData(tabledata);
            $.yearList.remove(actInd);
        } else fetchYear();
    }
    function fetchYear() {
        util.send("api/fetchYear", {
            email: Ti.App.Properties.getString("email"),
            password: Ti.App.Properties.getString("password")
        }, function(res) {
            var data = JSON.parse(res);
            $.yearList.remove(actInd);
            if ("success" == data.type) {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        month: key,
                        feeds: items[key]
                    };
                    var section = Alloy.createController("yearSection", arg).getView();
                    tabledata.push(section);
                }
                $.table.setData(tabledata);
                Ti.App.Properties.setString("yearData", JSON.stringify(items));
            } else "fail" == data.type ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    function preFetchYear() {
        Ti.App.Properties.hasProperty("yearData") && "{}" != Ti.App.Properties.getString("yearData") || fetchYear();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "yearList";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.yearList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        tabBarHidden: true,
        title: "今年",
        id: "yearList"
    });
    $.__views.yearList && $.addTopLevelView($.__views.yearList);
    firstFetchYear ? $.__views.yearList.addEventListener("open", firstFetchYear) : __defers["$.__views.yearList!open!firstFetchYear"] = true;
    preFetchYear ? $.__views.yearList.addEventListener("focus", preFetchYear) : __defers["$.__views.yearList!focus!preFetchYear"] = true;
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
        text: "今年"
    });
    $.__views.yearList.add($.__views.top);
    $.__views.table = Ti.UI.createTableView({
        top: 44,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 49,
        id: "table"
    });
    $.__views.yearList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = true;
    $.__views.__alloyId69 = Alloy.createController("bottom", {
        id: "__alloyId69",
        __parentSymbol: $.__views.yearList
    });
    $.__views.__alloyId69.setParent($.__views.yearList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.yearList.add(actInd);
    var offset = 0;
    var isHide = false;
    var pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchYear
    }).getView();
    $.table.headerPullView = pullView;
    __defers["$.__views.yearList!open!firstFetchYear"] && $.__views.yearList.addEventListener("open", firstFetchYear);
    __defers["$.__views.yearList!focus!preFetchYear"] && $.__views.yearList.addEventListener("focus", preFetchYear);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;