var AnimateAPI = {
  Handler: android.os.Handler,
  animations: {},
  createAnim: function (name, widget, info, fun) {
    this.animations[name] = fun(widget, info);
  },
  runAnim: function (name) {
    this.animations.name();
  },
  translate: function (widget, from, to, time) {
    var animate = android.view.animation.TranslateAnimation(from.x, from.y, to.x, to.y);
    animate.setDuration(time);
    widget.layout.startAnimation(animate);
  },
  fadeIn: function (widget, duration) {
    var animate = android.view.animation.AlphaAnimation(0, 1);
    widget.layout.startAnimation(animate);
    animate.setDuration(duration);
  },
  fadeOut: function (widget, duration) {
    var animate = android.view.animation.AlphaAnimation(1, 0);
    widget.layout.startAnimation(animate);
    animate.setDuration(duration);
  },
  runAfter: function (fun, ms) {
    this.Handler.postDelayed(new java.lang.Runnable({
      run: function () {
        Widgets.run(fun());
      }
    }), ms);
  }
}