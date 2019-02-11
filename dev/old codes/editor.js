var values = {
	c: null,
	skip: 60,
	content: function(){if(this.c!=null || this.c!=undefined)return this.c.getGuiContent()},
	e: {name: null, el: function(){if(this.content!=null || this.content!=undefined)return this.content.elements[this.e.name]}}
};
var selector = {
	selected: null,
	list: function(){
		var files = FileTools.GetListOfFiles(__dir__+"gui");
		var list = new UI.Container();
		list.openAs(listUI);
	}
};
var editor = {
	init: {
		add: function() {
			let c = editorUI.add.Window.content;
			c.elements["element"]= {type: "button", x: gui.x+119.5, y: gui.y+11.5, scale: 2.6, size: 40, bitmap: "button_element", clicker: {onClick: function(){}}};
			c.elements["drawing"]= {type: "button", x: gui.x+11.5, y: gui.y+119.5, scale: 2.6, size: 40, bitmap:"button_drawing", clicker: {onClick: function(){}}};
		}
	}
	init: function(container){
		values.c = container;
		var c = container.content;
		let e=0;
		for(let i in c.elements){
			if(i!="add"){
				e++;
				let u = i;
				c.elements[i].clicker = {
					onClick: function(){
						values.e.name = u;
					}
				};
			}
		}
		alert("EditorMode: on\nGui: "+c.standart.header.text.text+"\nElements: "+e);
		c.elements["export"]= {type: "button", x: gui.x+119.5, y: gui.y+119.5, scale: 2.6, size: 40, bitmap:"button_export", clicker: {onClick: function(){export(c);}}};
		c.elements["element_text"]= {type: "text", x: 5, y: 30, width: 200, height: 30, text: "Current element: null, x: null, y: null, size: null, scale: null", font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18}};
	},
	mode: function(){
		var c = values.content();
		if(c.elements["add"].bitmap == "button_remove"){
			c.elements["add"].bitmap="button_add";
			for(let i in c.elements){
				if(i!="add"){
					let u = i;
					c.elements[u].y+=2000;
				}
			}
		}else{
			c.elements["add"].bitmap="button_remove";
			c.elements["add"].clicker = {
				onClick: function(){
					this.mode();
				}
			};
			for(let i in c.elements){
				if(i!="add"){
					let u = i;
					c.elements[u].y-=2000;
				}
			}
		}
	}
};
