// toggleMenu
function toggleMenu(){
	if(Alloy.Globals.slide){
		$.sharetome.animate({left:0});
		Alloy.Globals.menu.animate({left:-200});
		$.table.scrollable = true;
		Alloy.Globals.slide = false;
	}else{
		$.sharetome.animate({left:200});
		Alloy.Globals.menu.animate({left:0});
		$.table.scrollable = false;
		Alloy.Globals.slide = true;
	}
}

var actInd = Alloy.createController('actInd').getView();
$.sharetome.add(actInd);

function fetchSharetome(){
	util.send('api/fetchSharetome', {id: Ti.App.Properties.getString("id")}, function(res){
		var data = JSON.parse(res);
		$.sharetome.remove(actInd);
		if(data.type == "success"){
			users = data.users
			items = data.items;
			var tabledata = [];
			for(var i=0; i<users.length-1; i++){
				var hour = items[i].created_at.match(/[0-9]+:[0-9]+/)[0];
				var row = Ti.UI.createTableViewRow({
					selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
				});
				var avatar = Ti.UI.createImageView({
					top:10, left:10, width:32, height:32,
					image:Alloy.Globals.sitePath + users[i].avatar_url,
				})
				var username = Ti.UI.createLabel({
					top:10, left:48, height:32,
					text: users[i].domain_name,
					color: "#555",
					font:{fontSize:14, fontWeight:"bold"},
					shadowColor: "#eee",
					shadowOffset: {x:1,y:1},
				})
				var date = Ti.UI.createLabel({
					top:10, right:10, height:32,
					text: util.formatTime(parseInt(hour)) + " " + hour,
					color: "#888",
					shadowColor: "#fff",
					shadowOffset: {x:1,y:1},
					font:{fontSize:12, fontWeight:"bold"}, 
					textAlign:"right",
				})
				var imageContainer = Ti.UI.createLabel({
					top:45, width:308,
					backgroundImage: "image_back.png",
					layout:"vertical",
				})
				var image = Ti.UI.createImageView({
					top:10, width:286,
					preventDefaultImage:true,
					image:items[i].url,					
				})
				imageContainer.addEventListener("click",function(e){
					Alloy.createController('zoomImage', image.image).getView();
				})
				var describe = Ti.UI.createLabel({
					width:286,
					font:{fontSize:14, fontWeight:"bold"},
					color: "#555",
					shadowColor: "#eee",
					shadowOffset: {x:1,y:1},
				})
				if(items[i].content == ""){
					describe.height = 11
				}else{
					describe.text = items[i].content;
					describe.height = 40
				}
				row.add(avatar);
				row.add(username);
				row.add(date);
				imageContainer.add(image);
				imageContainer.add(describe);
				row.add(imageContainer);
				tabledata.push(row);
			};
			$.table.setData(tabledata);
			Ti.App.Properties.setString("sharetomeData",JSON.stringify(data));
		}
	});
}