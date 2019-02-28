var slotProps = {
	type: "slot",
	x: 300, y: 60,
	size: 60,
	visual: false,
	bitmap: "slot_default",
	needClean: false,
	isTransparentBackground: false,
	clicker: {}
}, invSlotProps = {
	type: "invSlot",
	x: 300, y: 60,
	size: 60,
	index: 0,
	bitmap: "invSlot_default",
	clicker: {}
}, buttonProps ={
	type: "button",
	x: 300, y: 60,
	scale: 3.2,
	bitmap: "button_default",
	bitmap2: "button_default2",
	clicker: {}
}, closeProps = {
	type: "closeButton",
	x: 300, y: 60,
	global: true,
	bitmap: "close_default",
	bitmap2: "close_default2",
	scale: 3.2,
	clicker: {}
}, scaleProps = {
	type: "scale",
	x: 300, y: 60,
	direction: 0,
	bitmap: "scale",
	scale: 3.2,
	value: 1,
	invert: false,
	overlay: null,
	overlayScale: 3.2,
	overlayOffset: {x: 0, y: 0},
	clicker: {}
}, textProps = {
	type: "text",
	x: 300, y: 60,
	width: 120,
	height: 16,
	text: "This is a Text element",
	font: {color: android.graphics.Color.WHITE, shadow: 0.6, size: 18},
	clicker: {}
}, imageProps = {
	type: "image",
	x: 300, y: 60,
	bitmap: "image",
	scale: 3.2,
	overlay: null,
	overlayScale: 3.2,
	overlayOffset: {x: 0, y: 0},
	clicker: {}
};

function addElement(){
	Widgets.run(function(){
		var types = {
			"slot": slotProps, 
			"invSlot(not selectable!)": invSlotProps, 
			"button": buttonProps, 
			"closeButton(not selectable!)": closeProps, 
			"scale": scaleProps, 
			"text": textProps, 
			"image": imageProps
		}, widgets = [];
		for(let u in types){
			let i = u;
			let text = Widgets.linear([Widgets.text(i)], null, Widgets.gravity.left);
			text.setOnClickListener(function(){
				Widgets.run(function(){
					let count = edit(["match"], false),
						id = "element"+(count+1)+"_"+i;
					types[i].clicker = {onClick: function(){edit(["select", id]);}};
					edit(["add", id, types[i]]);
					alert("Element ["+i+"] added to GUI with id = "+id);
					edit(["match"]);
				});
			});
			text.setPadding(16, 4, 16, 4);
			widgets.push(text);
		}
		var layout = Widgets.linear(widgets),
			scroll = Widgets.scroll(layout),
			dial = {
				title: "Select Type of Element",
				view: scroll,
				buttons: {
					text: [null, null, "Cancel"],
					click: [null, null, function(){}]
				}
			};
		dialog(dial);
	});
};