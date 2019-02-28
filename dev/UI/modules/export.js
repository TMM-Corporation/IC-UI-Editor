function exportUI(e){
	let files = FileTools.GetListOfFiles(__dir__+"dev/guis/"),
		dir = __dir__+"dev/guis",
		count = 0,
		including = "";
		file = FileAPI.select(dir, "UI_"+(count+1)+".js"),
		includes_file = FileAPI.select(__dir__+"dev",".includes"),
		includes ="UI/dialogs/select_type.js\n UI/dialogs/select_bitmap.js\n UI/dialogs/selectFromList.js\n\n UI/modules/FileAPI.js\n UI/modules/export.js\n UI/modules/text.js\n\n UI/modules/Widgets.js\n UI/modules/Window.js\n\n UI/functions/dialog.js\n UI/functions/animate.js\n UI/functions/addWidgets.js\n UI/functions/createPopup.js\n\n UI/modules/editor.js\n UI/MainMenu.js\n";
	for(let i in files){
		let u = i;
		u=u.replace(__dir__+"dev/guis/", "");
		u=u+"";
		count++;
		including+="guis/"+i;
	}
	if(FileTools.isExists(dir)==false)
		FileAPI.createNewDir(dir);
	if(FileTools.isExists(dir+"/UI_"+count+".js")==false)
		FileAPI.create(dir, "UI_"+(count+1)+".js");
	FileAPI.rewrite(includes_file, includes+including);
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
