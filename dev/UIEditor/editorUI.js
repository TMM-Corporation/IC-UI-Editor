/*
	┻━┻ ︵ヽ(`Д´)ﾉ︵ ┻━┻
*/

var gui = {
	x: 60, y: 60, //positions
	s: 3.2, m: 3.3, b: 3.4, //scales
	bg: {type: "background", color: null} //background null
};
var editorUI = {
	elementIndex: 0,
	texture: null,
	current: null,
	main: {
		Window: new UI.StandartWindow({
			standart: { header: {text: {text: "UI Editor"}},
			background: {color: android.graphics.Color.rgb(179, 179, 179)}},
			drawing: [], elements: {} }),
		container: null
	},
	menu: {
		Window: new UI.Window({
			location: { x: 0, y: 80, width: 60, height: 300 },
				drawing: [gui.bg], elements: {} }),
		container: null, enabled: false
	},
	moving: {
		Window: new UI.Window({
			location: { x: 60, y: 80, width: 180, height: 121},
			drawing: [gui.bg], elements: {} }),
		container: null, enabled: false
	},
	scaling: {
		Window: new UI.Window({
			location: { x: 60, y: 200, width: 120, height: 60 },
			drawing: [gui.bg], elements: {} }),
		container: null, enabled: false
	},
	adding: {
		Window: new UI.Window({
			location: { x: 60, y: 260, width: 120, height: 120 },
			drawing: [gui.bg], elements: {} }),
		container: null, enabled: false
	},
	list: {
		Window: new UI.Window({
			location: { x: 1000/2-240, y: UI.getScreenHeight()/2-180, width: 480, height: 360},
			drawing: [gui.bg, {type: "frame", bitmap: "frame", width: 1000, height: 750, scale: 10}], elements: {} }),
		container: null, enabled: false
	},
	textureList: {
		scroll: 0,
		Window: null,
		container: null, enabled: false
	},
	addUIElement: function(ui, name, prop){
		ui.Window.content.elements[name] = prop;
	},
	reOpenAll: function(){
		for(let i in editorUI){
			let u = i;
			let ui = editorUI[u];
			if(ui.enabled != false){
				editorUI.open(ui);
				editorUI.open(ui)
			}
		}
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
	}
};
