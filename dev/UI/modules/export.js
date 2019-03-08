function exportElement(e, name){
	// e - element
	var props= "\n\t\t\""+name+"\""+": {", count = 0, cur = 0;
	for(let i in e)count++;
	for(let u in e){
		cur++; let i = u;
		if(cur!=count){
			if(i!="clicker" && i!="onClick" && i!="onLongClick" && i!="overlay" && i!="overlayScale" && i!="overlayOffset" && i!="invert")
			if(i=="type")props+= i+": \""+e[i]+"\""
			else{
				if(i=="bitmap" || i=="bitmap2" || i=="text")
				props+= ", "+i+": \""+e[i]+"\""
				else props+= ", "+i+": "+e[i];
			}
		}else props+= "},";
	}
	return props;
}
function exportUI(rewrite){
	let files = FileTools.GetListOfFiles(__dir__+"guis/"),
		count = 0,
		ui = editorUI.main.Window.content;
	if(FileTools.isExists(__dir__+"guis")==false) FileAPI.createNewDir(__dir__, "guis");
	for(let i in files)count+=1;
	if(rewrite==true){var name = "CustomUI_"+count+".js";}else{var name = "CustomUI_"+(count+1)+".js";}
	let dir = __dir__+"guis/"+name;
	let exporting = "var custom_UI = new UI.StandartWindow({\n\tstandart: {header: {text: {text: \"Created With UIEditor\"}}\n\tbackground: {color: android.graphics.Color.rgb(179, 179, 179)}, inventory: {standart: true}},\n\tdrawing: [],\n\telements: {";
	for(let u in ui.elements){
		let i = u, el="";
		if(ui.elements[u]!=null)
		el = exportElement(ui.elements[u], u)
		exporting+=el;
	} exporting+="\n\t}\n});";
	FileTools.WriteText(dir, exporting);
	if(FileTools.isExists(__dir__+"guis")==true)alert("Exported with name "+name);
	else alert("Error exporting");
}
