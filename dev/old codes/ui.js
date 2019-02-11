// открытие интерфейса нажатием

Callback.addCallback("PostLoaded", function (coords, item, block) {
		openUI();
});

// контекст и виджеты
var ctx = UI.getContext();
var widgetsWindow;
var exitWindow;

// запуск в потоке интерфейса
function runUI(code) {
	ctx.runOnUiThread(function () {
		try {
			code();
		} catch (e) {
			showError(e);
		}
	});
}

// сообщение об ошибке
function showError(e) {
	runUI(function () {
		var builder = new android.app.AlertDialog.Builder(ctx, 16974126);
		builder.setTitle("___________Script error___________");
		var line = e.lineNumber;
		builder.setMessage(e + " [Line #" + (line-303) + "]\n[Line main.js#" + (line+1) + "]");
		//builder.setPositiveButton("OK", null);
		//builder.setNeutralButton("Copy", function (v) {
		//	runUI(function () {
		//		ctx.getSystemService(anldroid.content.Context.CLIPBOARD_SERVICE).setText(e + " at line " + e.lineNumber);
		//	});
		//});
		builder.create().show();
	});
}
// закрытие интерфейса
function closeUI() {
	runUI(function () {
		if (window) {
			window.dismiss();
			window = null;
		}
	});
}

// открытие интерфейса
function openUI() {
	runUI(function () {
		var runs = {
			main: true,
			first: false
		};
		var views = {
			add1: {
				image: "button_add",
				click: function(v) {
					alert("clicked1");
					let window = new android.widget.PopupWindow(s, Widgets.size.wrap, Widgets.size.wrap);
					if(running.first == false)
						runUI(function () {
							let l = addWidgets(views, Widgets.orientate.horizontal),
									s = Widgets.scroll(l, Widgets.orientate.horizontal);
							window.showAtLocation(ctx.getWindow().getDecorView(), Widgets.gravity.left | Widgets.gravity.top, 132, 0);
							running.first = true;
						});
					else window.dismiss(), running.first = false;
				}
			},
			add2: {
				image: "button_add",
				click: function(v) {
					alert("clicked2");
				}
			}
		};
		var l = addWidgets(views, Widgets.orientate.vertical);
		var s = Widgets.scroll(l, Widgets.orientate.vertical);
		var window = new android.widget.PopupWindow(s, Widgets.size.wrap, Widgets.size.wrap, false);
		window.showAtLocation(ctx.getWindow().getDecorView(), 0, 0, 0);
	});
};
