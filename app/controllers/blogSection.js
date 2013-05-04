var args = arguments[0] || {};
$.dayLabel.text = args.day.match(/[0-9]+$/)[0]
$.monthLabel.text = args.day.match(/^[0-9]+-[0-9]+/)[0].replace("-",".");
$.weekLabel.text = util.getWeek(args.day);
var items = args.feeds;
for(var i=0; i<items.length; i++){
	var row = Alloy.createController('blogRow', items[i]).getView();
	$.blogSection.add(row);
}
