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