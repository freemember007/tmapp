function Controller() {
    function tableScroolable() {
        $.table.scrollable = Alloy.Globals.slide ? !1 : !0;
    }
    function toggleMenu() {
        if (Alloy.Globals.slide) {
            $.sharetome.animate({
                left: 0
            });
            Alloy.Globals.menu.animate({
                left: -200
            });
            Alloy.Globals.slide = !1;
        } else {
            $.sharetome.animate({
                left: 200
            });
            Alloy.Globals.menu.animate({
                left: 0
            });
            Alloy.Globals.slide = !0;
        }
    }
    function fetchSharetome() {
        util.send("api/fetchSharetome", {
            id: Ti.App.Properties.getString("id")
        }, function(res) {
            var data = JSON.parse(res);
            $.sharetome.remove(actInd);
            if (data.type == "success") {
                users = data.users;
                items = data.items;
                var tabledata = [];
                for (var i = 0; i < users.length; i++) {
                    var hour = items[i].created_at.match(/[0-9]+:[0-9]+/)[0], row = Ti.UI.createTableViewRow({
                        selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE
                    }), avatar = Ti.UI.createImageView({
                        top: 10,
                        left: 10,
                        width: 32,
                        height: 32,
                        preventDefaultImage: !0,
                        image: users[i].avatar_url != null ? Alloy.Globals.sitePath + users[i].avatar_url : "avatar.png"
                    }), username = Ti.UI.createLabel({
                        top: 10,
                        left: 48,
                        height: 32,
                        text: users[i].domain_name,
                        color: "#555",
                        font: {
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        shadowColor: "#eee",
                        shadowOffset: {
                            x: 1,
                            y: 1
                        }
                    }), date = Ti.UI.createLabel({
                        top: 10,
                        right: 10,
                        height: 32,
                        text: util.formatTime(parseInt(hour)) + " " + hour,
                        color: "#888",
                        shadowColor: "#fff",
                        shadowOffset: {
                            x: 1,
                            y: 1
                        },
                        font: {
                            fontSize: 12,
                            fontWeight: "bold"
                        },
                        textAlign: "right"
                    }), imageContainer = Ti.UI.createLabel({
                        top: 45,
                        width: 308,
                        backgroundImage: "image_back.png",
                        layout: "vertical"
                    }), image = Ti.UI.createImageView({
                        top: 10,
                        width: 286,
                        preventDefaultImage: !0,
                        image: items[i].url
                    });
                    imageContainer.addEventListener("click", function(e) {
                        e.source.image !== undefined && Alloy.createController("zoomImage", e.source.image).getView();
                    });
                    var describe = Ti.UI.createLabel({
                        width: 286,
                        font: {
                            fontSize: 14,
                            fontWeight: "bold"
                        },
                        color: "#555",
                        shadowColor: "#eee",
                        shadowOffset: {
                            x: 1,
                            y: 1
                        }
                    });
                    if (items[i].content == "") describe.height = 11; else {
                        describe.text = items[i].content;
                        describe.height = 40;
                    }
                    row.add(avatar);
                    row.add(username);
                    row.add(date);
                    imageContainer.add(image);
                    imageContainer.add(describe);
                    row.add(imageContainer);
                    tabledata.push(row);
                }
                $.table.setData(tabledata);
                Ti.UI.iPhone.setAppBadge(0);
                var badge = Alloy.Models.instance("badge");
                badge.set({
                    visible: !1,
                    width: 0,
                    number: 0
                });
                badge.save();
                Ti.App.Properties.setString("sharetomeData", JSON.stringify(data));
            }
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.sharetome = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        tabBarHidden: !0,
        navBarHidden: !0,
        id: "sharetome"
    });
    $.addTopLevelView($.__views.sharetome);
    tableScroolable ? $.__views.sharetome.addEventListener("postlayout", tableScroolable) : __defers["$.__views.sharetome!postlayout!tableScroolable"] = !0;
    fetchSharetome ? $.__views.sharetome.addEventListener("open", fetchSharetome) : __defers["$.__views.sharetome!open!fetchSharetome"] = !0;
    $.__views.top = Ti.UI.createLabel({
        width: 320,
        height: 47,
        left: 0,
        top: 0,
        backgroundImage: "top5.png",
        color: "#555",
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
        text: "分享给我的"
    });
    $.__views.sharetome.add($.__views.top);
    $.__views.menuButton = Ti.UI.createLabel({
        left: 10,
        top: 9,
        width: 32,
        height: 27,
        backgroundImage: "menuIcon.png",
        zIndex: 1,
        id: "menuButton"
    });
    $.__views.sharetome.add($.__views.menuButton);
    toggleMenu ? $.__views.menuButton.addEventListener("click", toggleMenu) : __defers["$.__views.menuButton!click!toggleMenu"] = !0;
    $.__views.table = Ti.UI.createTableView({
        left: 0,
        top: 44,
        width: 320,
        backgroundColor: Alloy.Globals.GUI_bkC,
        separatorColor: "transparent",
        bottom: 0,
        id: "table"
    });
    $.__views.sharetome.add($.__views.table);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var actInd = Alloy.createController("actInd").getView();
    $.sharetome.add(actInd);
    __defers["$.__views.sharetome!postlayout!tableScroolable"] && $.__views.sharetome.addEventListener("postlayout", tableScroolable);
    __defers["$.__views.sharetome!open!fetchSharetome"] && $.__views.sharetome.addEventListener("open", fetchSharetome);
    __defers["$.__views.menuButton!click!toggleMenu"] && $.__views.menuButton.addEventListener("click", toggleMenu);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;