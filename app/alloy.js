// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
var util = require("util");
var APNS = require('APNS');
APNS.register(); //注意：如果不每次启动都注册，虽可收到push，但callback不会起作用。

//定义GUI规格
Alloy.Globals.sitePath = ENV_DEV?"http://localhost:3000/":"http://184.82.117.60/";
Alloy.Globals.GUI_bkC = "#f3f3f3";
Alloy.Globals.GUI_FC = "#000";
Alloy.Globals.menu = Alloy.createController('menu').getView();
Alloy.Globals.sharetome = Alloy.createController('sharetome').getView();
Alloy.Globals.slide = false;
if (OS_IOS){
	Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;
}