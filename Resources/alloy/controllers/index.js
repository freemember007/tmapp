function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: Alloy.Globals.GUI_bkC,
        navBarHidden: true,
        borderRadius: 3,
        backgroundImage: "Default.png",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.actInd = Ti.UI.createActivityIndicator({
        bottom: 90,
        height: 50,
        width: 50,
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK,
        id: "actInd"
    });
    $.__views.index.add($.__views.actInd);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    $.actInd.show();
    Alloy.Globals.index = $.index;
    setTimeout(function() {
        Alloy.createController("tabGroup").getView();
    }, 500);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;