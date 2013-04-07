var sitePath = ENV_DEV?"http://localhost:3000/":"http://184.82.117.60/";

exports.computeImageSize = function(originImg){
	var imagefactory = require('ti.imagefactory');
	var w = originImg.width;
	var h = originImg.height;
	var width = 600;
	var middleImg = imagefactory.imageAsResized(originImg, {width:width, height:h*(width/w)});
	middleImg = imagefactory.compress(middleImg, 0.65); //本来上面的函数有压缩功能，但在iPhone下貌似有bug，必须与上面分开写才行，否则格式为png.
	var thumb = imagefactory.imageAsResized(originImg, {width:120, height:h*(120/w)});
	thumb = imagefactory.compress(thumb, 0.65);
	return {
		middleImg: {
			src: middleImg,
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
        alert(e.error + "测试");
    };
    xhr.open('POST',sitePath + url);
    xhr.send(data);
}

exports.get = function(url, onload){
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
        alert(e.error + "测试");
    };
    xhr.open('get',sitePath + url);
    xhr.send();
}

exports.formatTime = function(hour){
	var personalTime = "今天";

	if (hour < 9){
		personalTime = "清晨"
	}
	else if (hour < 12){
		personalTime = "上午"
	}
	else if (hour < 12){
		personalTime = "上午"
	}
	else if (hour < 14){
		personalTime = "中午"
	}
	else if (hour < 18){
		personalTime = "下午"
	}
	else if (hour < 21){
		personalTime = "黄昏"
	}
	else {
		personalTime = "深夜"
	}
	return personalTime;
}

exports.getWeek = function(date){
	var arr = new Array();
    arr = date.split('-'); //日期为输入日期，格式为 2013-3-10
    var newDate = new Date(arr[0],parseInt(arr[1]-1),arr[2]); 
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var week = weekArray[newDate.getDay()];  
   	return week;
}
