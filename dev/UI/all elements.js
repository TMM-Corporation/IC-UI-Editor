/*Background*/ {type: "background", color: цвет}
 /*Bitmap*/ {type: "bitmap", bitmap: "текстура", x: число, y: число, scale: число}
 /*Frame*/ {type: "frame", x: число, y: число, width: число, height: число, bitmap: "текстура_рамки", bg: цвет, scale: число}
 /*Text*/ {type: "text", text: "текст", x: число, y: число, font: шрифт_текста}
 /*Line*/ {type: "line", x1: число, y1: число, x2: число, y2: число, width: число, color: цвет}
 
 
{type: "slot", x: число, y: число, size: число, visual: bool, bitmap: "текстура", clicker: объект функций клика, needClean: bool, isTransparentBackground: bool}
{type: "invSlot", x: число, y: число, size: число, index: число, bitmap: "текстура"}
{type: "button", x: число, y: число, bitmap: "текстура", bitmap2: "текстура", scale: число, clicker: объект функций клика
{type: "closeButton", x: число, y: число, global: лог.значение, bitmap: "текстура", bitmap2: "текстура", scale: число}
{type: "scale", x: число, y: число, direction: число, bitmap: "текстура", scale: число, invert: bool, overlay: "текстура", overlayScale: число, overlayOffset: {x: число, y: число}}
{type: "text", x: число, y: число, width: число, height: число, text: "текст", font: шрифт_текста}
{type: "image", x: число, y: число, bitmap: "текстура", scale: число, overlay: "текстура", overlayScale: число, overlayOffset: {x: число, y: число}, clicker: объект функций клика}

