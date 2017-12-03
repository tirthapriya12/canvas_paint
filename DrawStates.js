function DrawState() {
    this.states = [];
    this.index = 0;
    this.prevs = 0;
}

DrawState.prototype.addState = function (state) {
    var img = new Image();
    img.src=state;
    this.states.push(img);
}

DrawState.prototype.removePrevStates = function () {
    for (var i = 0; i < this.states.length; i++) {
        this.states.pop();
    }

}

DrawState.prototype.goToPrev = function () {
    this.index--;
    this.prevs++;
}

DrawState.prototype.updateIndex = function () {
    if(this.index < this.states.length)
    this.index++;
}
DrawState.prototype.getPrevState=function(){
    return this.states[(this.index)];
}
DrawState.prototype.getNextState=function(){
    return this.states[(this.index)];
}