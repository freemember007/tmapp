function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "actInd";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.actInd = Ti.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        message: "加载中...",
        color: Alloy.Globals.GUI_FC,
        font: {
            fontSize: 14
        },
        id: "actInd"
    });
    $.__views.actInd && $.addTopLevelView($.__views.actInd);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.actInd.show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;