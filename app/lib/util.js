var sitePath = 'http://184.82.117.60/';

exports.send = function(url, data, onload){
	var networkType = Ti.Network.getNetworkType();
	if(networkType == Ti.Network.NETWORK_NONE){
		alert('无可用网络!');
		return;
	}
	var xhr = Titanium.Network.createHTTPClient();
    xhr.onload = function(e){
    	if (this.status != 200) {
	        alert(e);
	        alert(this.status);
	    }else{
    		onload(this.responseText);
	    }
    };
    xhr.onerror = function(e){
        alert(e.error);
    };
    xhr.open('POST',sitePath + url);
    xhr.send(data);
}

exports.publishText = function(content){
	send('api/publish_blog', {content: content, id:Titanium.App.Properties.getString("userid")}, function(res){
		var data = JSON.parse(res);
		mvc.view.partial.blogList.addBlog(data.item);
		mvc.view.mainList.reload();
	})
}


exports.uploadPhoto = function(){
	Ti.Media.openPhotoGallery({
		success: function(e){
			mvc.view.publishPhoto.show(computeImageSize(e.media), false);
		},
		error: function(){
			alert("error");
		}
	});
}

exports.uploadCameraPhoto = function(){
	Ti.Media.showCamera({
		success: function(e){
	        Ti.Media.hideCamera();
	        mvc.view.publishPhoto.show(computeImageSize(e.media), true);
		},
		error: function(){
			alert("error");
		},
		autohide:false
	});
}