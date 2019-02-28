function addWidgetsFrom(list, orientation, nst) {
		var widgets = [];
		if(nst){
			widgets=list;
		}else{
			if(!orientation) orientation = Widgets.orientate.horizontal;
			for(a in list) {
				var widget = list[a];
				var image = null,
				text = null;
				if(Widgets.check(widget.image)) {
					image = Widgets.image(widget.image, 32, Widgets.params(126, 126));
					var sized = Widgets.resize(32);
					image.setPadding(sized, sized, sized, sized);
				} else {
					text = Widgets.text(widget.title || widget.image || a, widget.title ? 6 : 3);
				}
				if(!text && widget.title)	text = Widgets.text(widget.title, 3);
				if(text || image) {
					var obj = [];
					//Widgets.run(function(){if(widget.clickLong) image.setOnLongClickListener(widget.clickLong);});
					if(image) obj.push(image);
					if(text) obj.push(text);
					var sized = Widgets.resize(32);
					var linear = Widgets.linear(obj, Widgets.orientate.vertical, null, Widgets.params(60, 60));
					if(widget.click) linear.setOnClickListener(widget.click);
					linear.setBackgroundDrawable(Widgets.bitmap("bg", sized));
					widgets.push(linear);
				}
			}
		}
		var layout = Widgets.linear(widgets, orientation);
		layout.setBackgroundColor(android.graphics.Color.argb(120, 63, 81, 181));
		return layout;
};