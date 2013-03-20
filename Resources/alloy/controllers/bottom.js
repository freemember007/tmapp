function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    $.__views.bottom = Ti.UI.createView({
        backgroundColor: "red",
        height: 55,
        width: "100%",
        bottom: 0,
        zIndex: 1,
        id: "bottom"
    });
    $.addTopLevelView($.__views.bottom);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;