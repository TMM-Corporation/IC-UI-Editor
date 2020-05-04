/**
 * @function test the code test
 * @arg getContext get mcpe contexts
 */
function test(code) { //test the code
		Widgets.context.runOnUiThread(function() {
				try {
						code();
				} catch(e) {
						android.widget.Toast.makeText(Widgets.ctx, e + " (#" + e.lineNumber + ")", android.widget.Toast.LENGTH_LONG).show();
				}
		});
};
var Widgets = {
    context: UI.getContext(),
    theme: 16974120, //Theme_DeviceDefault - android theme
    dialogTheme: 16974126, //Theme_DeviceDefault_Dialog - android default dialog theme
    size: {
        wrap: android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, //wraps the layout to content
        match: android.widget.RelativeLayout.LayoutParams.MATCH_PARENT //makes the width of layout to parent
    },
    display: {
        width: UI.getContext().getWindowManager().getDefaultDisplay().getWidth(), //gets the display width
        height: UI.getContext().getWindowManager().getDefaultDisplay().getHeight() //gets the display height
    },
    gravity: { // set the layout gravity
        top: android.view.Gravity.TOP,
        bottom: android.view.Gravity.BOTTOM,
        left: android.view.Gravity.LEFT,
        right: android.view.Gravity.RIGHT,
        center: android.view.Gravity.CENTER
    },
    visibility: { //visibility of object
        visible: android.view.View.VISIBLE,
        invisible: android.view.View.INVISIBLE,
        gone: android.view.View.GONE
    },
		color: function(color) {
			return android.graphics.Color.parseColor(color); //returns the custom color
		},
    font: android.graphics.Typeface.createFromFile(new java.io.File(FileTools.root + "games/com.mojang/innercore/mc-typeface.ttf")), //default minecraft font for text
    orientate: { //set the layout orientation
        vertical: android.widget.LinearLayout.VERTICAL, //vertical
        horizontal: android.widget.LinearLayout.HORIZONTAL
    },
    // resize: function(value, isWidth) {
    //     return isWidth
    //         ? (value * 1 / 800 * this.display.width)
    //         : (value * 1 / 480 * this.display.height);
    // },
    check: function(image, isPath) {
        if(!isPath){return image && new java.io.File(__dir__ + "gui/UI/" + image + ".png").exists();}
        else {return image && new java.io.File(image).exists();}
    },
    bitmap: function(file, scale, isPath) {
        if(!this.check(file, isPath)) return null;
        var bitmap = "";
        if(isPath){ bitmap = FileTools.ReadImage(file); }else{  bitmap = FileTools.ReadImage(__dir__ + "gui/UI/" + file + ".png");  }
        return android.graphics.drawable.BitmapDrawable(android.graphics.Bitmap.createScaledBitmap(android.graphics.Bitmap.createBitmap(bitmap, 0, 0, bitmap.getWidth(), bitmap.getHeight()), bitmap.getWidth() * (scale || 1), bitmap.getHeight() * (scale || 1), false));
    },
    parse: function(color) {
        return this.color.parseColor(color);
    },
    params: function(width, height) {
        return android.widget.LinearLayout.LayoutParams(this.resize(width, true), this.resize(height, false));
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
        for(let a in views)
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

function buildUI(type, name) {
	test(function() {
		var ui = FileTools.ReadJSON(__dir__+"ModUI/Menu.json");
		if(type == 1){
			for(let u in ui.menus){
				let i = u;
				if(i.name == name){
					buildWindow(i);
					break;
				}
			}
		}
	});
}
function buildWindow(ui) {
	var window = {};
	for(let i in ui){
		if(ui.add){
			window.push(addToUI(ui));
		}
	}
}
function addToUI(ui) {
	layout = {};
	for(let i in ui)
	if(ui.add){addToUI(addWidget(ui.add.i));};
}
function addWidget(ui) {
	
}
