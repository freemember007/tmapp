var args = arguments[0] || {};
$.label.text = args.day + "日" ;
var items = args.feeds;
for(var i=0; i<items.length; i++){
	if(i<3){
		var image = Ti.UI.createImageView({
			image:items[i].url,
			width:75*Alloy.CFG.GUI_widthScale,height:75*Alloy.CFG.GUI_widthScale,
		})
		image.image = image.toBlob().imageAsThumbnail(150*Alloy.CFG.GUI_widthScale); //为兼容iphone4，分辨是位置的2倍
		$.imageContainer.add(image);
	}
	if(i==4){
		var view = Ti.UI.createView({
		})
		var image = Ti.UI.createImageView({
			image:items[i].url,
			width:75*Alloy.CFG.GUI_widthScale,height:75*Alloy.CFG.GUI_widthScale,
		})
		var label = Ti.UI.createLabel({
			width:75*Alloy.CFG.GUI_widthScale,height:75*Alloy.CFG.GUI_widthScale,
			backgroundColor:"black",
			opacity:0.5,
		})
		var arrow = Ti.UI.createImageView({
			width:75,height:45,top:0,
			image:"arrow.png",
		})
		var text = Ti.UI.createLabel({
			width:75*Alloy.CFG.GUI_widthScale,height:30*Alloy.CFG.GUI_widthScale,bottom:10,
			font:{fontSize:12},
			color:"#fff",
			shadowColor:"#000",
			shadowOffset: {x:1,y:1},
			textAlign:"center",
			text: "共" + items.length + "张"
		})
		image.image = image.toBlob().imageAsThumbnail(120*Alloy.CFG.GUI_widthScale);
		view.add(image);
		view.add(label);
		view.add(arrow);
		view.add(text);
		$.imageContainer.add(view);
	}
}

function showDay(){
	var monthDay = Alloy.createController('monthDay', items).getView();
	monthDay.children[0].text = args.day + "日" ;
	Alloy.Globals.tab2.open(monthDay);
}