function drag(view) {
	// Widgets.run(function(){
		var xDelta = 0;
		var yDelta = 0;
		var onTouchListener = function(){
			return new android.view.View.OnTouchListener(function(onTouch) {
				var onTouch = function(view, event){
					var event = android.view.MotionEvent;
					var x = event.getX();
					var y = event.getY();
					switch(event.getAction() & MotionEvent.ACTION_MASK){
						case MotionEvent.ACTION_DOWN:
				     	var lParams =	android.widget.RelativeLayout.LayoutParams;
					    view.getLayoutParams();
							xDelta = x - lParams.leftMargin;
					    yDelta = y - lParams.topMargin;

						case MotionEvent.ACTION_UP:
				    	alert("thanks for new location!");
				    break;

				    case MotionEvent.ACTION_MOVE:
				     var layoutParams = android.widget.RelativeLayout.LayoutParams(view).getLayoutParams();
				     layoutParams.leftMargin = x - xDelta;
				     layoutParams.topMargin = y - yDelta;
				     layoutParams.rightMargin = 0;
				     layoutParams.bottomMargin = 0;
				     view.setLayoutParams(layoutParams);
				     break;
				    }
			    // android.view.ViewGroup.invalidate();
			    return true;
				};
			});
		}
		view.setOnTouchListener(onTouchListener());
	// });
}
