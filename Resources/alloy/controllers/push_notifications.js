function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "push_notifications";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    exports.destroy = function() {};
    _.extend($, $.__views);
    var apns = function() {
        Titanium.Network.registerForPushNotifications({
            types: [ Titanium.Network.NOTIFICATION_TYPE_BADGE, Titanium.Network.NOTIFICATION_TYPE_ALERT ],
            success: function(e) {
                var deviceToken = e.deviceToken;
                Ti.API.info("Push notification device token is: " + deviceToken);
                Ti.API.info("Push notification types: " + Titanium.Network.remoteNotificationTypes);
                Ti.API.info("Push notification enabled: " + Titanium.Network.remoteNotificationsEnabled);
                var http = Ti.Network.createHTTPClient();
                http.onload = function() {};
                http.open("GET", "https://gateway.sandbox.push.apple.com:2195?deviceuid=" + escape(Titanium.Platform.id) + "&devicetoken=" + escape(e.deviceToken));
                http.send();
            },
            error: function(e) {
                Ti.API.info("Error during registration: " + e.error);
            },
            callback: function(e) {
                Titanium.Media.vibrate();
                var data = JSON.parse(e.data);
                var badge = data.badge;
                badge > 0 && (Titanium.UI.iPhone.appBadge = badge);
                var message = data.message;
                if ("" != message) {
                    var my_alert = Ti.UI.createAlertDialog({
                        title: "",
                        message: message
                    });
                    my_alert.show();
                }
            }
        });
    };
    exports = {
        apns: apns
    };
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;