function Controller() {
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10) {
            $.monthList.hideNavBar();
            offset = e.contentOffset.y;
        }
        if (e.contentOffset.y - offset < -10) {
            $.monthList.showNavBar();
            offset = e.contentOffset.y;
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
        barImage: "navBar.png",
        title: "本月",
        id: "monthList"
    });
    $.addTopLevelView($.__views.monthList);
    fetchMonth ? $.__views.monthList.addEventListener("open", fetchMonth) : __defers["$.__views.monthList!open!fetchMonth"] = !0;
    $.__views.__alloyId28 = Ti.UI.createLabel({
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
        text: ".: 本月 :.",
        id: "__alloyId28"
    });
    $.__views.monthList.titleControl = $.__views.__alloyId28;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.monthList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.monthList.add(actInd);
    var offset = 0, pullView = Alloy.createController("pullView", {
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