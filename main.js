/*
BUILD INFO:
  dir: dev
  target: main.js
  files: 7
*/



// file: UIEditor/modules/export.js

var export = function(e){
	let file = FileAPI.select(__dir__+"guis", c.standart.header.text.text+".js");
	if(FileTools.isExists(__dir__+"guis")==false)
		FileAPI.createNewDir(__dir__,"guis");
	if(FileTools.isExists(__dir__+"guis/"+c.standart.header.text.text+".js")==false)
		FileAPI.create(__dir__+"guis", c.standart.header.text.text+".js");
	FileAPI.rewrite(file, "");
	let i = e.elements;
	if(i!="add" && i!="up" && i!="down" && i!="left" && i!="right" && i!="scale_up" && i!="scale_down" && i!="export" && i!="element_text"){
		let full = "var testUI = new UI.StandartWindow({\n\tstandart: { header: {text: { text: { \"Created With UIEditor\"}}},\n\tdrawing: "+e.drawing +"\n\telements: "+e.elements+"\n});";
		FileAPI.write(file, full);
	}
}, 
exportText = function(text, rewrite){
	let file = FileAPI.select(__dir__+"guis", "text.js");
	if(FileTools.isExists(__dir__+"guis")==false)
		FileAPI.createNewDir(__dir__,"guis");
	if(FileTools.isExists(__dir__+"guis/text.js")==false)
		FileAPI.create(__dir__+"guis", "text.js");
	if(rewrite)FileAPI.rewrite(file, "");
	FileAPI.write(file, text);
};




// file: UIEditor/FileAPI.js

/*
	(╯°□°）╯︵ ┻━┻
*/
var File = java.io.File;
var FileReader = java.io.FileReader;
var BufferedReader = java.io.BufferedReader;
var FOS = java.io.FileOutputStream;
var String = java.lang.String;
var StringBuilder = java.lang.StringBuilder;
var sdcard = android.os.Environment.getExternalStorageDirectory();
var FileAPI={
	getName: function(dir){
		let name = new File(dir).name;
		return(name.replace('.png', ''));
	},
	select:function(dir,Name){
		return (new File(dir,Name));
	},
	createNewDir:function(dir, newDirName){
		return (new File(dir, newDirName).mkdir());
	},
	exists:function(file){
		return file.exist();
	},
	create:function(path, name){
		new File(path, name).createNewFile();
		return File;
	},
	deleteF:function(path){
		try{var filed = new java.io.File(path);
			if(filed.isDirectory()){
			var directoryFiles = filed.listFiles();
			for(var i in directoryFiles){
				FileAPI.deleteF(directoryFiles[i].getAbsolutePath());
			}
			filed.deleteF();
		}
			if(filed.isFile()){
			filed.deleteF();}
		}catch(e){
			print(e);
		}
	},
	read:function(selectedFile){
		var readed=(new BufferedReader(new FileReader(selectedFile)));
		var data=new StringBuilder();
		var string;
		while((string=readed.readLine())!=null){
			data.append(string);
			data.append('\n');
		}
		return data.toString();
	},
	readLine:function(selectedFile, line){
		var readT=new FileAPI.read(selectedFile);
		var lineArray=readT.split('\n');
		return lineArray[line-1];
	},
	write:function(selectedFile , text){
		FileAPI.rewrite(selectedFile,(new FileAPI.read(selectedFile)) + text);
	},
	rewrite:function(selectedFile, text){
		var writeFOS = new FOS(selectedFile);
		writeFOS.write(new String(text).getBytes());
	},
	getFilesList:function(path, endsWith){
		var c = [], d = (new java.io.File(path)).listFiles();
		for(var e = 0; e < d.length; e++) {
			var f = d[e];
			f.isDirectory() || endsWith && !f.getName().endsWith(endsWith) || c.push(f.getName())
		}
		return c
	}
};
/*
	┬─┬ノ( º _ ºノ) 
*/












// file: UIEditor/editorUI.js

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




// file: UIEditor/modules/addToUI.js

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































// file: UIEditor/modules/buttons.js

var button = {
	up: function(){
		editorUI.current.y-=1;
		text.set();
	},
	down: function(){
		editorUI.current.y+=1;
		text.set();
	},
	left: function(){
		editorUI.current.x-=1;
		text.set();
	},
	right: function(){
		editorUI.current.x+=1;
		text.set();
	},
	scaleUp: function(){
		if(editorUI.current.size)
		editorUI.current.size+=1;
		if(editorUI.current.scale)
		editorUI.current.scale+=0.1;
		text.set();
	},
	scaleDown: function(){
		if(editorUI.current.size)
		editorUI.current.size-=1;
		if(editorUI.current.scale)
		editorUI.current.scale-=0.1;
		text.set();
	},
	addElement: function(){
		addToUI.toList("select");
		editorUI.open(editorUI.list);
		editorUI.open(editorUI.textureList);
	}
};




// file: UIEditor/modules/text.js

var text = {
	set: function(){
		values.content.setText("element_text", this.setText());
	},
	setText: function(){
		let u = editorUI.current;
		let e = editorUI.main.Window.getGuiContent().elements[u];
		if(e.scale!=undefined)var scale = ", scale: "+e.scale; else var scale = "";
		if(e.size!=undefined)var size = ", size: "+e.size; else var size = "";
		if(e.bitmap!=undefined)var bitmap = ", bitmap: \""+e.bitmap+"\""; else var bitmap = "";
		if(e.bitmap2!=undefined)var bitmap2 = ", bitmap2: \""+e.bitmap2+"\""; else var bitmap2 = "";
		if(e.text!=undefined)var text = ", text: \""+e.text+"\""; else var text = "";
		if(e.direction!=undefined)var direction = ", direction: "+e.direction; else var direction = "";
		if(e.value!=undefined)var value = ", value: "+e.value; else var value = "";
		props = "\""+u+"\": {type: \""+e.type+"\", x: "+e.x+", y: "+e.y+scale+size+bitmap+bitmap2+text+direction+value+"},";
		return props;
	}
};




// file: UIEditor/modules/launch.js

Callback.addCallback("PostLoaded", function () {
	editorUI.open(editorUI.menu);
});




