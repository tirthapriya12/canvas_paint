function AttachListeners() {
    canvas_temp.addEventListener('mousedown', mouseDown);
    canvas_temp.addEventListener('mouseup', function (ev) {
        tool.mouseUp(context_temp);
        redraw();
        canvas_temp.removeEventListener('mousemove', startDraw, false);
    }, false);
    $('.dropdown-item').on('click', OptionChoose);
    color.addEventListener('change', function () {
        if (!isErasing) {
            context_temp.strokeStyle = color.value;
        }
    });
    $('.others').on('click', OptionChoose);
    $('#eraser_size').on('change', resizeEraser)
}

function resizeEraser(event) {
    isErasing=true;
    context_temp.lineWidth = parseInt($(this).val());
}

function OptionChoose() {
    var id = $(this).attr('data-id');

    switch (id) {

        case 'pencil': {
            context_temp.strokeStyle=prevColor;
            tool = new Pencil();
            isErasing=false;
            canvas_temp.classList = "cursorPencil";
            break;
        }
        case 'line': {
            context_temp.strokeStyle=prevColor;
            tool = new LineTool();
            isErasing=false;
            canvas_temp.classList = "cursorObject";
            break;
        }
        case 'rectangle': {
            context_temp.strokeStyle=prevColor;
            tool = new RectangleTool();
            isErasing=false;
            canvas_temp.classList = "cursorObject";
            break;
        }
        case 'eraser': {
            prevColor=context_temp.strokeStyle;
            tool = new Eraser();
            canvas_temp.classList = "cursorEraser";
            break;
        }
    }
}

function redraw() {

    context.drawImage(canvas_temp, 0, 0);
    context_temp.clearRect(0, 0, canvas_temp.width, canvas_temp.height);

}

function mouseDown(e) {
    //draw only if left mouse button is used to draw
    if (e.which === 1) {
        mouse.x = e.layerX;
        mouse.y = e.layerY;
        tool.mouseDown(context_temp);
        canvas_temp.addEventListener('mousemove', startDraw, false);
    }

}

function startDraw(e) {
    mouse.x = e.layerX;
    mouse.y = e.layerY;
    tool.mouseMove(context_temp);
}

function makeResizeable(main, isAnother, another) {

    if (isAnother) {
        var another_id = $(another).attr("id");

        $(main).resizable({
            alsoResize: another_id
        });
        $(another).resizable();

    }
    else {

        $(main).resizable();

    }
}

function makeDraggable(element, another) {
    $(element).each(function () {

        $(this).draggable({
            containment: $(this).parent().parent(),
            drag: function () {
                $(this).css({ 'margin-top': 0, 'margin-left': 0 })
            },
            cancel: '#myTempCanvas,#menu'
        });
    });
}