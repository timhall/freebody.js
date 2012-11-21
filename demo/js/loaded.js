// First, set up require js
var require = window.parent.require;
require.config({
    baseUrl: '../'
});

// Set some necessary window properties that are Bonsai specific
window.requestAnimationFrame = window.parent.requestAnimationFrame;

// Load all dependencies and start game
require(    
['src/Body', 'src/Vector', 'src/Engine', 'src/gravity'],
function (Body, Vector, Engine, gravity) {
    //var engine = new Engine();
    var Ball = function (options) {
        var ball = this,
            display;
            
        ball = new Body({ mass: 10 });  
            //ball.reset();
            /*v: {  
                x: Math.floor(Math.random() * (50 + 50 + 1)) - 50, 
                y: Math.floor(Math.random() * (50 + 50 + 1)) - 50  
            },
            x: Math.floor(Math.random() * ((window.parent.innerWidth-25) - 25 + 1)) + 25,
            y: Math.floor(Math.random() * ((window.parent.innerHeight-25) - 25 + 1)) + 25 });
            */
        //ball.forces.push(new Vector({ x: 100 }));
        gravity.simple(ball, 20);
        
        
        
        ball.draw = function () {
            display.attr({ x: Math.round(ball.x), y: Math.round(ball.y), opacity: 0 });
        };
        
        ball.update = function (step) {
            //step = step || 1000/60;
            //ball.v.y(-ball.v.y);
            
            if (ball.x > (window.parent.innerWidth-25)) {
                ball.v.x(-ball.v.x());
            } else if (ball.x < 25) {
                ball.v.x(-ball.v.x());   
            }
            if (ball.y > window.parent.innerHeight + 25) {         //For falling top to bottom
                ball.y = -25;   
            }
            if (ball.y < -25) { 
                ball.y = window.parent.innerHeight + 25;   
            }
            if (ball.v.y() >= 100 && display.attr('opacity') == 1){
                var fadeout = function () {
                    if (display.attr('opacity') > 0) {
                        setTimeout(fadeout, 1000/60);
                        display.attr('opacity', display.attr('opacity') - 0.05);
                    } else {
                        ball.reset();        
                        //display.attr('opacity') = 1.0; (reset fades in now)
                    }
                };
                fadeout();
                /*
                for (var i = 1; i <= 0; i += -0.01) {
                    display.attr({opacity: i});
                }
                */
            }
            
            ball.advance(step);
        };
        
        ball.create = function () {
            display = new Circle(ball.x, ball.y, 25);
            display.fill((options && options.color) || 'blue');
            display.addTo(stage);
            return ball;
        };
        
        ball.reset = function () {  
            ball.v.x(Math.floor(Math.random() * (50 + 50 + 1)) - 50); 
            ball.v.y(Math.floor(Math.random() * (50 + 50 + 1)) - 50);
            ball.x = Math.floor(Math.random() * ((window.parent.innerWidth-25) - 25 + 1)) + 25;
            ball.y = Math.floor(Math.random() * ((window.parent.innerHeight-25) - 25 + 1)) + 25;
            display.attr('opacity', 0)
            var fadein = function () {
                if (display.attr('opacity') < 1) {
                    setTimeout(fadein, 1000/60);
                    display.attr('opacity', display.attr('opacity') + 0.05);
                }
            };
            fadein();
            return ball;
            //http://docs.bonsaijs.org/module-filter.filter.Opacity.html
            //for fade in and fade out if i want to be flashy
        }
    
        ball.create();
        ball.reset();
        return ball;
    };    
    
    
    
    
    var engine = new Engine(),
        maxBalls = 4,
        //numBalls = 0,
    
        // Random colors for balls
        colors = ['blue', 'red', 'yellow', 'green', 'orange'],
        randomColor = function () {
            return colors[Math.round(Math.random() * colors.length)];
        },
        
        // Add ball to engine (which then updates and renders is)
        addBall = function () {
            // push a new ball with a random color
            // We're passing in a color into the options parameter of Ball
            //if (engine.objects.length <= maxBalls) {
                engine.objects.push(new Ball({ color: randomColor() }));
            //}
            
            // This pushes an object into the engine and in the next update and render
            // loop it will update and draw this new object
            
            // 1 second from now, add another one (recursive, goes on forever)
            if (engine.objects.length <= maxBalls) {
                setTimeout(addBall, 1000)
            }
        };
    
    //engine.objects.push(new Ball());    
    addBall();
    engine.start();
    
    
});