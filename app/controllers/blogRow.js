var args = arguments[0] || {};
$.image.image = args.url;
$.shareImg.itemID = args.id; // 自定义属性，为分享做准备。
if(Ti.Platform.osname == "iphone"){
	if($.image.toBlob().height <  $.image.toBlob().width){ // 注意：性能可能会受影响
		$.container.backgroundImage = "image_back_wide.png";
	}else{
		$.container.backgroundImage = "image_back_high.png";
	};
}else{
	$.container.backgroundImage = "image_back.png";
}

var hour = args.created_at.match(/[0-9]+:[0-9]+/)[0];
$.timeLabel.text = util.formatTime(parseInt(hour)) + " " + hour;

if(args.content == ""){
	$.label.height = 11*Alloy.CFG.GUI_widthScale;
}else{
	$.label.height = 40*Alloy.CFG.GUI_widthScale;
	$.label.text = args.content.substring(0,20);
}

function openZoomImage(){
	Alloy.createController('zoomImage', $.image.image).getView();
}

function showShare(){
	var ownerID = parseInt(Ti.App.Properties.getString("id"));
	var friends = Alloy.Collections.instance("friend");
	friends.fetch();
	var myFriends=friends.where({owner:ownerID});
	if(myFriends.length!=0){
		var chooseShare = Alloy.createController('chooseShare',args.id).getView();
		chooseShare.left = 0;
		chooseShare.open({modal:true,modalTransitionStyle:Titanium.UI.iPhone.MODAL_TRANSITION_STYLE_PARTIAL_CURL});
	}else{
		util.alert("暂无自己人，无法分享，请添加至少一个自己人后再分享。")
	};
}

function showDialog(){
	var dialog = Ti.UI.createOptionDialog({
		cancel: 1,
		options: ['删除', '取消'],
		destructive: 0,
		title: '确认删除？'
	});
	dialog.show();
	dialog.addEventListener("click",function(e){
		if(e.index==0){
			util.send("api/delete", {id: args.id}, function(res){
				var data = JSON.parse(res);
				if(data.type=="success"){
					Alloy.Globals.fetchBlog()
				}
			});
		}
	})
}