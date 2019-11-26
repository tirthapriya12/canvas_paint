function Pencil() { };
Pencil.prototype = new DrawTool();

Pencil.prototype.mouseMove = function (ctx) {

    if (this.started) {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

}