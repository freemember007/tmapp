function Controller() {
    function back() {
        $.monthDay.close({
            animated: true
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "monthDay";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.monthDay = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        id: "monthDay"
    });
    $.__views.monthDay && $.addTopLevelView($.__views.monthDay);
    $.__views.top = Ti.UI.createLabel({
        width: Ti.Platform.displayCaps.platformWidth,
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
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
        id: "top"
    });
    $.__views.monthDay.add($.__views.top);
    $.__views.backButton = Ti.UI.createLabel({
        left: 10,
        top: 8,
        width: 56,
        height: 31,
        backgroundImage: "backBlank.png",
        color: "#555",
        shadowColor: "#fff",
        shadowOffset: {
            x: 1,
            y: 1
        },
        font: {
            fontSize: 14,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "backButton",
        text: "本月"
    });
    $.__views.monthDay.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = true;
    $.__views.imageContainer = Ti.UI.createView({
        layout: "horizontal",
        left: 5,
        top: 52,
        id: "imageContainer"
    });
    $.__views.monthDay.add($.__views.imageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var items = arguments[0] || {};
    for (var i = 0; items.length > i; i++) {
        var url = Alloy.Globals.sitePath + items[i].url;
        var image = Ti.UI.createImageView({
            left: 2,
            bottom: 2,
            width: 101 * Alloy.CFG.GUI_widthScale,
            height: 101 * Alloy.CFG.GUI_widthScale,
            image: url,
            index: i,
            created_at: items[i].created_at
        });
        image.image = image.toBlob().imageAsThumbnail(202 * Alloy.CFG.GUI_widthScale);
        image.addEventListener("click", function(e) {
            var scrollImage = Alloy.createController("scrollImage", {
                index: e.source.index,
                items: items
            }).getView();
            var hour = e.source.created_at.match(/[0-9]+:[0-9]+/)[0];
            scrollImage.children[0].text = util.formatTime(parseInt(hour)) + " " + hour;
            scrollImage.children[1].text = $.top.text;
            Alloy.Globals.tab2.open(scrollImage);
        });
        $.imageContainer.add(image);
    }
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;