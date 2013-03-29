function Controller() {
    function back() {
        $.yearDay.close({
            animated: !0
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.yearDay = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        id: "yearDay"
    });
    $.addTopLevelView($.__views.yearDay);
    $.__views.top = Ti.UI.createLabel({
        width: "100%",
        height: 47,
        top: 0,
        backgroundImage: "topBlank.png",
        text: "某天",
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
    $.__views.yearDay.add($.__views.top);
    $.__views.backButton = Ti.UI.createLabel({
        left: 10,
        top: 7,
        width: 56,
        height: 31,
        backgroundImage: "backBlank.png",
        text: "今年",
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
        id: "backButton"
    });
    $.__views.yearDay.add($.__views.backButton);
    back ? $.__views.backButton.addEventListener("click", back) : __defers["$.__views.backButton!click!back"] = !0;
    $.__views.imageContainer = Ti.UI.createView({
        layout: "horizontal",
        left: 5,
        top: 52,
        id: "imageContainer"
    });
    $.__views.yearDay.add($.__views.imageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, items = args;
    for (i = 0; i < items.length; i++) {
        var url = items[i].url, image = Ti.UI.createImageView({
            left: 0,
            top: 0,
            image: url,
            index: i
        });
        image.image = image.toBlob().imageAsThumbnail(100);
        image.addEventListener("click", function(e) {
            var scrollImage = Alloy.createController("scrollImage", {
                index: e.source.index,
                items: items
            }).getView();
            Alloy.Globals.tab4.open(scrollImage);
        });
        $.imageContainer.add(image);
    }
    $.yearDay.title = "某天";
    Alloy.Globals.tab4.open($.yearDay);
    __defers["$.__views.backButton!click!back"] && $.__views.backButton.addEventListener("click", back);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;