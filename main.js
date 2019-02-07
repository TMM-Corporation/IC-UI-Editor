/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 3
*/



// file: UI/Widgets.js

var Widgets = {
	ctx: UI.getContext(),
	theme: 16974120,
	dialogTheme: 16974126,
	size: {
		wrap: android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
		match: android.widget.RelativeLayout.LayoutParams.MATCH_PARENT
	},
	display: {
		width: UI.getContext().getWindowManager().getDefaultDisplay().getWidth(),
		height: UI.getContext().getWindowManager().getDefaultDisplay().getHeight()
	},
	gravity: {
		top: android.view.Gravity.TOP,
		bottom: android.view.Gravity.BOTTOM,
		left: android.view.Gravity.LEFT,
		right: android.view.Gravity.RIGHT,
		center: android.view.Gravity.CENTER
	},
	visibility: {
		visible: android.view.View.VISIBLE,
		invisible: android.view.View.INVISIBLE,
		gone: android.view.View.GONE
	},
	color: android.graphics.Color,
	font: android.graphics.Typeface.createFromFile(new java.io.File(FileTools.root + "games/com.mojang/innercore/mc-typeface.ttf")),
	orientate: {
		vertical: android.widget.LinearLayout.VERTICAL,
		horizontal: android.widget.LinearLayout.HORIZONTAL
	},
	run: function(code) {
		this.ctx.runOnUiThread(function() {
			try {
				code();
			} catch(e) {
				android.widget.Toast.makeText(Widgets.ctx, e + " (#" + e.lineNumber + ")", android.widget.Toast.LENGTH_LONG).show();
			}
		});
	},
	resize: function(value, isWidth) {
		return isWidth
			? (value * 1 / 800 * this.display.width)
			: (value * 1 / 480 * this.display.height);
	},
	check: function(image) {
		return image && new java.io.File(__dir__ + "gui/" + image + ".png").exists();
	},
	bitmap: function(file, scale) {
		if(!this.check(file)) return null;
		var bitmap = FileTools.ReadImage(__dir__ + "gui/" + file + ".png");
		return android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight()), bitmap.getWidth() * (scale || 1), bitmap.getHeight() * (scale || 1), false));
	},
	parse: function(color) {
		return this.color.parseColor(color);
	},
	params: function(width, height) {
		return android.widget.RelativeLayout.LayoutParams(this.resize(width, true), this.resize(height, false));
	},
	remove: function(view) {
		if(view) {
			view.dismiss();
			view = null;
		}
	},
	window: function(view, gravity, x, y, width, height, focus) {
		var window = new android.widget.PopupWindow(view,
			this.resize(width) || this.size.wrap,
			this.resize(height) || this.size.wrap, focus || false);
		if(gravity == null) gravity = this.gravity.center;
		window.setBackgroundDrawable(this.bitmap("background"));
		window.showAtLocation(this.ctx.getWindow().getDecorView(),
			gravity, x || 0, y || 0);
		return window;
	},
	linear: function(views, orientation, gravity, params) {
		var layout = new android.widget.LinearLayout(this.ctx);
		layout.setOrientation((orientation != null) ? orientation : this.orientate.vertical);
		if(params) layout.setLayoutParams(params);
		layout.setGravity((gravity != null) ? gravity : Widgets.gravity.center);
		for(a in views)
			layout.addView(views[a]);
		return layout;
	},
	scroll: function(view, orientation, params) {
		var scroll = null;
		if(orientation == null || orientation == this.orientate.vertical) {
			scroll = new android.widget.ScrollView(this.ctx);
		} else {
			scroll = new android.widget.HorizontalScrollView(this.ctx);
		}
		if(params) scroll.setLayoutParams(params);
		if(view) scroll.addView(view);
		return scroll;
	},
	button: function(text, size, params, color) {
		var button = new android.widget.Button(this.ctx);
		button.setText((text != null) ? text : "");
		if(size != null) button.setTextSize(this.resize(size));
		button.setTextColor(color || this.color.WHITE);
		button.setTypeface(this.font);
		button.setBackgroundDrawable(null);
		if(params) button.setLayoutParams(params);
		return button;
	},
	image: function(file, scale, params) {
		var image = new android.widget.ImageView(this.ctx);
		if(file) image.setImageDrawable(this.bitmap(file, scale));
		if(params) image.setLayoutParams(params);
		return image;
	},
	text: function(msg, size, gravity, params, color) {
		var text = new android.widget.TextView(this.ctx);
		text.setText((msg != null) ? msg : "");
		if(size != null) text.setTextSize(this.resize(size));
		text.setTextColor(color || this.color.WHITE);
		text.setGravity(gravity || this.gravity.center);
		text.setTypeface(this.font);
		if(params) text.setLayoutParams(params);
		return text;
	},
	edit: function(msg, hint, size, params, type, single, gravity, color, hintColor) {
		var edit = new android.widget.EditText(this.ctx);
		if(msg != null) edit.setText(msg);
		if(hint != null) edit.setHint(hint);
		if(size != null) edit.setTextSize(this.resize(size));
		if(single) edit.setSingleLine(single);
		if(type) edit.setInputType(type);
		edit.setBackgroundDrawable(null);
		edit.setTextColor(color || this.color.WHITE);
		edit.setHintTextColor(hintColor || this.color.RED);
		edit.setGravity(gravity || this.gravity.center);
		edit.setTypeface(this.font);
		if(params) edit.setLayoutParams(params);
		return edit;
	},
	list: function(items, params) {
		var adapter = new android.widget.ArrayAdapter(this.ctx, android.R.layout.simple_list_item_1, items);
		var list = new android.widget.ListView(this.ctx, null, this.theme);
		list.setAdapter(adapter);
		if(params) list.setLayoutParams(params);
		return {
			adapter: adapter,
			view: list
		};
	}
};




