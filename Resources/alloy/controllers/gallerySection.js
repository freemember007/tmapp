function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.gallerySection = Ti.UI.createTableViewSection({
        id: "gallerySection"
    });
    $.addTopLevelView($.__views.gallerySection);
    $.__views.headerLabel = Ti.UI.createLabel({
        height: 30,
        backgroundColor: "black",
        opacity: 0.8,
        color: "white",
        font: {
            fontSize: 20,
            fontWeight: "bold"
        },
        textAlign: "center",
        id: "headerLabel"
    });
    $.__views.gallerySection.headerView = $.__views.headerLabel;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var args = arguments[0] || {};
    $.headerLabel.text = args.month + "月";
    var items = args.feeds;
    for (key in items) {
        var arg = {
            day: key,
            feeds: items[key]
        }, row = Alloy.createController("galleryRow", arg).getView();
        $.gallerySection.add(row);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;