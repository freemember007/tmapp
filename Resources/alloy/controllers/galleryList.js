function Controller() {
    function hideNavBar(e) {
        if (e.contentOffset.y > offset) {
            $.galleryList.hideNavBar();
            offset = e.contentOffset.y;
        }
        if (e.contentOffset.y < offset) {
            $.galleryList.showNavBar();
            offset = e.contentOffset.y;
        }
        e.contentOffset.y <= 0 && (offset = 0);
        e.contentOffset.y >= e.contentSize.height - e.size.height && (offset = e.contentSize.height - e.size.height);
    }
    function fetchGallery() {
        util.send("api/fetchGallery", {
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
                    }, section = Alloy.createController("gallerySection", arg).getView();
                    tabledata.push(section);
                }
                $.table.setData(tabledata);
            } else data.type == "fail" ? alert("用户名或密码错误！") : alert("unknown error");
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.galleryList = Ti.UI.createWindow({
        backgroundColor: "black",
        title: "今年",
        id: "galleryList"
    });
    $.addTopLevelView($.__views.galleryList);
    fetchGallery ? $.__views.galleryList.addEventListener("open", fetchGallery) : __defers["$.__views.galleryList!open!fetchGallery"] = !0;
    $.__views.table = Ti.UI.createTableView({
        backgroundColor: "black",
        separatorColor: "transparent",
        id: "table"
    });
    $.__views.galleryList.add($.__views.table);
    hideNavBar ? $.__views.table.addEventListener("scroll", hideNavBar) : __defers["$.__views.table!scroll!hideNavBar"] = !0;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var offset = 0;
    __defers["$.__views.galleryList!open!fetchGallery"] && $.__views.galleryList.addEventListener("open", fetchGallery);
    __defers["$.__views.table!scroll!hideNavBar"] && $.__views.table.addEventListener("scroll", hideNavBar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;