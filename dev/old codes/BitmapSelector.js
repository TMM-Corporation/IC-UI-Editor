var bS = {
	WGroup: new UI.WindowGroup(),
	container: null, enabled: false
	setWindowContent: function(){
		var windowList = new UI.Window({
			location: { x: 1000/2-240, y: UI.getScreenHeight()/2-180, width: 480, height: 360}, 
			drawing: [gui.bg, {type: "frame", bitmap: "frame", width: 1000, height: 750, scale: 10}], elements: {} }),
		var windowTextureSelector = 
		var scroll = 0, e={}, files = FileAPI.getFilesList(__dir__+"gui/"); 
		for(let i in files) let o = i, e["text"+o] = {type: "text", x: 0, y: 60*o, text: files[o], clicker: {onClick: function(){editorUI.texture= files[o].replace('.png', ''); alert(files[o].replace('.png', ''));}}, font: {color: android.graphics.Color.WHITE, shadow: 0.3, size: 50}}, u++;
		var windowTextureSelector = new UI.Window({
			location: { x: 1000/2-200, y: UI.getScreenHeight()/2-150, width: 405, height: 330, scrollHeight: (24.5*u)}, 
			drawing: [gui.bg], elements: e });
		//var title = w["selectText", {type: "text", x: 250, y: 0, text: "Select Texture", font: {color: android.graphics.Color.WHITE, shadow: 0.3, size: 50}});
	}
};
/*
	//exportText(files[i].replace('.png', '')+":"+files[i]+"\n");
	//alert("scrollHeight: "+ content.Window.content.location.scrollHeight);
*/












