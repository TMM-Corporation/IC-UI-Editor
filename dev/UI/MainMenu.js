
/*
  _____               ______    _ _ _
 |  __ \             |  ____|  | (_) |
 | |  | | _____   __ | |__   __| |_| |_ ___  _ __
 | |  | |/ _ \ \ / / |  __| / _` | | __/ _ \| '__|
 | |__| |  __/\ V /  | |___| (_| | | || (_) | |
 |_____/ \___| \_/   |______\__,_|_|\__\___/|_|


       Developed by Nernar (vk.com/nernar)
   This code is a copyright, do not distribute.

*/
function animate(name, layout, pos, widget, width, height) {
	let animate = android.view.animation.AlphaAnimation(1, 0);
	widget.layout.startAnimation(animate);
	animate.setDuration(160);
	widget.layout.postDelayed(new java.lang.Runnable({
		run: function(){
			Widgets.run(function(){
				widget.name = name;
				widget.parent.removeAllViews();
				widget.window.update(135*pos, 124, width, height);
				let animate = android.view.animation.AlphaAnimation(0, 1);
				widget.parent.addView(layout);
				widget.layout = layout;
				widget.layout.startAnimation(animate);
				animate.setDuration(320);
			});
		}
	}), 160);
}
function newPopup(type, list, name, pos, width, height, nst) {
		if(!type) type = "left";
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
// TODO: Make clean code
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
				text = Widgets.text(widget.title || "<bad texture>\n" + widget.image || a, widget.title ? 6 : 4);
			}
			if(!text && widget.title)	text = Widgets.text(widget.title, 6);
			if(text || image) {
				var obj = [];
				if(image) obj.push(image);
				if(text) obj.push(text);
				var sized = Widgets.resize(32);
				var linear = Widgets.linear(obj, null, null, Widgets.params(60, 60));
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
// Popups widgets
var moving1 = {
	n1: {
		image: "bg"
	},
	up: {
		image: "button_up",
		click: function(v) {	editorUI.current.y-=1;	}
	},
	n2: {
		image: "bg"
	}
};
var moving2 = {
	left: {
		image: "button_left",
		click: function(v) {	editorUI.current.x-=1;	}
	},
	down: {
		image: "button_down",
		click: function(v) {	editorUI.current.y+=1;	}
	},
	right: {
		image: "button_right",
		click: function(v) {	editorUI.current.x+=1;	}
	}
};
var toMoving = {
	up: {
		image: "button_up",
		click: function(v) {
			// alert("up");
				editorUI.current.y-=1;
				// text.set();
		}
	},
	down: {
		image: "button_down",
		click: function(v) {
			// alert("down");
				editorUI.current.y+=1;
				// text.set();
		}
	},
	left: {
		image: "button_left",
		click: function(v) {
			// alert("left");
				editorUI.current.x-=1;
				// text.set();
		}
	},
	right: {
		image: "button_right",
		click: function(v) {
			// alert("right");
				editorUI.current.x+=1;
				// text.set();
		}
	}
};
var toScaling = {
	scaleUp: {
		image: "button_scale_up",
		click: function(v) {
			// alert("scale up");
				if(editorUI.current.size)
				editorUI.current.size+=1;
				if(editorUI.current.scale)
				editorUI.current.scale+=0.1;
				// text.set();
		}
	},
	scaleDown: {
		image: "button_scale_down",
		click: function(v) {
			// alert("scale down");
				if(editorUI.current.size)
				editorUI.current.size-=1;
				if(editorUI.current.scale)
				editorUI.current.scale-=0.1;
				// text.set();
		}
	}
};

var toAdding = {
	element: {
		image: "button_element_add",
		click: function(v) {
			Widgets.run(function(){

			if(Windows.windows["centerPopup"]){
				Windows.closePopup("center");
			}	else {
				var files = FileTools.GetListOfFiles(__dir__+'gui');
				// alert(files);
				var layout = Widgets.linear();
				for(let i in files){
					var item = files[i];
						item = item.toString();
						item = item.replace(__dir__+'gui/', '');
						item = item.replace('.png', '');
						alert(item);

					var image = Widgets.image(item, 32, Widgets.params(48, 48)),
							text = Widgets.text(item, 6);
							var sized = Widgets.resize(48);
							image.setPadding(sized, sized, sized, sized);
					var linear = Widgets.linear([image, text], Widgets.orientate.horizontal);
						linear.setOnClickListener(function(){
							if(editorUI.current!=null)editorUI.current.bitmap=item;
							editorUI.addUIElement("test", {type: "button", x: 300, y: 300, scale: 3.2, bitmap: item, clicker: {onClick: function(){editorUI.setCurrent("test");}}});
							Windows.closePopup("center");
						});
						layout.addView(linear);
						alert(item);
				}
				layout.setBackgroundColor(android.graphics.Color.argb(120, 63, 81, 181));
				var scroll = Widgets.scroll(layout);
				var window = Widgets.window(scroll, Widgets.gravity.center);
				Windows.windows["centerPopup"] = {
					window: window,
					parent: scroll,
					layout: layout,
					name: "center"
				};
			}
			 });
		}
	},
	drawing: {
		image: "button_drawing_add",
		click: function(v) {
			alert("drawing adding");
		}
	}
};
var toRemoving = {
	element: {
		image: "button_element_remove",
		click: function(v) {	editorUI.removeUIElement();	}
	},
	drawing: {
		image: "button_drawing_remove",
		click: function(v) {		}
	}
};
// Menu widgets
var menu = {
	scaling: {
		image: "button_scaling",
		click: function(v) {	Widgets.run(function(){	newPopup("left", toScaling, "Scaling", 0, 132, 135*2);	});	}
	},
	adding: {
		image: "button_add",
		click: function(v) {	Widgets.run(function(){	newPopup("left", toAdding, "Adding", 1, 132, 135*2);	});	}
	},
	moving: {
		image: "button_moving",
		title: "Test Moving",
		click: function(v) {
			Widgets.run(function(){
				var v1 = [];
				v1.push(addWidgetsFrom(moving1, Widgets.orientate.horizontal));
				v1.push(addWidgetsFrom(moving2, Widgets.orientate.horizontal));
				newPopup("left", v1, "Moving", 1, 132*3, 135*2, true);
			});
		}
	},
	removing: {
		image: "button_remove",
		click: function(v) {	Widgets.run(function(){	newPopup("left", toRemoving, "Removing", 3, 132, 135*2);	});	}
	},
	export: {
		image: "button_export",
		click: function(v) {	Widgets.run(function(){		});	}
	},
	open: {
		image: "button_start",
		click: function(v) {
			Widgets.run(function(){
				Windows.closePopup("left");
				Windows.closeMenu("left");
				editorUI.open(editorUI.main);
				Windows.menu("Left Menu", "left", addWidgetsFrom(menu));
			});
		}
	}
};
// Open after IC Loads
Callback.addCallback("PostLoaded", function (coords, item, block) {
		Windows.menu("Left Menu", "left", addWidgetsFrom(menu));
});
