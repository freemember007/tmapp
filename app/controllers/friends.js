// toggleMenu
function toggleMenu(){
	if(Alloy.Globals.slide){
		$.friends.animate({left:0});
		Alloy.Globals.menu.animate({left:-200});
		$.table.scrollable = true;
		Alloy.Globals.slide = false;
	}else{
		$.friends.animate({left:200});
		Alloy.Globals.menu.animate({left:0});
		$.table.scrollable = false;
		Alloy.Globals.slide = true;
	}
}