

var canvas = document.getElementById('myCanvas'),
    canvas_temp = document.createElement('canvas'),
    context = canvas.getContext('2d'),
    canvasHolder = document.getElementById('CanvasHolder'),
    tool,
    color = document.getElementById('color'),
    mouse = { x: 0, y: 0 },
    isErasing = false,
    drawState = new DrawState(),
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
    tool = new Pencil();
    canvas_temp.classList = 'cursorPencil';
    if(drawState.index===0)
    {
        $('#next').attr('disabled','true');
        $('#prev').attr('disabled', 'true');
    }
    drawState.addState(canvas.toDataURL());
}

function Eraser(width) {
    this.color = '#fff';
    this.lineWidth=3;
}
Eraser.prototype = new DrawTool();

drawInit();
AttachListeners();
makeDraggable('#CanvasHolder', '#myTempCanvas');


