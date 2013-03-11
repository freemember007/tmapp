function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.galleryDay = Ti.UI.createWindow({
        backgroundColor: "black",
        id: "galleryDay"
    });
    $.addTopLevelView($.__views.galleryDay);
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
    $.__views.galleryDay.add($.__views.label);
    $.__views.imageContainer = Ti.UI.createView({
        layout: "horizontal",
        left: 5,
        top: 5,
        id: "imageContainer"
    });
    $.__views.galleryDay.add($.__views.imageContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {}, items = args;
    for (i = 0; i < items.length; i++) {
        var url = items[i].url, image = Ti.UI.createImageView({
            image: url,
            url: url
        });
        image.image = image.toBlob().imageAsThumbnail(100);
        image.addEventListener("click", function(e) {
            Alloy.createController("zoomImage", e.source.url).getView();
        });
        $.imageContainer.add(image);
    }
    $.galleryDay.title = "某天";
    $.galleryDay.showNavBar();
    Alloy.Globals.tab3.open($.galleryDay);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;