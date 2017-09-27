

var canvas = document.getElementById('myCanvas'),
    canvas_temp = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvasHolder = document.getElementById('CanvasHolder'),
    tool,
    color = document.getElementById('color');
mouse = { x: 0, y: 0 };
delta = { x: 0, y: 0 };
    
function drawInit(){
    canvas_temp.id = 'myTempCanvas';
context_temp = canvas_temp.getContext('2d'),
    canvas_temp.width = canvas.width,
    canvas_temp.height = canvas.height;
canvas.parentNode.appendChild(canvas_temp);
context_temp.lineWidth = 3,
    context_temp.lineCap = 'round',
    context_temp.lineJoin = 'round';

 tool= new Pencil();
canvas_temp.classList = 'cursorPencil';
}

drawInit();
AttachListeners();
makeDraggable('#CanvasHolder', '#myTempCanvas');

function Eraser(width) {
    context_temp.strokeStyle = '#fff';
    context_temp.lineWidth = width;
}
