function selectBitmap(t){
	var type = t;
	Widgets.run(function(){
		var files = FileTools.GetListOfFiles(__dir__+"gui/"), widgets = [];
		for(let i in files){
			let item = files[i].toString();
			item = item.replace(__dir__+"gui/", "");
			item = item.replace(".png", "");
			item = item+"";
			let text = Widgets.text("["+i+"]: "+item, 8),
			linear = Widgets.linear([text], Widgets.orientate.horizontal, Widgets.gravity.left);
			//item = "custom/"+item+"";
			linear.setOnClickListener(function(){
				let c = editorUI.current;
				alert("You selected ["+item+"] bitmap");
				if(c!=null){
					if(type==1 && c.bitmap)c.bitmap=item;
					if(type==1 && c.bitmap2)selectBitmap(2), alert("Select second bitmap");
					if(type==2 && c.bitmap2)c.bitmap2=item;
				}
			});
			linear.setPadding(16, 4, 16, 4);
			widgets.push(linear);
		}
		var layout = Widgets.linear(widgets),
			scroll = Widgets.scroll(layout),
			dial = {
				title: "Select Bitmap "+type,
				view: scroll,
				buttons: {
					text: [null, null, "Cancel"],
					click: [null, null, function(){}]
				}
			};
		dialog(dial);
	});
};