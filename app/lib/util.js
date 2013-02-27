var sitePath = 'http://184.82.117.60/';

if(OS_IOS){
	var jpgcompressor = require('com.sideshowcoder.jpgcompressor');
		jpgcompressor.setCompressSize(102400);
		jpgcompressor.setWorstCompressQuality(0.65);
		
	exports.computeImageSize = function(img){
		//貌似新版中这个swap已经不需要了。e.midea能直接返回图片的实际宽和高。
		var imageAsTaken = Ti.UI.createImageView({
			image: img,
			width: 'auto',
			height: 'auto'
		});
		imageAsTaken = imageAsTaken.toImage() //估计是接口变了，必须加这么一句，否则，后面w,h的值都为auto，以致发布时收到的img为非图片从而出错。
		//alert(imageAsTaken.width + " " + imageAsTaken.height);
		
		var w = imageAsTaken.width;
		var h = imageAsTaken.height;
		
		var width = 500;
		var cImage = jpgcompressor.scale(img, width, h*(width/w));
		var img = jpgcompressor.compress(cImage);
		
		var cImage = jpgcompressor.scale(img, 120, h*(120/w));
		var thumb = jpgcompressor.compress(cImage);
		
		return {
			img: {
				src: img,
				width: width,
				height: h*(width/w)
			},
			thumb: {
				src: thumb,
				width: 120,
				height: h*(120/w)
			}
		}
	};	
}

if(OS_ANDROID){
	var imagefactory = require('ti.imagefactory');
	exports.computeImageSize = function(img){
		var w = img.width;
		var h = img.height;
		var width = 600;
		var img = imagefactory.imageAsResized(img, {width:width, height:h*(width/w), quality:0.7});
		var thumb = imagefactory.imageAsResized(img, {width:120, height:h*(120/w), quality:0.7});
		return {
			img: {
				src: img,
				width: width,
				height: h*(width/w)
			},
			thumb: {
				src: thumb,
				width: 120,
				height: h*(120/w)
			}
		}
	};			
		
}

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