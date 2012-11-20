var Engine = function (context) {
    var engine = this,
        ball, startTime,
    
        start = function () {
            startTime = +new Date;
            
            ball = new Circle(250, 200, 25);
            ball.addTo(stage);
            ball.fill('blue');
            
            run();
        },
        
        run = function (timestamp) {
            rAF(run);
            draw(timestamp);
        },
        
        draw = function (timestamp) {
            var time = (startTime + timestamp) * 0.002,
                x = Math.round(Math.sin(time) * 96 + 128),
                y = Math.round(Math.cos(time * 0.9) * 96 + 128);
           
            //console.log('Draw: ', x, y);
            ball.attr({ x: x, y: y });
        },
        
        rAF = window.requestAnimationFrame;
    
    engine.start = start;
    
    return engine;
};

var engine = new Engine();
engine.start();