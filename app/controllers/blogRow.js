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
			util.get("api/delete?id=" + args.id, function(res){
				var data = JSON.parse(res);
				if(data.success){
					Alloy.Globals.fetchBlog()
				}
			});
		}
	})
}