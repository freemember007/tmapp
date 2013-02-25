function uploadCameraPhoto(){
	Ti.Media.openPhotoGallery({
		success: function(e){
			$.image.image= e.media;
		},
		error: function(){
			alert("error");
		}
	});
}