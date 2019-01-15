var addToUI = {
	e: function(){let i = editorUI.main.container.getGuiContent(); if(i!=null)return i;},
	toMenu: function(){
		editorUI.addUIElement(editorUI.menu, "start", {type: "button", x: 0, y: 0, scale: 56, bitmap: "button_start",
			clicker: {onClick: function(){editorUI.open(editorUI.main); }}});
		editorUI.addUIElement(editorUI.menu, "moving", {type: "button", x: 0, y: 1000, scale: 55.9, bitmap: "button_moving",
			clicker: {onClick: function(){editorUI.open(editorUI.moving);}}});
		editorUI.addUIElement(editorUI.menu, "scaling", {type: "button", x: 0, y: 2000, scale: 55.9, bitmap: "button_scaling",
			clicker: {onClick: function(){editorUI.open(editorUI.scaling);}}});
		editorUI.addUIElement(editorUI.menu, "add", {type: "button", x: 0, y: 3000, scale: 55.9, bitmap: "button_add",
			clicker: {onClick: function(){editorUI.open(editorUI.adding);}}});
		editorUI.addUIElement(editorUI.menu, "export", {type: "button", x: 0, y: 4000, scale: 55.9, bitmap: "button_export", 
			clicker: {onClick: function(){export(this.e);}}});
	},
	toMoving: function(){
		editorUI.addUIElement(editorUI.moving, "up", {type: "button", x: 1000/3, y: 0, scale: 18.5, bitmap: "button_up", clicker: {onClick: function(){button.up(this.e);}}});
		editorUI.addUIElement(editorUI.moving, "down", {type: "button", x: 1000/3, y: 320, scale: 18.5, bitmap: "button_down", clicker: {onClick: function(){button.down(this.e);}}});
		editorUI.addUIElement(editorUI.moving, "left", {type: "button", x: 0, y: 320, scale: 18.5, bitmap: "button_left", clicker: {onClick: function(){button.left(this.e);}}});
		editorUI.addUIElement(editorUI.moving, "right", {type: "button", x: (1000/3)+(1000/3), y: 320, scale: 18.5, bitmap: "button_right", clicker: {onClick: function(){button.right(this.e);}}});
	},
	toScaling: function(){
		editorUI.addUIElement(editorUI.scaling, "scale_up", {type: "button", x: 0, y: 0, scale: 27.9, bitmap: "button_scale_up", clicker: {onClick: function(){button.scaleUp(this.e);}}});
		editorUI.addUIElement(editorUI.scaling, "scale_down", {type: "button", x: 500, y: 0, scale: 27.9, bitmap:"button_scale_down", clicker: {onClick: function(){button.scaleDown(this.e);}}});
	},
	toAdding: function(){
		editorUI.addUIElement(editorUI.adding, "element_add", {type: "button", x: 0, y: 0, scale: 27.9, bitmap: "button_element_add", clicker: {onClick: function(){button.addElement(this.e);}}});
		editorUI.addUIElement(editorUI.adding, "drawing_add", {type: "button", x: 500, y: 0, scale: 27.9, bitmap: "button_drawing_add", clicker: {onClick: function(){button.addDrawing(this.e);}}});
		editorUI.addUIElement(editorUI.adding, "element_remove", {type: "button", x: 0, y: 500, scale: 27.9, bitmap: "button_element_remove", clicker: {onClick: function(){button.removeElement(this.e);}}});
		editorUI.addUIElement(editorUI.adding, "drawing_remove", {type: "button", x: 500, y: 500, scale: 27.9, bitmap: "button_drawing_remove", clicker: {onClick: function(){button.removeDrawing(this.e);}}});
	}
}
addToUI.toMenu();
addToUI.toMoving();
addToUI.toScaling();
addToUI.toAdding();
addToUI.toTextureList();
addToUI.toList();



























