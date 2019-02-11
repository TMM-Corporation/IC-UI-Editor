var eEUI = {
	slot: {
		visual: false,
		bitmap: "slot",
		default: function(){
			var slot = eEUI.slot, preview = eEUI.slot.Window.elements["preview"];
				slot.visual=false; 
				preview.visual = slot.visual;
				preview.bitmap=slot.bitmap;
		},
		Window: new UI.Window({
			location: { x: 1000/2-240, y: UI.getScreenHeight()/2-180, width: 480, height: 360}, 
			drawing: [gui.bg, {type: "frame", bitmap: "frame", width: 1000, height: 750, scale: 10}], 
				elements: {
					"preview": {type: "slot", x: 0, y: 0, size: 60, visual: eEUI.slot.visual, bitmap: "????????", clicker: ?????? ??????? ?????, needClean: bool, isTransparentBackground: bool}
					"next": {type: "button", x: 0, y: 0, bitmap: "button_next", clicker: {
						onClick: function(){eEUI.slot.default();}}},
					"prev": {type: "button", x: 0, y: 0, bitmap: "button_prev"},
					"bitmapSelector": {type: "button", x: 0, y: 0, bitmap: "button_bitmap_selector", clicker: {
						onClick: function(){
							var slot = eEUI.slot, preview = eEUI.slot.Window.elements["preview"];
							
						}}},
					
					"visual": {type: "button", x: 853, y: 58, scale: 20, clicker: {
						onClick: function(){
							var state = eEUI.slot.visual; 
							if(state==true)state=false; else state=true; 
							eEUI.slot.Window.elements["preview"].visual = state;
						}}}
				} }),
		container: null, enabled: false
	},
	
}
var elemementList = {
	0: {type: "slot", x: UI.getScreenWidth()/2, y: 60, bitmap: "slot", size: 60},
	1: {type: "invSlot", x: UI.getScreenWidth()/2, y: 60, bitmap: "invSlot", size: 60},
	2: {type: "button", x: UI.getScreenWidth()/2, y: 60, bitmap: "button_off", bitmap2: "button_on"},
	3: {type: "closeButton", x: UI.getScreenWidth()/2, y: 60, bitmap: "button_off", bitmap2: "bitmap_on"},
	4: {type: "scale", x: UI.getScreenWidth()/2, y: 60, bitmap: "scale", direction: 1},
	5: {type: "text", x: UI.getScreenWidth()/2, y: 60, text: "Simple Text"},
	6: {type: "image", x: UI.getScreenWidth()/2, y: 60, bitmap: "image"},
};
var elementEditor = {
	current: 0,
	set: function(){
		if(elemementList[this.current+1] != undefined)
		this.current++;
		this.update;
	},
	update: function(){
		for(let i in elemementList)
		if(i != this.current) editorUI.elementEditor.Window.content.elements[i].y = -1000;
		else editorUI.elementEditor.Window.content.elements[i].y = 60;
	}
}























