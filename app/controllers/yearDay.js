var args = arguments[0] || {};
//$.label.text = args.day + "日" ;
var items = args;

for(i=0; i<items.length; i++){
	var url = items[i].url
	var image = Ti.UI.createImageView({
		image: url,
		url:url, //自定义属性
	})
	image.image = image.toBlob().imageAsThumbnail(100);
	image.addEventListener("click",function(e){
		Alloy.createController('zoomImage', e.source.url).getView();
	})
	$.imageContainer.add(image);
}
//Alloy.Globals.tab4.window = $.yearDay; //貌似不起作用，下面的写法才生效。

$.yearDay.title = "某天"; //貌似设置Ti.UI.currentWindow或Ti.UI.getCurrentWindow()的值都不行，之前就碰到过。
$.yearDay.showNavBar();
Alloy.Globals.tab4.open($.yearDay);

