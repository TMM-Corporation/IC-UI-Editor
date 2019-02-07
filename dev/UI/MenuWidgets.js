// function animate(widget, type, name, layout) {
// 	var animate = android.view.animation.TranslateAnimation(0, (type == "left") ? -widget.layout.getWidth() : (type == "right") ? widget.layout.getWidth() : 0, 0, 0);
// 	widget.layout.startAnimation(animate);
// 	animate.setDuration(400);
// 	widget.layout.postDelayed(new java.lang.Runnable({
// 		run: function() {
// 			Widgets.run(function() {
// 				widget.name = name;
// 				widget.parent.removeAllViews();
// 				widget.parent.addView(layout);
// 				widget.layout = layout;
// 				var animate = android.view.animation.TranslateAnimation((type == "left") ? -widget.parent.getWidth() : (type == "right") ? widget.parent.getWidth() : 0, 0, 0, 0);
// 				layout.startAnimation(animate);
// 				animate.setDuration(400);
// 			});
// 		}
// 	}), 400);
// }
function newPopup(type, list, name, pos) {
	if(!type) type = "left";
	var widget = Windows.windows[type + "Popup"];
	if(widget && widget.name == name){ Windows.closePopup(type);} else {
		Windows.closePopup(type);
		var layout = addWidgetsFrom(list, Widgets.orientate.vertical);
		var scroll = Widgets.scroll(layout);
		var window = Widgets.window(scroll, Widgets.gravity.top | Widgets.gravity.left, (132*pos)+(0.5*pos), 132);
		widget = Windows.windows[type + "Popup"] = {
			window: window,
			parent: scroll,
			layout: layout,
			name: name
		};
	}
}
// TODO: Make clean code
function addWidgetsFrom(list, orientation) {
	var widgets = [];
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
			text = Widgets.text(widget.title || "<bad texture>\n" + widget.image || a, widget.title ? 6 : 4);
		}
		if(!text && widget.title)	text = Widgets.text(widget.title, 6);
		if(text || image) {
			var obj = [];
			if(image) obj.push(image);
			if(text) obj.push(text);
			var linear = Widgets.linear(obj, null, null, Widgets.params(60, 60));
			if(widget.click) linear.setOnClickListener(widget.click);
			widgets.push(linear);
		}
	}
	var layout = Widgets.linear(widgets, orientation);
	// layout.setBackgroundColor(Widgets.color.BLUE);
	return layout;
};

// Popups widgets
var toMoving = {
	up: {
		image: "button_up",
		click: function(v) {
			alert("up");
		}
	},
	down: {
		image: "button_down",
		click: function(v) {
			alert("down");
		}
	},
	left: {
		image: "button_left",
		click: function(v) {
			alert("left");
		}
	},
	right: {
		image: "button_right",
		click: function(v) {
			alert("right");
		}
	}
};
var toScaling = {
	scaleUp: {
		image: "button_scale_up",
		click: function(v) {
			alert("scale up");
		}
	},
	scaleDown: {
		image: "button_scale_down",
		click: function(v) {
			alert("scale down");
		}
	}
};
var toAdding = {
	element: {
		image: "button_element_add",
		click: function(v) {
			alert("up");
		}
	},
	drawing: {
		image: "button_drawing_add",
		click: function(v) {
			alert("down");
		}
	}
};
var toRemoving = {
	element: {
		image: "button_element_remove",
		click: function(v) {
			alert("up");
		}
	},
	drawing: {
		image: "button_drawing_remove",
		click: function(v) {
			alert("down");
		}
	}
};


// Widgets
var left = {
	moving: {
		image: "button_moving",
		title: "Test Moving",
		click: function(v) {
			alert("moving");
			newPopup("left", toMoving, "Moving", 0);
		}
	},
	scaling: {
		image: "button_scaling",
		click: function(v) {
			alert("scaling");
			newPopup("left", toScaling, "Scaling", 1);
		}
	},
	adding: {
		image: "button_add",
		click: function(v) {
			alert("adding");
			newPopup("left", toAdding, "Adding", 2);
		}
	},
	removing: {
		image: "button_remove",
		click: function(v) {
			alert("removing");
			newPopup("left", toRemoving, "Removing", 3);
		}
	},
	export: {
		image: "button_export",
		click: function(v) {
			alert("export");
		}
	}
};

// Create
var Menus = {
	exit: function(name){
		Windows.closeMenu(name);
	},
	left: function(){
		let layout = addWidgetsFrom(left);
		Windows.menu("Left Menu", "left", layout);
	}
};
var Popups = {
	exit: function(name){
		Windows.closeMenu(name);
	},
	moving: function(){
		let layout = addWidgetsFrom(toMoving);
		Windows.popup("moving", "left", layout);
	},
	scaling: function(){
		let layout = addWidgetsFrom(toScaling);
		Windows.popup("scaling", "left", layout);
	},
	adding: function(){
		let layout = addWidgetsFrom(toAdding);
		Windows.popup("adding", "left", layout);
	},
	removing: function(){
		let layout = addWidgetsFrom(toRemoving);
		Windows.popup("removing", "left", layout);
	}
};
Callback.addCallback("PostLoaded", function (coords, item, block) {
		Menus.left();
});
