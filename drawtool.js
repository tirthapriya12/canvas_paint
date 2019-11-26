function DrawTool() {
    this.started = false;
    this.prev = {};
    this.color = "#000";
    this.lineWidth = 3;
};

DrawTool.prototype.mouseDown = function (ctx) {
    ctx.beginPath();
    console.log(mouse);
    ctx.moveTo(mouse.x, mouse.y);
    this.started = true;
};

DrawTool.prototype.mouseMove = function (ctx) {

    if (this.started) {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    }

};

DrawTool.prototype.mouseUp = function (ctx) {
    if (this.started) {
        this.mouseMove(ctx);
        this.started = false;
    }
};
