function Controller() {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.blogList = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        title: "最近时光",
        id: "blogList"
    });
    $.addTopLevelView($.__views.blogList);
    util.fetchFeed ? $.__views.blogList.addEventListener("open", util.fetchFeed) : __defers["$.__views.blogList!open!util.fetchFeed"] = !0;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.blogList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Globals.table = $.table;
    var offset = 0;
    __defers["$.__views.blogList!open!util.fetchFeed"] && $.__views.blogList.addEventListener("open", util.fetchFeed);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;