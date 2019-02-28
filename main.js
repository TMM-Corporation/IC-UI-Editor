/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 14
*/



// file: UI/dialogs/select_type.js

var slotProps = {
	type: "slot",
	x: 300, y: 300,
	size: 60,
	visual: false,
	bitmap: "slot_default",
	needClean: false,
	isTransparentBackground: false,
	clicker: {}
}, invSlotProps = {
	type: "invSlot",
	x: 300, y: 300,
	size: 60,
	index: 0,
	bitmap: "invSlot_default",
	clicker: {}
}, buttonProps ={
	type: "button",
	x: 300, y: 300,
	scale: 3.2,
	bitmap: "button_default",
	bitmap2: "button_default2",
	clicker: {}
}, closeProps = {
	type: "closeButton",
	x: 300, y: 300,
	global: true,
	bitmap: "close_default",
	bitmap2: "close_default2",
	scale: 3.2,
	clicker: {}
}, scaleProps = {
	type: "scale",
	x: 300, y: 300,
	direction: 0,
	bitmap: "scale",
	scale: 3.2,
	value: 1,
	invert: false,
	overlay: null,
	overlayScale: 3.2,
	overlayOffset: {x: 0, y: 0},
	clicker: {}
}, textProps = {
	type: "text",
	x: 300, y: 300,
	width: 120,
	height: 16,
	text: "This is a Text element",
	font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18},
	clicker: {}
}, imageProps = {
	type: "image",
	x: 300, y: 300,
	bitmap: "image",
	scale: 3.2,
	overlay: null,
	overlayScale: 3.2,
	overlayOffset: {x: 0, y: 0},
	clicker: {}
};

function addElement(){
	Widgets.run(function(){
		var types = {
			"slot": slotProps, 
			"invSlot": invSlotProps, 
			"button": buttonProps, 
			"closeButton(not selectable!)": closeProps, 
			"scale": scaleProps, 
			"text": textProps, 
			"image": imageProps
		}, widgets = [];
		for(let u in types){
			let i = u;
			let text = Widgets.linear([Widgets.text(i)], null, Widgets.gravity.left);
			text.setOnClickListener(function(){
				Widgets.run(function(){
					let count = edit(["match"], false),
						id = "element"+(count+1)+"_"+i;
					types[i].clicker = {onClick: function(){edit(["select", id]);}};
					edit(["add", id, types[i]]);
					alert("Element ["+i+"] added to GUI with id = "+id);
					edit(["match"]);
				});
			});
			text.setPadding(16, 4, 16, 4);
			widgets.push(text);
		}
		var layout = Widgets.linear(widgets),
			scroll = Widgets.scroll(layout),
			dial = {
				title: "Select Type of Element",
				view: scroll,
				buttons: {
					text: [null, null, "Cancel"],
					click: [null, null, function(){}]
				}
			};
		dialog(dial);
	});
};




// file: UI/dialogs/select_bitmap.js

function selectBitmap(t){
	var type = t;
	Widgets.run(function(){
		var files = FileTools.GetListOfFiles(__dir__+"gui/"), widgets = [];
		for(let i in files){
			let item = files[i].toString();
			item = item.replace(__dir__+"gui/", "");
			item = item.replace(".png", "");
			item = item+"";
			let text = Widgets.text("["+i+"]: "+item, 8),
			linear = Widgets.linear([text], Widgets.orientate.horizontal, Widgets.gravity.left);
			//item = "custom/"+item+"";
			linear.setOnClickListener(function(){
				let c = editorUI.current;
				alert("You selected ["+item+"] bitmap");
				if(c!=null){
					if(type==1 && c.bitmap)c.bitmap=item;
					if(type==1 && c.bitmap2)selectBitmap(2), alert("Select second bitmap");
					if(type==2 && c.bitmap2)c.bitmap2=item;
				}
			});
			linear.setPadding(16, 4, 16, 4);
			widgets.push(linear);
		}
		var layout = Widgets.linear(widgets),
			scroll = Widgets.scroll(layout),
			dial = {
				title: "Select Bitmap "+type,
				view: scroll,
				buttons: {
					text: [null, null, "Cancel"],
					click: [null, null, function(){}]
				}
			};
		dialog(dial);
	});
};




// file: UI/dialogs/selectFromList.js

