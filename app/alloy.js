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


//定义GUI规格
Alloy.Globals.GUI_bkC = "#ddd"


Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;