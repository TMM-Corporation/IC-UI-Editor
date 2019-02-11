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