function selectElement(){
	Widgets.run(function(){
		var elements = editorUI.main.Window.content.elements, widgets = [];
		for(let i in elements){
			let item = i;
			item = item+"";
			let text = Widgets.text("["+elements[i].type+"]: "+item, 8),
			linear = Widgets.linear([text], Widgets.orientate.horizontal, Widgets.gravity.left);
			linear.setOnClickListener(function(){
				edit(["select", item]);
			});
			linear.setPadding(16, 4, 16, 4);
			widgets.push(linear);
		}
		var layout = Widgets.linear(widgets),
			scroll = Widgets.scroll(layout),
			dial = {
				title: "Element Selector",
				view: scroll,
				buttons: {
					text: [null, null, "Cancel"],
					click: [null, null, function(){}]
				}
			};
		dialog(dial);
	});
};




// file: UI/modules/FileAPI.js

/*
	(╯°□°）╯︵ ┻━┻
*/
var File = java.io.File;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var FOS = java.io.FileOutputStream;
var String = java.lang.String;
var StringBuilder = java.lang.StringBuilder;
var sdcard = android.os.Environment.getExternalStorageDirectory();
var FileAPI={
	getName: function(dir){
		let name = new File(dir).name;
		return(name.replace('.png', ''));
	},
	select:function(dir,Name){
		return (new File(dir,Name));
	},
	createNewDir:function(dir, newDirName){
		return (new File(dir, newDirName).mkdir());
	},
	exists:function(file){
		return file.exist();
	},
	create:function(path, name){
		new File(path, name).createNewFile();
		return File;
	},
	deleteF:function(path){
		try{var filed = new java.io.File(path);
			if(filed.isDirectory()){
			var directoryFiles = filed.listFiles();
			for(var i in directoryFiles){
				FileAPI.deleteF(directoryFiles[i].getAbsolutePath());
			}
			filed.deleteF();
		}
			if(filed.isFile()){
			filed.deleteF();}
		}catch(e){
			print(e);
		}
	},
	read:function(selectedFile){
		var readed=(new BufferedReader(new FileReader(selectedFile)));
		var data=new StringBuilder();
		var string;
		while((string=readed.readLine())!=null){
			data.append(string);
			data.append('\n');
		}
		return data.toString();
	},
	readLine:function(selectedFile, line){
		var readT=new FileAPI.read(selectedFile);
		var lineArray=readT.split('\n');
		return lineArray[line-1];
	},
	write:function(selectedFile , text){
		FileAPI.rewrite(selectedFile,(new FileAPI.read(selectedFile)) + text);
	},
	rewrite:function(selectedFile, text){
		var writeFOS = new FOS(selectedFile);
		writeFOS.write(new String(text).getBytes());
	},
	getFilesList:function(path, endsWith){
		var c = [], d = (new java.io.File(path)).listFiles();
		for(var e = 0; e < d.length; e++) {
			var f = d[e];
			f.isDirectory() || endsWith && !f.getName().endsWith(endsWith) || c.push(f.getName())
		}
		return c
	}
};
/*
	┬─┬ノ( º _ ºノ) 
*/












// file: UI/modules/export.js

var export = function(e){
	let file = FileAPI.select(__dir__+"guis", c.standart.header.text.text+".js");
	if(FileTools.isExists(__dir__+"guis")==false)
		FileAPI.createNewDir(__dir__,"guis");
	if(FileTools.isExists(__dir__+"guis/"+c.standart.header.text.text+".js")==false)
		FileAPI.create(__dir__+"guis", c.standart.header.text.text+".js");
	FileAPI.rewrite(file, "");
	let i = e.elements;
	if(i!="add" && i!="up" && i!="down" && i!="left" && i!="right" && i!="scale_up" && i!="scale_down" && i!="export" && i!="element_text"){
		let full = "var testUI = new UI.StandartWindow({\n\tstandart: { header: {text: { text: { \"Created With UIEditor\"}}},\n\tdrawing: "+e.drawing +"\n\telements: "+e.elements+"\n});";
		FileAPI.write(file, full);
	}
}, exportText = function(text, rewrite){
	let file = FileAPI.select(__dir__+"guis", "text.js");
	if(FileTools.isExists(__dir__+"guis")==false)
		FileAPI.createNewDir(__dir__,"guis");
	if(FileTools.isExists(__dir__+"guis/text.js")==false)
		FileAPI.create(__dir__+"guis", "text.js");
	if(rewrite)FileAPI.rewrite(file, "");
	FileAPI.write(file, text);
};




// file: UI/modules/text.js

