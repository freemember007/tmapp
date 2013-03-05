function Controller() {
    require("alloy/controllers/login").apply(this, Array.prototype.slice.call(arguments));
    $model = arguments[0] ? arguments[0].$model : null;
    var $ = this, exports = {}, __defers = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    exports.baseController = "login";
    $.submitButton.title = "注册";
    $.loginTitle.text = "注册一个时光帐号:";
    $.container.remove($.registerTips);
    $.registerInputOne.show();
    $.registerInputTwo.show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._, $model;

module.exports = Controller;