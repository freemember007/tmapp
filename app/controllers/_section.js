var args = arguments[0] || {};
$.headerLabel.text = " " + args.day;
var items = args.feeds;
for(i=0; i<items.length; i++){
	var row = Alloy.createController('_row', items[i]).getView();
	$._section.add(row);
}