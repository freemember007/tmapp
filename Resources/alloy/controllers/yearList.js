function Controller() {
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
    function fetchYear() {
        util.send("api/fetchYear", {
            email: "freemem@163.com",
            password: "666666"
        }, function(res) {
            var data = JSON.parse(res);
            if (data.type == "success") {
                items = data.items;
                var tabledata = [];
                for (key in items) {
                    var arg = {
                        month: key,
                        feeds: items[key]
                    }, section = Alloy.createController("yearSection", arg).getView();
                    tabledata.push(section);
                }
                $.table.setData(tabledata);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
            $.yearList.remove(actInd);
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.yearList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        title: "今年",
        id: "yearList"
    });
    $.addTopLevelView($.__views.yearList);
    fetchYear ? $.__views.yearList.addEventListener("open", fetchYear) : __defers["$.__views.yearList!open!fetchYear"] = !0;
    $.__views.top = Ti.UI.createView({
        width: "100%",
        height: 47,
        top: 0,
        backgroundImage: "top4.png",
        zIndex: 1,
        id: "top"
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
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    $.__views.__alloyId27 = Alloy.createController("bottom", {
        id: "__alloyId27"
    });
    $.__views.__alloyId27.setParent($.__views.yearList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.yearList.add(actInd);
    var offset = 0, isHide = !1, pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchYear
    }).getView();
    $.table.headerPullView = pullView;
    __defers["$.__views.yearList!open!fetchYear"] && $.__views.yearList.addEventListener("open", fetchYear);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;