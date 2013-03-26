var args = arguments[0] || {};
$.headerLabel.text = " " + args.day.match(/[0-9]+$/)[0];
var items = args.feeds;
for(i=0; i<items.length; i++){
	var row = Alloy.createController('blogRow', items[i]).getView();
	$.blogSection.add(row);
}