var uiWidgets = {
	start = {
		open: {
			image: "button_start", click: function (v) {
				Widgets.run(function () {
					WindowManager.closePopup("main");
					WindowManager.closeMenu("main");
					editorUI.open();
					WindowManager.menu("mainMenu", "main", addWidgetsFrom(menu));
				});
			}
		}
	}
}
function mainBuilder() {
	var config = {
		rows: 3,
		columns: 3
	};
	Callback.addCallback("PostLoaded", function (coords, item, block) {
		WindowManager.menu("start", addWidgetsFrom(uiWidgets.start), null, Widgets.display.height-(Widgets.display.height/9), null, Widgets.display.height/9);
	});
}
