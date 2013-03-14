var args = arguments[0] || {};
var table = args.table;
var fetch = args.fetch;


var pulling = false;
var reloading = false;
function formatDate(){
	var date = new Date();
	var datestr = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12){
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' 下午';
	}
	else{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' 上午';
	}
	return datestr;
}

function beginReloading(){
	fetch();
	setTimeout(endReloading,2000);
}

function endReloading(){
	// when you're done, just reset
	table.setContentInsets({top:0},{animated:true});
	reloading = false;
	$.lastUpdatedLabel.text = "上次更新: "+formatDate();
	$.statusLabel.text = "下拉刷新...";
	$.actInd.hide();
	$.arrow.show();
}

table.addEventListener('scroll',function(e){
	var offset = e.contentOffset.y;
	if (offset < -65.0 && !pulling && !reloading){
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		$.arrow.animate({transform:t,duration:180});
		$.statusLabel.text = "释放刷新...";
	}
	else if((offset > -65.0 && offset < 0 ) && pulling && !reloading){
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		$.arrow.animate({transform:t,duration:180});
		$.statusLabel.text = "下拉刷新...";
	}    
});

table.addEventListener('dragEnd', function(){	
	if(pulling && !reloading){
		reloading = true;
		pulling = false;
		$.arrow.hide();
		$.actInd.show();
		$.statusLabel.text = "加载中...";
		table.setContentInsets({top:60},{animated:true});
		table.scrollToTop(-60,true);
		$.arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
	}
});