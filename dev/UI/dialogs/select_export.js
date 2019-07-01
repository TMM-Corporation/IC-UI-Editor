function exportDial(){
	Widgets.run(function(){
		let dial = {	title: "Export Menu",
				buttons: {	text: ["Rewrite Last Saved", null, "Create new file"],
					click: [function(){exportUI(true);}, null, function(){exportUI(false);}]
				}
			};
		dialog(dial);
	});
};
function importDial(){
	Widgets.run(function(){
		var widgets = [],	files = FileTools.GetListOfFiles(__dir__+"projects/"), widgets = [], num = 0;
		files = files.sort();
		for(let i in files){
			let item = files[i].toString();
			item = item.replace(__dir__+"projects/", "");	item = item+"";
				let text = Widgets.text(item, 16),
				linear = Widgets.linear([text], Widgets.orientate.horizontal, Widgets.gravity.left);
				linear.setOnClickListener(function(){
					importUI(item);
					editorUI.project = num;
				});
				linear.setPadding(0, 8, 0, 8);
				widgets.push(linear);
				num++;
		}
		var layout = Widgets.linear(widgets), scroll = Widgets.scroll(layout);
		let dial = {	title: "Import Menu", view: scroll	};
		dialog(dial);
	});
};
