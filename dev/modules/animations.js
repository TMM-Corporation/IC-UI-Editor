AnimateAPI.createAnim("open_Popup", widget, info, function () {
  AnimateAPI.translate(widget, {x: 0-Widgets.display.width, y: Widgets.display.height*2}, {x: Widgets.display.width-info.width, y: Widgets.display.height/2}, 600);
});
AnimateAPI.createAnim("close_Popup", widget, info, function () {
  AnimateAPI.translate(widget, {x: info.x, y: info.y}, {x: info.x+info.width, y: info.y}, 500);
});