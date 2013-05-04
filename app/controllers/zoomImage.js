var args = arguments[0] || {};
$.image.image = args;

$.zoomImage.open();

function closeWin(){
	$.zoomImage.close();
}

function zoom(){
	($.scrollView.zoomScale <= 1.0) ? $.scrollView.setZoomScale(2, {animated:true}) : $.scrollView.setZoomScale(1, {animated:true});
}