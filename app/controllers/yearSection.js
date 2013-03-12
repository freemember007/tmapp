var args = arguments[0] || {};
$.headerLabel.text = args.month + "月" ;
var items = args.feeds;

var row = Alloy.createController('yearRow', items).getView();
$.yearSection.add(row);
