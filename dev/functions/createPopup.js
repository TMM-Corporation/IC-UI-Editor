function newPopup(list, name, pos, width, height) {
  // if(pos=0)pos=1;
  var widget = WindowManager.windows[+ "Popup"];
  if (widget && widget.name != name) {
    WindowManager.closePopup();
    openUP(list, name, pos, width, height);
  } else {
    if (widget && widget.name == name) {
      WindowManager.closePopup();
    } else {
      openUP(list, name, pos, width, height);
    }
  }
}
function openUP(type, list, name, pos, width, height) {
  var layout = addWidgetsFrom(list, Widgets.orientate.vertical);
  var scroll = Widgets.scroll(layout);
  var window = Widgets.window(scroll, Widgets.gravity.top | Widgets.gravity.left, 14, 106);
  widget = WindowManager.windows[name] = {
    window: window,
    parent: scroll,
    layout: layout,
    name: name
  };
}
