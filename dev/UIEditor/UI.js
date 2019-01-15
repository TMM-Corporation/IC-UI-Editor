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
			? (value * Settings.config.interfaceScaling / 800 * this.display.width)
			: (value * Settings.config.interfaceScaling / 480 * this.display.height);
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
// TODO: remake ui



var androidUI = {
	ctx = UI.getContext(),
	widgetsWindow = null,
	exitWindow = null,
	runUI: function(ui) {
		this.ctx.runOnUiThread(function(){ try { ui(); } catch (e) { showError(e); });
	},
	closeUI: function(){
		this.runUI(function(){
			if (widgetsWindow) {
				this.widgetsWindow.dismiss();
				this.widgetsWindow = null;
			}if (exitWindow) {
				this.exitWindow.dismiss();
				this.exitWindow = null;
			}
		});
	},
/*
					 _________________
		   	///                 \\\
			//                       \\
	   //	 												\\
		||                          ||
		||  __[-] Вход В Жопу [-]_  ||
		||                          ||
		||      []          []      ||
		||      []          []      ||
		||      [][][][][][][]      ||
		||                          ||
		||                          ||
		||                          ||
		||                          ||
		||                          ||
		||                          ||
		||                          ||
		||                          ||
		||__________      __________||
	//          \\     //          \\
 //						 \\   ||            \\
||						 ||   \\            ||
||             ||   \\            ||
\\					  //     \\          //
 \\__________//       \\________//
*/
	openUI: function(){
		runUI(function(){
			// разметка с виджетами
			var layout = new android.widget.LinearLayout(this.ctx);
			layout.setOrientation(android.widget.LinearLayout.VERTICAL);

			// фоновое изображение
			var backgroundView = new android.widget.ImageView(ctx);
			var bitmap = new android.graphics.BitmapFactory.decodeFile("/sdcard/Pictures/test.png");
			backgroundView.setBackgroundDrawable(android.graphics.drawable.BitmapDrawable(bitmap));

			// добавление к разметке
			layout.addView(backgroundView);

			// создание окна с виджетами
			widgetsWindow = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			widgetsWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);

			// разметка с кнопкой выхода
			var layout = new android.widget.LinearLayout(ctx);
			layout.setOrientation(android.widget.LinearLayout.VERTICAL);

			// кнопка выхода
			var button = new android.widget.Button(ctx);
			button.setText("Exit");
			var file = new android.graphics.BitmapFactory.decodeFile("/sdcard/Pictures/exit.png");
			var bitmap = new android.graphics.Bitmap.createBitmap(file, 1 + 16, 1, 16, 16);
			button.setBackgroundDrawable(android.graphics.drawable.BitmapDrawable(bitmap));

			// выход при нажатии
			button.setOnClickListener(function (v) {
				closeUI();
			});

			// добавление к разметке
			layout.addView(button);
			var code = new android.widget.EditText(ctx);
			code.setHint('//Your Code');
			layout.addView(code);

			// создание окна выхода
			exitWindow = new android.widget.PopupWindow(layout, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT,
				android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			exitWindow.showAtLocation(ctx.getWindow()
				.getDecorView(), android.view.Gravity.RIGHT | android.view.Gravity.TOP, 0, 0);
			//ридактар тикста

			exitWindow.setFocusable(true);

		});
	}
}
