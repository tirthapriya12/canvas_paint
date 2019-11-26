function RectangleTool() { };
RectangleTool.prototype = new DrawTool();

RectangleTool.prototype.mouseDown = function (ctx) {
    this.started = true;
    this.prev.x = mouse.x;
    this.prev.y = mouse.y;
};

RectangleTool.prototype.mouseMove = function (ctx) {

    if (this.started) {
        var x = Math.min(this.prev.x, mouse.x),
            y = Math.min(this.prev.y, mouse.y),
            width = Math.abs(mouse.x - this.prev.x),
            height = Math.abs(mouse.y - this.prev.y);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (!width || !height) {
            return;
        }
        ctx.strokeRect(x, y, width, height);
    }
}

RectangleTool.prototype.mouseUp = function (ctx) {


}