function newPopup(type, list, name, pos, width, height, nst) {
	if(!type) type = "menu";
	var widget = Windows.windows[type + "Popup"];
	if(widget && widget.name != name){
		animate(name, addWidgetsFrom(list, Widgets.orientate.vertical, nst), pos, widget, width, height);
	} else {
		if(widget && widget.name == name){
			Windows.closePopup(type);
		} else {
			var layout = addWidgetsFrom(list, Widgets.orientate.vertical, nst);
			var scroll = Widgets.scroll(layout);
			var window = Widgets.window(scroll, Widgets.gravity.top | Widgets.gravity.left, 135*pos, 124);
			widget = Windows.windows[type + "Popup"] = {
				window: window,
				parent: scroll,
				layout: layout,
				name: name
			};
		}
	}
}