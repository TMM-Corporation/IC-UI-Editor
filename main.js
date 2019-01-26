/*
NIDE BUILD INFO:
  dir: dev
  target: main.js
  files: 1
*/



// file: ui.js

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
		builder.setTitle("______________________Script error______________________");
		var line = e.lineNumber;
		builder.setMessage(e + " [#" + (line-10) + " line ]");
		//builder.setPositiveButton("OK", null);
		//builder.setNeutralButton("Copy", function (v) {
		//	runUI(function () {
		//		ctx.getSystemService(android.content.Context.CLIPBOARD_SERVICE).setText(e + " at line " + e.lineNumber);
		//	});
		//});
		builder.create().show();
	});
}
// закрытие интерфейса
function closeUI() {
	runUI(function () {
		if (widgetsWindow) {
			widgetsWindow.dismiss();
			widgetsWindow = null;
		}
		if (exitWindow) {
			exitWindow.dismiss();
			exitWindow = null;
		}
	});
}

// открытие интерфейса
function openUI() {
	runUI(function () {
		// разметка с виджетами
		var pane = new android.widget.LinearLayout(ctx);
		pane.setOrientation(android.widget.LinearLayout.VERTICAL);

		// кнопка
		var button1 = new android.widget.ImageView(ctx);
		var bitmap = new android.graphics.BitmapFactory.decodeFile(__dir__+"/gui/button_add.png");
		button1.setBackgroundDrawable(android.graphics.drawable.BitmapDrawable(bitmap));

		// добавление к разметке
		pane.addView(button1);

		// создание окна с виджетами
		widgetsWindow = new android.widget.PopupWindow(pane, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		widgetsWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);

		// разметка с кнопкой выхода
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(android.widget.LinearLayout.VERTICAL);

		// кнопка выхода
		var button = new android.widget.Button(ctx);
		button.setText("Exit");
		var file = new android.graphics.BitmapFactory.decodeFile(__dir__+"/gui/button_add.png");
		var bitmap = new android.graphics.Bitmap.createBitmap(file, 16, 16, 16, 16);
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
