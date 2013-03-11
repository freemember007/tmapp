var args = arguments[0] || {};
//$.label.text = args.day + "日" ;
var items = args;

for(i=0; i<items.length; i++){
	var url = items[i].url
	var image = Ti.UI.createImageView({
		image: url,
		url:url,
	})
	image.image = image.toBlob().imageAsThumbnail(100);
	image.addEventListener("click",function(e){
		Alloy.createController('zoomImage', e.source.url).getView();
	})
	$.imageContainer.add(image);
}
//Alloy.Globals.tab3.window = $.galleryDay; //貌似不起作用，下面的写法才生效。

$.galleryDay.title = "某天"; //貌似设置Ti.UI.currentWindow或Ti.UI.getCurrentWindow()的值都不行，之前就碰到过。
$.galleryDay.showNavBar();
Alloy.Globals.tab3.open($.galleryDay);

