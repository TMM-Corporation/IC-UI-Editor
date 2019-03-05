function exportDial(){
	Widgets.run(function(){
		let dial = {
				title: "Rewrite last Exproted?",
				buttons: {
					text: ["Rewrite", null, "Create new file"],
					click: [function(){exportUI(true);}, null, function(){exportUI(false);}]
				}
			};
		dialog(dial);
	});
};