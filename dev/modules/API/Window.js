/*
     _    _ _____ ______    _ _ _             
    | |  | |_   _|  ____|  | (_) |
    | |  | | | | | |__   __| |_| |_ ___  _ __
    | |  | | | | |  __| / _` | | __/ _ \| '__|
    | |__| |_| |_| |___| (_| | | || (_) | |
     \____/|_____|______\__,_|_|\__\___/|_|

	Developed by TMM (vk.com/tmm_corporation)
	 This code is a copyright, do not distribute.
*/

var WindowManager = {
	windows: {},
	dismiss: function (name) {
		Widgets.run(function () {
			var widget = WindowManager.windows[name];
			if (widget) {
				Widgets.remove(widget.window);
				WindowManager.windows[name] = null;
			}
		});
	},
	closeMenu: function (name) {
		this.dismiss(name);
	},
	closePopup: function (name) {
		this.dismiss(name);
	},
	hide: function (name) {
		Widgets.run(function () {
			var widget = WindowManager.windows[name];
			if (widget) {
				widget.window.setVisibility(Widgets.visibility.gone);
			}
		});
	},
	show: function (name) {
		Widgets.run(function () {
			var widget = WindowManager.windows[name];
			if (widget) {
				widget.window.setVisibility(Widgets.visibility.visible);
			}
		});
	},
	menu: function (name, layout, props) {
		Widgets.run(function () {
			if (layout) {
				WindowManager.closePopup(name);
				var scroll = Widgets.scroll(layout);
				var window = Widgets.window(scroll, Widgets.gravity.bottom | Widgets.gravity.left, props.x, props.y, props.width, props.height);
				WindowManager.windows[name] = {
					window: window,
					parent: scroll,
					layout: layout
				};
				// var widget = WindowManager.windows[name];
				// if(widget) {
				// 	var animate = android.view.animation.TranslateAnimation(0, (name == "menu") ? -widget.layout.getWidth() : (name == "right") ? widget.layout.getWidth() : 0, 0, 0);
				// 	widget.layout.startAnimation(animate);
				// 	animate.setDuration(400);
				// 	widget.layout.postDelayed(new java.lang.Runnable({
				// 		run: function() {
				// 			Widgets.run(function() {
				// 				widget.parent.removeAllViews();
				// 				widget.parent.addView(layout);
				// 				widget.layout = layout;
				// 				var animate = android.view.animation.TranslateAnimation((name == "menu") ? -widget.parent.getWidth() : (name == "right") ? widget.parent.getWidth() : 0, 0, 0, 0);
				// 				layout.startAnimation(animate);
				// 				animate.setDuration(400);
				// 			});
				// 		}
				// 	}), 400);
				// } else {


				// }
			}
		});
	},
	popup: function (name, list, props) {
		Widgets.run(function () {
			var widget = WindowManager.windows[name];
			if (widget && widget.name != name) {
				create(list, name, props);
			} else {
				if (widget && widget.name == name) {
					WindowManager.closePopup();
				} else {
					create(list, name, props);
				}
			}

			function create(list, name, props) {
				var layout = addWidgetsFrom(list, Widgets.orientate.vertical);
				var scroll = Widgets.scroll(layout);
				var position = {
					old: {
						x: 0 - Widgets.display.width,
						y: Widgets.display.height * 2
					},
					new: {
						x: props.x,
						y: props.y
					}
				};
				// var window = Widgets.window(scroll, Widgets.gravity.top | Widgets.gravity.left, 0, Widgets.display.height-(Widgets.display.height/9), null, Widgets.display.height/9);
				var window = Widgets.window(scroll, null, position.old.x, position.old.y);
				widget = WindowManager.windows[name] = {
					window: window,
					parent: scroll,
					layout: layout,
					name: name
				};
				
			}
			// 	if(layout) {
			// 		var name = view ? view.getParent().getTag() : "unknown";
			// 		var widget = WindowManager.windows[name + "Popup"];
			// 		if(widget && !focus) {
			// 			if(widget.name == name) {
			// 				WindowManager.closePopup(name);
			// 			} else {
			// 				if(Settings.config.interfaceAnimated) {
			// 					var animate = android.view.animation.AlphaAnimation(1, 0);
			// 					widget.layout.startAnimation(animate);
			// 					animate.setDuration(150);
			// 					widget.layout.postDelayed(new java.lang.Runnable({
			// 						run: function() {
			// 							Widgets.run(function() {
			// 								widget.name = name;
			// 								widget.parent.removeAllViews();
			// 								widget.parent.addView(layout);
			// 								widget.layout = layout;
			// 								widget.window.update(view ? (name == "menu") ? view.getWidth() : (name == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
			// 									view ? view.getY() : 0, Widgets.size.wrap, Widgets.size.wrap);
			// 								var animate = android.view.animation.AlphaAnimation(0, 1);
			// 								layout.startAnimation(animate);
			// 								animate.setDuration(150);
			// 							});
			// 						}
			// 					}), 150);
			// 				} else {
			// 					widget.name = name;
			// 					widget.parent.removeAllViews();
			// 					widget.parent.addView(layout);
			// 					widget.layout = layout;
			// 					widget.window.update(view ? (name == "menu") ? view.getWidth() : (name == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
			// 						view ? view.getY() : 0, Widgets.size.wrap, Widgets.size.wrap);
			// 				}
			// 			}
			// 		} else {
			// 			if(widget) WindowManager.closePopup(name);
			// 			var scroll = Widgets.scroll(layout);
			// 			var window = Widgets.window(scroll,
			// 				view ? Widgets.gravity.top | Widgets.gravity[view.getParent().getTag()] : Widgets.gravity.center,
			// 				view ? (name == "menu") ? view.getWidth() : (name == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
			// 				view ? view.getY() : 0, null, null, focus);
			// 			if(!focus) {
			// 				WindowManager.windows[name + "Popup"] = {
			// 					window: window,
			// 					parent: scroll,
			// 					layout: layout,
			// 					name: name
			// 				};
			// 			}
			// 		}
			// 	}
		});
	}
};