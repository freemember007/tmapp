var args = arguments[0] || {};
var items = args;

for(i=0; i<items.length; i++){
	var url = items[i].url
	var image = Ti.UI.createImageView({
		image: url,
		index: i, //自定义属性
	})
	image.image = image.toBlob().imageAsThumbnail(100);
	image.addEventListener("click",function(e){
		var scrollImage = Alloy.createController('scrollImage', {index:e.source.index,items:items}).getView();
		Alloy.Globals.tab2.open(scrollImage);
	})
	$.imageContainer.add(image);
}

$.monthDay.title = "某天"; 
$.monthDay.showNavBar();
Alloy.Globals.tab2.open($.monthDay);