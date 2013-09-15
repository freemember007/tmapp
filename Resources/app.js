var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var util = require("util");

Alloy.Globals.sitePath = "http://tmweb.ap01.aws.af.cm/";

Alloy.Globals.GUI_bkC = "#f3f3f3";

Alloy.Globals.GUI_FC = "#000";

Alloy.CFG.GUI_widthScale = 2.4;

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

Alloy.createController("index");