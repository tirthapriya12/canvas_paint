var LineTool = function () { };
LineTool.prototype = new DrawTool();

LineTool.prototype.mouseDown= function (ctx){
    this.started=true;
    this.prev.x=mouse.x,
    this.prev.y=mouse.y;
};

LineTool.prototype.mouseMove = function (ctx) {

    if (this.started) {
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
        ctx.beginPath();
        ctx.moveTo(this.prev.x, this.prev.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
    }
};