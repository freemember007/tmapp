function Controller() {
    function hideNavBar(e) {
        if (e.contentOffset.y - offset > 10) {
            $.yearList.hideNavBar();
            offset = e.contentOffset.y;
        }
        if (e.contentOffset.y - offset < -10) {
            $.yearList.showNavBar();
            offset = e.contentOffset.y;
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
        backgroundColor: "black",
        title: "今年",
        id: "yearList"
    });
    $.addTopLevelView($.__views.yearList);
    fetchYear ? $.__views.yearList.addEventListener("open", fetchYear) : __defers["$.__views.yearList!open!fetchYear"] = !0;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "black",
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.yearList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.yearList.add(actInd);
    var offset = 0, pullView = Alloy.createController("pullView", {
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