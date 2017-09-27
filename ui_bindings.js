function AttachListeners() {
    canvas_temp.addEventListener('mousedown', mouseDown);
    canvas_temp.addEventListener('mouseup', function (ev) {
        tool.mouseUp(context_temp);
        redraw();
        canvas_temp.removeEventListener('mousemove', startDraw, false);
    }, false);
    $('.dropdown-item').on('click', OptionChoose);
    color.addEventListener('change', function () {
        context_temp.strokeStyle = color.value;
    });
}


function OptionChoose() {
    var id = $(this).attr('data-id');

    switch (id) {

        case 'pencil': {
            tool = new Pencil();
            break;
        }
        case 'line': {
            tool = new LineTool();
            break;
        }
        case 'rectangle': {
            tool = new RectangleTool();
            break;
        }
    }
}

function redraw() {

    context.drawImage(canvas_temp, 0, 0);
    context_temp.clearRect(0, 0, canvas_temp.width, canvas_temp.height);

}

function mouseDown(e) {

    if (e.which === 1) {
        mouse.x = e.layerX - delta.x;
        mouse.y = e.layerY - delta.y;
        tool.mouseDown(context_temp);
        canvas_temp.addEventListener('mousemove', startDraw, false);
    }

}

function startDraw(e) {
    mouse.x = e.layerX - delta.x;
    mouse.y = e.layerY - delta.y;
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