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
			opacity:0.6,
			font:{fontSize:12,fontWeight:'bold',fontFamily:'迷你简南宫' },
			color:"white",
			textAlign:"center",
			text: "共" + items.length + "张 »"
		})
		//label.text = 
		image.image = image.toBlob().imageAsThumbnail(75);
		view.add(image);
		view.add(label)
		$.imageContainer.add(view);
	}
}

function showDay(){
	Alloy.createController('monthDay', items).getView();
}