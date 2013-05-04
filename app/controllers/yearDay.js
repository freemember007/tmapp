var items = arguments[0] || {};

for(var i=0; i<items.length; i++){
	var url = items[i].url;
	var image = Ti.UI.createImageView({
		left:0,top:0, //重要，否则返回时位置会变
		width:101*Alloy.CFG.GUI_widthScale, height:101*Alloy.CFG.GUI_widthScale,
		image: url,
		index: i, //自定义属性
		created_at: items[i].created_at, //自定义属性
	});
	image.image = image.toBlob().imageAsThumbnail(202*Alloy.CFG.GUI_widthScale);
	image.addEventListener("click",function(e){
		var scrollImage = Alloy.createController('scrollImage', {index:e.source.index,items:items}).getView();
		var hour = e.source.created_at.match(/[0-9]+:[0-9]+/)[0];
		scrollImage.children[0].text = util.formatTime(parseInt(hour)) + " " + hour;
		scrollImage.children[1].text = $.top.text;
		Alloy.Globals.tab4.open(scrollImage);
	});
	$.imageContainer.add(image);
}

function back(){
	$.yearDay.close({animated:true});
}

