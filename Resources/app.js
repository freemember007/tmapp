var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone, util = require("util"), APNS = require("APNS");

APNS.register();

Alloy.Globals.sitePath = "http://184.82.117.60/";

Alloy.Globals.GUI_bkC = "#f3f3f3";

Alloy.Globals.GUI_FC = "#000";

Alloy.Globals.menu = Alloy.createController("menu").getView();

Alloy.Globals.sharetome = Alloy.createController("sharetome").getView();

Alloy.Globals.slide = !1;

Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

Alloy.createController("index");