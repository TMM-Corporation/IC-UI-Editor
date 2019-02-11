/*
	┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
*/

var gui = {
	x: 60, y: 60, //positions
	s: 3.2, m: 3.3, b: 3.4, //scales
	bg: {type: "background", color: null} //background null
};
var editorUI = {
	name: null,
	current: null,
	main: {
		Window: new UI.StandartWindow({
			standart: { header: {text: {text: "UI Editor"}},
			background: {color: android.graphics.Color.rgb(179, 179, 179)}},
			drawing: [], elements: {
				"test": {type: "button", x: 100, y: 100, scale: 3.2, size: 40, bitmap: "button_element", clicker: {onClick: function(){editorUI.setCurrent("test");}}},
			} }),
		container: null
	},
	addUIElement: function(name, prop){
		editorUI.main.Window.content.elements[name] = prop;
	},
	removeUIElement: function(){
		editorUI.main.Window.content.elements[editorUI.name] = null;
	},
	open: function(ui){
		if(ui.enabled != true){
			ui.container = new UI.Container();
			ui.container.openAs(ui.Window);
			ui.enabled = true;
		}else{this.close(ui);}
	},
	close: function(ui) {
		ui.container.close();
		ui.container = null;
		ui.enabled = false;
	},
	setCurrent: function(name) {
		editorUI.current = editorUI.main.Window.content.elements[name];
		editorUI.name = name;
	}
};
