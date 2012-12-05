//Trying gravity around a planet(point instead of global direction)

// First, set up require js
var require = window.parent.require;
require.config({
    baseUrl: '../'
});

// Set some necessary window properties that are Bonsai specific
window.requestAnimationFrame = window.parent.requestAnimationFrame;

// Load all dependencies and start game
require(    
['src/Body', 'src/Vector', 'src/Engine', 'src/gravity', 'src/Planet'],
function (Body, Vector, Engine, gravity, Planet) {
    //var engine = new Engine();
    var Planets = function(options) {
        var planet = this,
            display;
            
        planet = new Body({mass: 10000000000000, x: window.parent.innerWidth/2, y: window.parent.innerHeight/2})
        //extra 1 zeroes are currently there
        planet.draw = function () {
                display.attr({ x: Math.round(planet.x), y: Math.round(planet.y), opacity: 1 });
        };
        
        planet.create = function () {
            display = new Circle(planet.x, planet.y, 50);
            display.fill('cyan');
            display.addTo(stage);
            return planet;
        };
        
        
        planet.create();
        return planet;
    }    
    
    var Ball = function (options, planet) {         //how do I pass in planet?
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
        //gravity.simple(ball, 20);
        //gravity.planetary(ball, planet);
        
        
        
        
        ball.draw = function () {
            display.attr({ x: Math.round(ball.x), y: Math.round(ball.y), opacity: 1 });
        };
        
        ball.update = function (step) {
            gravity.planetary(ball, planet);
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
                /*var fadeout = function () {
                    if (display.attr('opacity') > 0) {
                        setTimeout(fadeout, 1000/60);
                        display.attr('opacity', display.attr('opacity') - 0.05);
                    } else {
                        ball.reset();        
                        //display.attr('opacity') = 1.0; (reset fades in now)
                    }
                };
                fadeout();*/
                /*
                for (var i = 1; i <= 0; i += -0.01) {
                    display.attr({opacity: i});
                }
                */
            }
            
            ball.advance(step);
            ticker.attr('text', 'Fx: ' + Math.round(ball.netForce().x(), 4) + ' | Fy: ' + -Math.round(ball.netForce().y(), 4) + 
                                ' | Vx: ' + Math.round(ball.v.x(), 4) + ' | Vy: ' + -Math.round(ball.v.y(), 4));
        };
        
        ball.create = function () {
            display = new Circle(ball.x, ball.y, 25);
            display.fill((options && options.color) || 'blue');
            display.addTo(stage);
            return ball;
        };
        
        ball.reset = function () {  
            ball.v.x(0);                //Math.floor(Math.random() * (50 + 50 + 1)) - 50); 
            ball.v.y(0);                //Math.floor(Math.random() * (50 + 50 + 1)) - 50);
            ball.x = Math.floor(Math.random() * ((window.parent.innerWidth-25) - 25 + 1)) + 25;
            ball.y = Math.floor(Math.random() * ((window.parent.innerHeight-25) - 25 + 1)) + 25;
            //display.attr('opacity', 0)
            /*var fadein = function () {
                if (display.attr('opacity') < 1) {
                    setTimeout(fadein, 1000/60);
                    display.attr('opacity', display.attr('opacity') + 0.05);
                }
            };
            fadein();*/
            return ball;
            //http://docs.bonsaijs.org/module-filter.filter.Opacity.html
            //for fade in and fade out if i want to be flashy
        }
    
        ball.create();
        ball.reset();
        
        
        var ticker = new Text().addTo(stage).attr({
            fontFamily: 'Arial, sans-serif',
            fontSize: '16',
            textFillColor: 'black',
            textStrokeColor: 'black',
            x: 5,
            y: 5
        });
        
        
        return ball;
    };    
    
    
    
    
    var engine = new Engine(),
        maxBalls = 10,
        //numBalls = 0,
    
        // Random colors for balls
        colors = ['blue', 'red', 'yellow', 'green', 'orange'],
        randomColor = function () {
            return colors[Math.round(Math.random() * colors.length)];
        },
        
        planet = new Planets(),
        
        // Add ball to engine (which then updates and renders is)
        addBall = function () {
            // push a new ball with a random color
            // We're passing in a color into the options parameter of Ball
            //if (engine.objects.length <= maxBalls) {
                engine.objects.push(new Ball({ color: randomColor() }, planet));
            //}
            
            // This pushes an object into the engine and in the next update and render
            // loop it will update and draw this new object
            
            // 1 second from now, add another one (recursive, goes on forever)
            if (engine.objects.length <= maxBalls) {
                //setTimeout(addBall, 10000)
            }
        };
    
    engine.objects.push(planet);    
    addBall();
    engine.start();
    
    
});