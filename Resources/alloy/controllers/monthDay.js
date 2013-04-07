function Controller() {
    function back() {
        $.monthDay.close({
            animated: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.monthDay = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        id: "monthDay"
    });
    $.addTopLevelView($.__views.monthDay);
    $.__views.top = Ti.UI.createLabel({
        width: "100%",
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
        top: 7,
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
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = !0;
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
    for (i = 0; i < items.length; i++) {
        var url = items[i].url, image = Ti.UI.createImageView({
            left: 0,
            top: 0,
            image: url,
            index: i,
            created_at: items[i].created_at
        });
        image.image = image.toBlob().imageAsThumbnail(101);
        image.addEventListener("click", function(e) {
            var scrollImage = Alloy.createController("scrollImage", {
                index: e.source.index,
                items: items
            }).getView(), hour = e.source.created_at.match(/[0-9]+:[0-9]+/)[0];
            scrollImage.children[0].text = util.formatTime(parseInt(hour)) + " " + hour;
            scrollImage.children[1].text = $.top.text;
            Alloy.Globals.tab2.open(scrollImage);
        });
        $.imageContainer.add(image);
    }
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;