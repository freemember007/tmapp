var args = arguments[0] || {};
$.image.image = args.url;

if(args.content == ""){
	$.row.remove($.label); //或者：$.label.height = 0 
}else{
	$.label.text = "  " + args.content;
}

function openZoomImage(){
	var image = Alloy.createController('zoomImage', $.image.image).getView();
}