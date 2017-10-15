

var canvas = document.getElementById('myCanvas'),
    canvas_temp = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvasHolder = document.getElementById('CanvasHolder'),
    tool,
    color = document.getElementById('color'),
    mouse = { x: 0, y: 0 },
    isErasing = false,
    prevColor;


function drawInit() {
    canvas_temp.id = 'myTempCanvas';
    context_temp = canvas_temp.getContext('2d'),
        canvas_temp.width = canvas.width,
        canvas_temp.height = canvas.height;
    canvas.parentNode.appendChild(canvas_temp);
    context_temp.lineWidth = 3,
        context_temp.lineCap = 'round',
        context_temp.lineJoin = 'round';
    prevColor = context_temp.strokeStyle
    tool = new Pencil();
    canvas_temp.classList = 'cursorPencil';
}

function Eraser(width) {
    context_temp.strokeStyle = '#fff';
}
Eraser.prototype = new DrawTool();

drawInit();
AttachListeners();
makeDraggable('#CanvasHolder', '#myTempCanvas');


