function animate(name, layout, pos, widget, width, height) {
	let animate = android.view.animation.AlphaAnimation(1, 0);
	widget.layout.startAnimation(animate);
	animate.setDuration(160);
	widget.layout.postDelayed(new java.lang.Runnable({
		run: function(){
			Widgets.run(function(){
				widget.name = name;
				widget.parent.removeAllViews();
				widget.window.update(135*pos, 124, width, height);
				let animate = android.view.animation.AlphaAnimation(0, 1);
				widget.parent.addView(layout);
				widget.layout = layout;
				widget.layout.startAnimation(animate);
				animate.setDuration(320);
			});
		}
	}), 160);
}