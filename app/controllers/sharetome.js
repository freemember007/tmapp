// tableScroolable
function tableScroolable(){
	$.table.scrollable = Alloy.Globals.slide?false:true;
}

// toggleMenu
function toggleMenu(){
	if(Alloy.Globals.slide){
		$.sharetome.animate({left:0});
		Alloy.Globals.menu.animate({left:-200});
		Alloy.Globals.slide = false;
	}else{
		$.sharetome.animate({left:200});
		Alloy.Globals.menu.animate({left:0});
		Alloy.Globals.slide = true;
	}
}

// add actInd
var actInd = Alloy.createController('actInd').getView();
$.sharetome.add(actInd);

// 下拉刷新
var pullView = Alloy.createController('pullView', {table:$.table,fetch:fetchSharetome}).getView();
$.table.headerPullView = pullView

// fetch
var fetchOffset = 10;
var lastRow = 10;

function firstfetchSharetome(){
	if(Ti.App.Properties.hasProperty("sharetomeData")&&Ti.UI.iPhone.getAppBadge()==0){
		var data = JSON.parse(Ti.App.Properties.getString("sharetomeData"));
		setData(data,false);
	}else{
		fetchSharetome()
	}
}

function fetchSharetome(){
	util.send('api/fetchSharetome', {id: Ti.App.Properties.getString("id")}, function(res){
		var data = JSON.parse(res);
		if(data.type == "success"){
			setData(data,false);
			Ti.UI.iPhone.setAppBadge(0);
			var badge = Alloy.Models.instance("badge");
			badge.set({"visible":false,"width":0,"number":0});
			badge.save();
			Ti.App.Properties.setString("sharetomeData",JSON.stringify(data));
		}
	});
}

function setData(data,isAppend){
	var users = data.users
	var items = data.items;
	if(users.length==0){
		$.table.setData(null);
		$.hint.setVisible(true);
	}else{
		$.hint.setVisible(false);
		var tabledata = [];
		for(var i=0; i<users.length; i++){
			var hour = items[i].created_at.match(/[0-9]+:[0-9]+/)[0];
			var row = Ti.UI.createTableViewRow({
				selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
			});
			var avatar = Ti.UI.createImageView({
				top:10, left:10*Alloy.CFG.GUI_widthScale, width:32, height:32,
				preventDefaultImage: true,
				borderRadius:3,
				image: users[i].avatar_url!=null ? Alloy.Globals.sitePath + users[i].avatar_url : "avatar.png",
			})
			
			var username = Ti.UI.createLabel({
				top:10, left:60, height:32,
				text: users[i].domain_name,
				color: "#555",
				font:{fontSize:14, fontWeight:"bold"},
				shadowColor: "#eee",
				shadowOffset: {x:1,y:1},
			})
			var date = Ti.UI.createLabel({
				top:10, right:10*Alloy.CFG.GUI_widthScale, height:32,
				text: util.formatTime(parseInt(hour)) + " " + hour,
				color: "#888",
				shadowColor: "#fff",
				shadowOffset: {x:1,y:1},
				font:{fontSize:12, fontWeight:"bold"}, 
				textAlign:"right",
			})
			var imageContainer = Ti.UI.createLabel({
				top:45, width:308*Alloy.CFG.GUI_widthScale,
				backgroundImage: "image_back.png",
				layout:"vertical",
			})
			var image = Ti.UI.createImageView({
				top:10*Alloy.CFG.GUI_widthScale, width:286*Alloy.CFG.GUI_widthScale,
				preventDefaultImage:true,
				image:Alloy.Globals.sitePath + items[i].url,	
			})
			imageContainer.addEventListener("click",function(e){
				if(e.source.image!==undefined){
					Alloy.createController('zoomImage', e.source.image).getView();
				}
			})
			var describe = Ti.UI.createLabel({
				width:286*Alloy.CFG.GUI_widthScale,
				font:{fontSize:14, fontWeight:"bold"},
				color: "#555",
				shadowColor: "#eee",
				shadowOffset: {x:1,y:1},
			})
			if(items[i].content == ""){
				describe.height = 11*Alloy.CFG.GUI_widthScale
			}else{
				describe.text = items[i].content;
				describe.height = 40*Alloy.CFG.GUI_widthScale
			}
			row.add(avatar);
			row.add(username);
			row.add(date);
			imageContainer.add(image);
			imageContainer.add(describe);
			row.add(imageContainer);
			if(isAppend){
				$.table.appendRow(row,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
			}else{
				tabledata.push(row);
			}
		};
		if(!isAppend){$.table.setData(tabledata)};
	}
	if(!isAppend){$.sharetome.remove(actInd)};
}

// 底部刷新
var updating = false;
var loadingInd = Ti.UI.createActivityIndicator({width:30,height:30,
	style:  Ti.UI.iPhone.ActivityIndicatorStyle.DARK
});
var loadingRow = Ti.UI.createTableViewRow({height:40});
loadingRow.add(loadingInd);
function beginUpdate(){
	updating = true;
	$.table.appendRow(loadingRow);
	loadingInd.show();
	setTimeout(endUpdate,2000);
}
function endUpdate(){
	updating = false;
	lastRow += 10;
	util.send('api/fetchSharetome', {id: Ti.App.Properties.getString("id")}, function(res){
		var data = JSON.parse(res);
		$.table.deleteRow($.table.data.length-1,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE});
		loadingInd.hide();
		if(data.type == "success"){
			setData(data,true);
			$.table.scrollToIndex(lastRow-9,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
			fetchOffset += 10;
		}else{
			util.alert("刷新失败，请重试！")
		};
	});
}
$.table.addEventListener('scroll',function(e){
	if ((!updating) && e.contentSize.height>480*7 && (e.contentOffset.y + e.size.height + 100 > e.contentSize.height)) {
        beginUpdate();
    }
});