var text = {
	set: function(){
		values.content.setText("element_text", this.setText());
	},
	setText: function(){
		let u = editorUI.current;
		let e = editorUI.main.Window.getGuiContent().elements[u];
		if(e.scale!=undefined)var scale = ", scale: "+e.scale; else var scale = "";
		if(e.size!=undefined)var size = ", size: "+e.size; else var size = "";
		if(e.bitmap!=undefined)var bitmap = ", bitmap: \""+e.bitmap+"\""; else var bitmap = "";
		if(e.bitmap2!=undefined)var bitmap2 = ", bitmap2: \""+e.bitmap2+"\""; else var bitmap2 = "";
		if(e.text!=undefined)var text = ", text: \""+e.text+"\""; else var text = "";
		if(e.direction!=undefined)var direction = ", direction: "+e.direction; else var direction = "";
		if(e.value!=undefined)var value = ", value: "+e.value; else var value = "";
		props = "\""+u+"\": {type: \""+e.type+"\", x: "+e.x+", y: "+e.y+scale+size+bitmap+bitmap2+text+direction+value+"},";
		return props;
	}
};




// file: UI/modules/Widgets.js

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
	check: function(image, isPath) {
		if(!isPath){return image && new java.io.File(__dir__ + "gui/UI/" + image + ".png").exists();}
		else {return image && new java.io.File(image).exists();}
	},
	bitmap: function(file, scale, isPath) {
		if(!this.check(file, isPath)) return null;
		var bitmap = "";
		if(isPath){	bitmap = FileTools.ReadImage(file);	}else{	bitmap = FileTools.ReadImage(__dir__ + "gui/UI/" + file + ".png");	}
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
	linear: function(views, orientation, gravity, params, color) {
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
	image: function(file, scale, params, isPath) {
		var image = new android.widget.ImageView(this.ctx);
		if(file) image.setImageDrawable(this.bitmap(file, scale, isPath));
		if(params) image.setLayoutParams(params);
		return image;
	},
	text: function(msg, size, gravity, params, color) {
		var text = new android.widget.TextView(this.ctx);
		text.setText((msg != null) ? msg : "");
		if(size != null) text.setTextSize(this.resize(size));
		text.setTextColor(color || this.color.WHITE);
		text.setGravity(gravity || this.gravity.left);
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




// file: UI/modules/Window.js

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
					var animate = android.view.animation.TranslateAnimation(0, (type == "menu") ? -widget.layout.getWidth() : (type == "right") ? widget.layout.getWidth() : 0, 0, 0);
					widget.layout.startAnimation(animate);
					animate.setDuration(400);
					widget.layout.postDelayed(new java.lang.Runnable({
						run: function() {
							Widgets.run(function() {
								widget.name = name;
								widget.parent.removeAllViews();
								widget.parent.addView(layout);
								widget.layout = layout;
								var animate = android.view.animation.TranslateAnimation((type == "menu") ? -widget.parent.getWidth() : (type == "right") ? widget.parent.getWidth() : 0, 0, 0, 0);
								layout.startAnimation(animate);
								animate.setDuration(400);
							});
						}
					}), 400);
				} else {
					var scroll = Widgets.scroll(layout);
					var window = Widgets.window(scroll,
						Widgets.gravity.top | Widgets.gravity["left"],
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
										widget.window.update(view ? (type == "menu") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
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
							widget.window.update(view ? (type == "menu") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
								view ? view.getY() : 0, Widgets.size.wrap, Widgets.size.wrap);
						}
					}
				} else {
					if(widget) Windows.closePopup(type);
					var scroll = Widgets.scroll(layout);
					var window = Widgets.window(scroll,
						view ? Widgets.gravity.top | Widgets.gravity[view.getParent().getTag()] : Widgets.gravity.center,
						view ? (type == "menu") ? view.getWidth() : (type == "right") ? view.getWidth() + layout.getWidth() : 0 : 0,
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




// file: UI/functions/dialog.js

function dialog(properties) {
	Widgets.run(function() {
		var builder = new android.app.AlertDialog.Builder(Widgets.ctx, Widgets.dialogTheme);
		
		if(properties.title != null) builder.setTitle(properties.title);
		if(properties.message != null) builder.setMessage(properties.message);
		if(properties.view != null) builder.setView(properties.view);
		if(properties.cancelable != null) builder.setCancelable(properties.cancelable);
		
		if(properties.items != null) {
			var items = properties.items;
			builder.setItems(items.text, items.click ? function(interface, item) {
				try {
					items.click(interface, item);
				} catch(e) {}
			} : null);
		}
	
		if(properties.multi != null) {
			var multi = properties.multi;
			builder.setMultiChoiceItems(multi.text, multi.check ? multi.check : null, multi.click ? function(interface, item, active) {
				try {
					multi.click(interface, item, active);
				} catch(e) {}
			} : null);
		}
		
		if(properties.buttons != null) {
			var text = properties.buttons.text || [];
			var click = properties.buttons.click || [];
			if(text[0]) {
				builder.setNeutralButton(text[0], click[0] ? function() {
					try {
						click[0]();
					} catch(e) {}
				} : null);
			} if(text[1]) {
				builder.setNegativeButton(text[1], click[1] ? function() {
					try {
						click[1]();
					} catch(e) {}
				} : null);
			} if(text[2]) {
				builder.setPositiveButton(text[2], click[2] ? function() {
					try {
						click[2]();
					} catch(e) {}
				} : null);
			}
		}
		
		var build = builder.create();
		if(properties)build.show();
		return build;
	});
}




// file: UI/functions/animate.js

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




// file: UI/functions/addWidgets.js

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




// file: UI/functions/createPopup.js

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




// file: UI/modules/editor.js

/*
	┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
*/

var gui = {
	x: 60, y: 60, //positions
	s: 3.2, m: 3.3, b: 3.4, //scales
	bg: {type: "background", color: null} //background null
};
var editorUI = {
	deleted: 0,
	name: null,
	current: null,
	count: 0,
	main: {
		Window: new UI.StandartWindow({
			standart: { header: {text: {text: "UI Editor"}},
			background: {color: android.graphics.Color.rgb(179, 179, 179)}},
			drawing: [], elements: {
				"test": {type: "button", x: 100, y: 100, scale: 3.2, size: 40, bitmap: "button_element", clicker: {onClick: function(){edit(["select", "test"]);}}},
			} }),
		container: null
	},/*
	addUIElement: function(name, prop){
		editorUI.main.Window.content.elements[name] = prop;
	},
	removeUIElement: function(){
		editorUI.main.Window.content.elements[editorUI.name].remove();
		editorUI.current = null;
		editorUI.matchCount();
	},*/
	open: function(){
		let ui = editorUI.main;
		if(ui.enabled != true){
			ui.container = new UI.Container();
			ui.container.openAs(ui.Window);
			ui.enabled = true;
		}else{this.close();}
	},/*
	matchCount: function(){
		let count = 0;
		for(let i in editorUI.main.Window.content.elements)
			count++;
		editorUI.count = count;
		alert(editorUI.count);
	},*/
	close: function() {
		let ui = editorUI.main;
		ui.container.close();
		ui.container = null;
		ui.enabled = false;
	}/*,
	setCurrent: function(name) {
		if(name == editorUI.name){
			editorUI.current = null;
			editorUI.name = null;
			alert("Current element: unselected!");
		}else{
			editorUI.current = editorUI.main.Window.content.elements[name];
			alert("Current element: "+name+" selected!");
			editorUI.name = name;
		}
	}*/
};
function edit(changes, longclick, alertEnabled){
	var cur = editorUI.current,
		c = changes[0], // selected option
		name = changes[1], // name of element
		props = changes[2]; // props for element
	if(editorUI.current!=null){
		if(longclick==true){
			if(c=="right")cur.x+=10;
			if(c=="left")cur.x-=10;
			if(c=="down")cur.y+=10;
			if(c=="up")cur.y-=10;
		}else{
			if(c=="right")cur.x+=1;
			if(c=="left")cur.x-=1;
			if(c=="down")cur.y+=1;
			if(c=="up")cur.y-=1;
			if(c=="scaleUp")cur.scale+=0.1;
			if(c=="scaleDown")cur.scale-=0.1;
			if(c=="sizeUp")cur.size+=1;
			if(c=="sizeDown")cur.si
		}
	}
	if(c=="remove"){
		if(cur){
			editorUI.main.Window.content.elements[editorUI.name] = null;
			editorUI.deleted+=1;
			editorUI.name = null;
			editorUI.current = null;
			edit(["match"]);
		}else alert("No item selected");
	}
	if(c=="match"){
		let count = 0;
		count-=editorUI.deleted;
		for(let i in editorUI.main.Window.content.elements) count++;
		editorUI.count = count;
		if(alertEnabled!=false)
		alert("Elements in GUI Total = "+editorUI.count);
		return count;
	};
	if(c=="add")editorUI.main.Window.content.elements[name] = props;
	if(c=="select"){
		if(name == editorUI.name){
			editorUI.current = null;
			editorUI.name = null;
			alert("Current element: unselected!");
		}else{
			editorUI.current = editorUI.main.Window.content.elements[name];
			alert("Current element: "+name+" selected!");
			editorUI.name = name;
		}
	}
}




// file: UI/MainMenu.js

// TODO: Make clean code
// Popups widgets
var moving1 = {
	n1: { image: "bg"},
	up: { image: "button_up", click: function(v) {	edit(["up"]);	},
		clickLong: function(v) {	edit(["up", true]);	return false;} }, 
	n2: { image: "bg"}
}, 
moving2 = {
	menu: { image: "button_left", click: function(v) {	edit(["left"]);	},
		clickLong: function(v) {	edit(["left", true]);	return false;} }, 
	down: { image: "button_down", click: function(v) {	edit(["down"]);	},
		clickLong: function(v) {	edit(["down", true]);	return false;} }, 
	right: { image: "button_right", click: function(v) {	edit(["right"]);	},
		clickLong: function(v) {	edit(["right", true]);	return false;} }
}, 
toScaling = {
	scaleUp: { image: "button_scale_up", click: 
		function(v) {
			Widgets.run(function(){
				if(editorUI.current.size!=null)edit(["sizeUp"]);
				if(editorUI.current.scale!=null)edit(["scaleUp"]); 
			});
		}
	},
	scaleDown: { image: "button_scale_down", click: 
		function(v) {
			Widgets.run(function(){
				if(editorUI.current.size!=null)edit(["sizeDown"]);
				if(editorUI.current.scale!=null)edit(["scaleDown"]); 
			});
		}
	}
}, 
toAdding = {
	element: { image: "button_element_add", click: function(v) { addElement(); } },
	drawing: { image: "button_drawing_add", click: function(v) { alert("Drawing adding"); } }
}, 
toRemoving = {
	element: { image: "button_element_remove", click: function(v) { edit(["remove"]); } },
	drawing: { image: "button_drawing_remove", click: function(v) { alert("Drawing removing");} }
}, 
toChanging = {
	bitmap: { image: "button_bitmap", click: function(v) { Widgets.run(function(){ selectBitmap(1); }); } }
}, 
start = {
	open: { image: "button_start", click: function(v) { Widgets.run(function(){
		Windows.closePopup("main");
		Windows.closeMenu("main");
		editorUI.open();
		Windows.menu("mainMenu", "main", addWidgetsFrom(menu));
	}); } }
},
menu = {
	scaling: { image: "button_scaling", click: function(v) { Widgets.run(function(){
		newPopup("main", toScaling, "Scaling", 0, 132, 135*2); 
	}); } },
	adding: { image: "button_add", click: function(v) { Widgets.run(function(){
		newPopup("main", toAdding, "Adding", 1, 132, 135*2); 
	}); } },
	moving: { image: "button_moving", click: function(v) { Widgets.run(function(){
		var v1 = [];
		v1.push(addWidgetsFrom(moving1, Widgets.orientate.horizontal));
		v1.push(addWidgetsFrom(moving2, Widgets.orientate.horizontal));
		newPopup("main", v1, "Moving", 1, 132*3, 135*2, true);
	}); } },
	removing: { image: "button_remove", click: function(v) { Widgets.run(function(){
		newPopup("main", toRemoving, "Removing", 3, 132, 135*2); 
	}); } },
	export: { image: "button_export", click: function(v) { Widgets.run(function(){ }); } },
	change: { image: "button_change", click: function(v) { Widgets.run(function(){
		newPopup("main", toChanging, "Changing", 5, 132, 135*1); 
	}); } },
	info: { image: "button_info", click: function(v) { Widgets.run(function(){
		if(editorUI.current){
			alert(editorUI.name+"\n")
			for(let i in editorUI.current)
			alert(i+": "+editorUI.current[i]);
		}
	}); } },
	selectElement: { image: "button_list", click: function(v) { Widgets.run(function(){
		selectElement();
	}); } },
	close: { image: "button_close", click: function(v) { Widgets.run(function(){
		Windows.closePopup("main");
		Windows.closeMenu("main");
		editorUI.close();
		Windows.menu("mainMenu", "main", addWidgetsFrom(start));
	}); } }
};
// Open after IC Loads
Callback.addCallback("PostLoaded", function (coords, item, block) {
	Windows.menu("mainMenu", "main", addWidgetsFrom(start));
});




