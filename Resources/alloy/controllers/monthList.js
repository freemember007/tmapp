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
    function fetchMonth() {
        util.send("api/fetchMonth", {
            email: "freemem@163.com",
            password: "666666"
        }, function(res) {
            var data = JSON.parse(res);
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
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
            $.monthList.remove(actInd);
        });
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
    fetchMonth ? $.__views.monthList.addEventListener("open", fetchMonth) : __defers["$.__views.monthList!open!fetchMonth"] = !0;
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
    $.__views.__alloyId22 = Alloy.createController("bottom", {
        id: "__alloyId22"
    });
    $.__views.__alloyId22.setParent($.__views.monthList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.monthList.add(actInd);
    var offset = 0, isHide = !1, pullView = Alloy.createController("pullView", {
        table: $.table,
        fetch: fetchMonth
    }).getView();
    $.table.headerPullView = pullView;
    __defers["$.__views.monthList!open!fetchMonth"] && $.__views.monthList.addEventListener("open", fetchMonth);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;