function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.yearDay = Ti.UI.createWindow({
        backgroundColor: "black",
        id: "yearDay"
    });
    $.addTopLevelView($.__views.yearDay);
    $.__views.label = Ti.UI.createLabel({
        height: 30,
        backgroundColor: "black",
        opacity: 0.8,
        color: "white",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "label"
    });
    $.__views.yearDay.add($.__views.label);
    $.__views.imageContainer = Ti.UI.createView({
        layout: "horizontal",
        left: 5,
        top: 5,
        id: "imageContainer"
    });
    $.__views.yearDay.add($.__views.imageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, items = args;
    for (i = 0; i < items.length; i++) {
        var url = items[i].url, image = Ti.UI.createImageView({
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
    $.yearDay.showNavBar();
    Alloy.Globals.tab4.open($.yearDay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;