var Rectangle = function (options) {
    var rect = this;
    
    var update = function () {
        
    };
    
    var draw = function () {
        
    };
    
    return {
        update: update,
        draw: draw
    }
}

var Engine = function () {
    // This is the only object for now
    // When it is an objects array, we'll use objects[...].update
    var obj = new Rectangle();
    
    // Stuff here
    // var update ...
    // var render ...
    
    return {
        start: start   
    };
}

var engine = new Engine();
engine.start();