function isiOS4Plus() {
    var version = Titanium.Platform.version.split(".");
    var major = parseInt(version[0]);
    if (major >= 4) return true;
    return false;
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var util = require("util");

Alloy.Globals.sitePath = "http://localhost:3000/";

Alloy.Globals.GUI_bkC = "#f3f3f3";

Alloy.Globals.GUI_FC = "#000";

Alloy.CFG.GUI_widthScale = "iphone" == Ti.Platform.osname ? 1 : 2.4;

Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

Alloy.Globals.menu = Alloy.createController("menu").getView();

Alloy.Globals.sharetome = Alloy.createController("sharetome").getView();

Alloy.Globals.currentWindow = void 0;

Alloy.Globals.slide = false;

setTimeout(function() {
    Ti.App.Properties.setString("isInForeground", "true");
}, 5e3);

Ti.App.addEventListener("resumed", function() {
    Ti.App.Properties.setString("isInForeground", "true");
});

Ti.App.addEventListener("pause", function() {
    Ti.App.Properties.setString("isInForeground", "false");
});

if (isiOS4Plus()) {
    var service;
    Ti.App.addEventListener("resumed", function() {
        Ti.API.info("app has resumed from the background");
        if (null != service) {
            service.stop();
            service.unregister();
        }
    });
    Ti.App.addEventListener("pause", function() {
        Ti.API.info("app was paused from the foreground");
        service = Ti.App.iOS.registerBackgroundService({
            url: "bg.js"
        });
        Ti.API.info("registered background service = " + service);
    });
}

Alloy.createController("index");