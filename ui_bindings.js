function AttachListeners() {
    canvas_temp.addEventListener('mousedown', mouseDown);
    canvas_temp.addEventListener('mouseup', function (ev) {
        tool.mouseUp(context_temp);
        redraw();
        drawState.addState( canvas.toDataURL());
        drawState.updateIndex();
        $('#prev').removeAttr('disabled');
        canvas_temp.removeEventListener('mousemove', startDraw, false);
    }, false);
    $('.dropdown-item').on('click', OptionChoose);
    color.addEventListener('change', function () {
        if (!isErasing) {
            tool.color = color.value;
        }
    });
    $('.others').on('click', OptionChoose);
    $('#eraser_size').on('change', resizeEraser)
}

function resizeEraser(event) {
    isErasing = true;
    tool.lineWidth = parseInt($(this).val());
}

function OptionChoose() {
    var id = $(this).attr('data-id');

    switch (id) {

        case 'pencil': {
            tool = new Pencil();
            isErasing = false;
            canvas_temp.classList = "cursorPencil";
            break;
        }
        case 'line': {
            tool = new LineTool();
            isErasing = false;
            canvas_temp.classList = "cursorObject";
            break;
        }
        case 'rectangle': {
            tool = new RectangleTool();
            isErasing = false;
            canvas_temp.classList = "cursorObject";
            break;
        }
        case 'eraser': {
            tool = new Eraser();
            canvas_temp.classList = "cursorEraser";
            break;
        }
    }
}

function redraw() {
    //draws image on other canvas 
    context.drawImage(canvas_temp, 0, 0);
    context_temp.clearRect(0, 0, canvas_temp.width, canvas_temp.height);

}

function mouseDown(e) {
    //draw only if left mouse button is used to draw
    if (e.which === 1) {
        context_temp.strokeStyle = tool.color;
        context_temp.lineWidth = tool.lineWidth;
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

$('#toggleCanvas').on('click', function (event) {

    if ($('#CanvasHolder').hasClass('open')) {
        $('#CanvasHolder').hide();
        $('#toggleCanvas').html('Open');
        $('.MinimizeTray').hide();
        $('#CanvasHolder').removeClass('open');
    }
    else {
        $('#CanvasHolder').addClass('open')
        $('#CanvasHolder').show();
        $('#toggleCanvas').html('Close');
    }


});

$('.MinimizeTray').on('click', function () {
    $('#CanvasHolder').show();
    $('.MinimizeTray').css('display', 'none');
    $('#toggleCanvas').html('Close');

});

$('.minimize').on('click', function () {
    $('#CanvasHolder').hide();
    $('.MinimizeTray').css('display', 'inline-block');
    $('.MinimizeTray').html('Paint App');
})

$('#prev').on('click', function () {
    $('#next').removeAttr('disabled');
    if (drawState.index === 1) {
        $('#prev').attr('disabled', 'true');
    }
    context.clearRect(0,0,canvas_temp.width,canvas_temp.height);
    drawState.goToPrev();
    context.drawImage(drawState.getPrevState(), 0, 0);
});

$('#next').on('click', function () {
    drawState.updateIndex();
    context.clearRect(0,0,canvas_temp.width,canvas_temp.height);
    context.drawImage(drawState.getNextState(), 0, 0);
    if(drawState.index == drawState.states.length-1)
    {
        $('#next').attr('disabled','true');
    }
    $('#prev').removeAttr('disabled');
});
$('#save').on('click',function(){
    var link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = "mypainting.jpg";
    link.click();
});