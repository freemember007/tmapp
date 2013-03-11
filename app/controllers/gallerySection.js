var args = arguments[0] || {};
$.headerLabel.text = args.month + "月" ;
var items = args.feeds;


for(key in items){
	var arg = {
        day: key,
        feeds: items[key]
	};
	var row = Alloy.createController('galleryRow', arg).getView();
	$.gallerySection.add(row);
};