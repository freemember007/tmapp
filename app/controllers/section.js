var args = arguments[0] || {};
$.headerLabel.text = " " + args.day;
var items = args.feeds;
for(i=0; i<items.length; i++){
	var row = Alloy.createController('row', items[i]).getView();
	$.section.add(row);
}