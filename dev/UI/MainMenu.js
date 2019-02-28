// TODO: Make clean code
// Popups widgets
var moving1 = {
	n1: { image: "bg"},
	up: { image: "button_up", click: function(v) {	edit(["up"]);	},
		clickLong: function(v) {	edit(["up", true]);	return false;} }, 
	n2: { image: "bg"}
}, 
moving2 = {
	menu: { image: "button_left", click: function(v) {	edit(["left"]);	},
		clickLong: function(v) {	edit(["left", true]);	return false;} }, 
	down: { image: "button_down", click: function(v) {	edit(["down"]);	},
		clickLong: function(v) {	edit(["down", true]);	return false;} }, 
	right: { image: "button_right", click: function(v) {	edit(["right"]);	},
		clickLong: function(v) {	edit(["right", true]);	return false;} }
}, 
toScaling = {
	scaleUp: { image: "button_scale_up", click: 
		function(v) {
			Widgets.run(function(){
				if(editorUI.current.size!=null)edit(["sizeUp"]);
				if(editorUI.current.scale!=null)edit(["scaleUp"]); 
			});
		}
	},
	scaleDown: { image: "button_scale_down", click: 
		function(v) {
			Widgets.run(function(){
				if(editorUI.current.size!=null)edit(["sizeDown"]);
				if(editorUI.current.scale!=null)edit(["scaleDown"]); 
			});
		}
	}
}, 
toAdding = {
	element: { image: "button_element_add", click: function(v) { addElement(); } },
	drawing: { image: "button_drawing_add", click: function(v) { alert("Drawing adding"); } }
}, 
toRemoving = {
	element: { image: "button_element_remove", click: function(v) { edit(["remove"]); } },
	drawing: { image: "button_drawing_remove", click: function(v) { alert("Drawing removing");} }
}, 
toChanging = {
	bitmap: { image: "button_bitmap", click: function(v) { Widgets.run(function(){ selectBitmap(1); }); } }
}, 
start = {
	open: { image: "button_start", click: function(v) { Widgets.run(function(){
		Windows.closePopup("main");
		Windows.closeMenu("main");
		editorUI.open();
		Windows.menu("mainMenu", "main", addWidgetsFrom(menu));
	}); } }
},
menu = {
	scaling: { image: "button_scaling", click: function(v) { Widgets.run(function(){
		newPopup("main", toScaling, "Scaling", 0, 132, 135*2); 
	}); } },
	adding: { image: "button_add", click: function(v) { Widgets.run(function(){
		newPopup("main", toAdding, "Adding", 1, 132, 135*2); 
	}); } },
	moving: { image: "button_moving", click: function(v) { Widgets.run(function(){
		var v1 = [];
		v1.push(addWidgetsFrom(moving1, Widgets.orientate.horizontal));
		v1.push(addWidgetsFrom(moving2, Widgets.orientate.horizontal));
		newPopup("main", v1, "Moving", 1, 132*3, 135*2, true);
	}); } },
	removing: { image: "button_remove", click: function(v) { Widgets.run(function(){
		newPopup("main", toRemoving, "Removing", 3, 132, 135*2); 
	}); } },
	export: { image: "button_export", click: function(v) { Widgets.run(function(){ }); } },
	change: { image: "button_change", click: function(v) { Widgets.run(function(){
		newPopup("main", toChanging, "Changing", 5, 132, 135*1); 
	}); } },
	info: { image: "button_info", click: function(v) { Widgets.run(function(){
		if(editorUI.current){
			alert(editorUI.name+"\n")
			for(let i in editorUI.current)
			alert(i+": "+editorUI.current[i]);
		}
	}); } },
	selectElement: { image: "button_list", click: function(v) { Widgets.run(function(){
		selectElement();
	}); } },
	close: { image: "button_close", click: function(v) { Widgets.run(function(){
		Windows.closePopup("main");
		Windows.closeMenu("main");
		editorUI.close();
		Windows.menu("mainMenu", "main", addWidgetsFrom(start));
	}); } }
};
// Open after IC Loads
Callback.addCallback("PostLoaded", function (coords, item, block) {
	Windows.menu("mainMenu", "main", addWidgetsFrom(start));
});