// file: UI/Window.js

var Windows = {
	windows: {},
	dismiss: function(name) {
		Widgets.run(function() {
			var widget = Windows.windows[name];
			if(widget) {
				Widgets.remove(widget.window);
				Windows.windows[name] = null;
			}
		});
	},
	closeMenu: function(type) {
		this.dismiss(type + "Menu");
	},
	closePopup: function(type) {
		this.dismiss(type + "Popup");
	},
	hide: function(name) {
		Widgets.run(function() {
			var widget = Windows.windows[name];
			if(widget) {
				widget.window.setVisibility(Widgets.visibility.gone);
			}
		});
	},
	show: function(name) {
		Widgets.run(function() {
			var widget = Windows.windows[name];
			if(widget) {
				widget.window.setVisibility(Widgets.visibility.visible);
			}
		});
	},
	menu: function(name, type, layout) {
		Widgets.run(function() {
			if(layout) {
				Windows.closePopup(type);
				layout.setTag(type);
				var widget = Windows.windows[type + "Menu"];
				if(widget) {
					if(Settings.config.interfaceAnimated) {
						var animate = android.view.animation.TranslateAnimation(0, (type == "left") ? -widget.layout.getWidth() : (type == "right") ? widget.layout.getWidth() : 0, 0, 0);
						widget.layout.startAnimation(animate);
						animate.setDuration(400);
						widget.layout.postDelayed(new java.lang.Runnable({
							run: function() {
								Widgets.run(function() {
									widget.name = name;
									widget.parent.removeAllViews();
									widget.parent.addView(layout);
									widget.layout = layout;
									var animate = android.view.animation.TranslateAnimation((type == "left") ? -widget.parent.getWidth() : (type == "right") ? widget.parent.getWidth() : 0, 0, 0, 0);
									layout.startAnimation(animate);
									animate.setDuration(400);
								});
							}
						}), 400);
					} else {
						widget.name = name;
						widget.parent.removeAllViews();
						widget.parent.addView(layout);
						widget.layout = layout;
					}
				} else {
					var scroll = Widgets.scroll(layout);
					var window = Widgets.window(scroll,
						Widgets.gravity.top | Widgets.gravity[type],
						null, null, null, Widgets.size.match);
					Windows.windows[type + "Menu"] = {
						window: window,
						parent: scroll,
						layout: layout,
						name: name
					};
				}
			}
		});
	},
	popup: function(name, view, layout, focus) {
		Widgets.run(function() {
			if(layout) {
				var type = view ? view.getParent().getTag() : "unknown";
				var widget = Windows.windows[type + "Popup"];
				if(widget && !focus) {
					if(widget.name == name) {
						Windows.closePopup(type);
					} else {
						if(Settings.config.interfaceAnimated) {
							var animate = android.view.animation.AlphaAnimation(1, 0);
							widget.layout.startAnimation(animate);
							animate.setDuration(150);
							widget.layout.postDelayed(new java.lang.Runnable({
								run: function() {
									Widgets.run(function() {
										widget.name = name;
										widget.parent.removeAllViews();
										widget.parent.addView(layout);
										widget.layout = layout;
										widget.window.update(view ? (type == "left") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
											view ? view.getY() : 0, Widgets.size.wrap, Widgets.size.wrap);
										var animate = android.view.animation.AlphaAnimation(0, 1);
										layout.startAnimation(animate);
										animate.setDuration(150);
									});
								}
							}), 150);
						} else {
							widget.name = name;
							widget.parent.removeAllViews();
							widget.parent.addView(layout);
							widget.layout = layout;
							widget.window.update(view ? (type == "left") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
								view ? view.getY() : 0, Widgets.size.wrap, Widgets.size.wrap);
						}
					}
				} else {
					if(widget) Windows.closePopup(type);
					var scroll = Widgets.scroll(layout);
					var window = Widgets.window(scroll,
						view ? Widgets.gravity.top | Widgets.gravity[view.getParent().getTag()] : Widgets.gravity.center,
						view ? (type == "left") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
						view ? view.getY() : 0, null, null, focus);
					if(!focus) {
						Windows.windows[type + "Popup"] = {
							window: window,
							parent: scroll,
							layout: layout,
							name: name
						};
					}
				}
			}
		});
	}
};




