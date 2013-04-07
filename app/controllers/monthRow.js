var args = arguments[0] || {};
$.label.text = args.day + "日" ;
var items = args.feeds;
for(i=0; i<items.length; i++){
	if(i<3){
		var image = Ti.UI.createImageView({
			image:items[i].url,
		})
		image.image = image.toBlob().imageAsThumbnail(75);
		$.imageContainer.add(image);
	}
	if(i==4){
		var view = Ti.UI.createView({
		})
		var image = Ti.UI.createImageView({
			image:items[i].url,
		})
		var label = Ti.UI.createLabel({
			width:75,height:75,
			backgroundColor:"black",
			opacity:0.5,
		})
		var arrow = Ti.UI.createImageView({
			width:75,height:45,top:0,
			image:"arrow.png",
		})
		var text = Ti.UI.createLabel({
			width:75,height:30,bottom:10,
			font:{fontSize:12},
			color:"#fff",
			shadowColor:"#000",
			shadowOffset: {x:1,y:1},
			textAlign:"center",
			text: "共" + items.length + "张"
		})
		image.image = image.toBlob().imageAsThumbnail(75);
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