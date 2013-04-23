function isiOS4Plus() {
    var version = Titanium.Platform.version.split("."), major = parseInt(version[0]);
    return major >= 4 ? !0 : !1;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone, util = require("util");

Alloy.Globals.sitePath = "http://localhost:3000/";

Alloy.Globals.GUI_bkC = "#f3f3f3";

Alloy.Globals.GUI_FC = "#000";

Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

Alloy.Globals.menu = Alloy.createController("menu").getView();

Alloy.Globals.sharetome = Alloy.createController("sharetome").getView();

Alloy.Globals.currentWindow = undefined;

Alloy.Globals.slide = !1;

setTimeout(function() {
    Ti.App.Properties.setString("isInForeground", "true");
}, 5000);

Ti.App.addEventListener("resumed", function() {
    Ti.App.Properties.setString("isInForeground", "true");
});

Ti.App.addEventListener("pause", function() {
    Ti.App.Properties.setString("isInForeground", "false");
});

if (isiOS4Plus()) {
    var service;
    Ti.App.addEventListener("resumed", function(e) {
        Ti.API.info("app has resumed from the background");
        if (service != null) {
            service.stop();
            service.unregister();
        }
    });
    Ti.App.addEventListener("pause", function(e) {
        Ti.API.info("app was paused from the foreground");
        service = Ti.App.iOS.registerBackgroundService({
            url: "bg.js"
        });
        Ti.API.info("registered background service = " + service);
    });
}

Alloy.createController("index");