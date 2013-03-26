var args = arguments[0] || {};
$.image.image = args.url;
if(args.content == ""){
	$.label.height = 11
}else{
	$.label.text = args.content;
}

function openZoomImage(){
	Alloy.createController('zoomImage', $.image.image).getView();
}