// file: UI/MenuWidgets.js

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
function showError(e) {
	var builder = new android.app.AlertDialog.Builder(Widgets.ctx, Widgets.dialogTheme);
	builder.setTitle("___________Script error___________");
	var line = e.lineNumber;
	builder.setMessage(e + " [Line #" + (line-303) + "]\n[Line main.js#" + (line+1) + "]");
	builder.create().show();
}
function test(code) {
	Widgets.ctx.runOnUiThread(function () {
		try {
			code();
		} catch (e) {
			showError(e);
		}
	});
}
function newPopup(type, list, name, pos) {
	Widgets.run(function(){
		if(!type) type = "left";
		var widget = Windows.windows[type + "Popup"];
		if(widget && widget.name == name){ Windows.closePopup(type);} else {
			Windows.closePopup(type);
			var layout = addWidgetsFrom(list, Widgets.orientate.vertical);
			var scroll = Widgets.scroll(layout);
			var window = Widgets.window(scroll, Widgets.gravity.top | Widgets.gravity.left, 133.5*pos, 132);
			widget = Windows.windows[type + "Popup"] = {
				window: window,
				parent: scroll,
				layout: layout,
				name: name
			};
		}
	});
}
// TODO: Make clean code
function addWidgetsFrom(list, orientation) {
	Widgets.run(function(){
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
				var sized = Widgets.resize(32);
				var linear = Widgets.linear(obj, null, null, Widgets.params(60, 60));
				if(widget.click) linear.setOnClickListener(widget.click);
				//linear.setBackgroundDrawable(Widgets.bitmap("bg"), sized);
				widgets.push(linear);
			}
		}
		var layout = Widgets.linear(widgets, orientation);
		return layout;
	});
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




