var args = arguments[0] || {};

for(key in args){
	var view = Ti.UI.createView({
		width:105,height:105,
		left:1, bottom:1,
		
	})
	var image = Ti.UI.createImageView({
		image:args[key][0].url,
		date:key + "日", //自定义属性，注意这个是date，下面是data，别搞错了。
		data:args[key], //自定义属性，为传递数据用
	})
	image.image = image.toBlob().imageAsThumbnail(105);
	var label1 = Ti.UI.createLabel({
		bottom: 5, left: 10,
		font: {fontSize:12},
		color: "#fff",
		shadowColor:"black",
		shadowOffset: {x:1,y:1},
		textAlign:"left",
		opacity:0.9,
		text: key + "日",
	});
	var label2 = Ti.UI.createLabel({
		bottom: 5, right: 10,
		font:{fontSize:12},
		color:"#fff",
		shadowColor:"black",
		shadowOffset: {x:1,y:1},
		textAlign:"right",
		opacity:0.9,
		text:args[key].length,
	});
	image.addEventListener("click",function(e){
		var yearDay = Alloy.createController('yearDay', e.source.data).getView(); //for循环产生的UI加事情监听时，貌似常规传递数据会导致数据同一，故采用曲折的办法。
		yearDay.children[0].text = e.source.date ;
		Alloy.Globals.tab4.open(yearDay);
	})
	view.add(image);
	view.add(label1);
	view.add(label2);
	$.row.add(view);
}