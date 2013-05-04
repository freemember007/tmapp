$.index.open();
$.actInd.show();
Alloy.Globals.index = $.index
setTimeout(function(){Alloy.createController('tabGroup').getView()},500)