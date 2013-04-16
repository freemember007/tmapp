function Controller() {
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            $.friends.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            $.table.scrollable = !0;
            Alloy.Globals.slide = !1;
        } else {
            $.friends.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            $.table.scrollable = !1;
            Alloy.Globals.slide = !0;
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.friends = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        id: "friends"
    });
    $.addTopLevelView($.__views.friends);
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        left: 0,
        top: 0,
        backgroundImage: "top5.png",
        color: "#555",
        opacity: 0.9,
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
        text: "自己人"
    });
    $.__views.friends.add($.__views.top);
    $.__views.menuButton = Ti.UI.createLabel({
        left: 10,
        top: 9,
        width: 32,
        height: 27,
        backgroundImage: "menuIcon.png",
        zIndex: 2,
        id: "menuButton"
    });
    $.__views.friends.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = !0;
    $.__views.row = Ti.UI.createTableViewRow({
        id: "row"
    });
    var __alloyId12 = [];
    __alloyId12.push($.__views.row);
    $.__views.image = Ti.UI.createImageView({
        preventDefaultImage: !0,
        id: "image"
    });
    $.__views.row.add($.__views.image);
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        top: 44,
        width: 320,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 49,
        data: __alloyId12,
        id: "table"
    });
    $.__views.friends.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;