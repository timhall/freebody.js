// Trying gravity around a planet 
// (point instead of global direction)
// 
// The vector angles are flipped on the x axis

// First, set up require js and other window properties
var require = window.parent.require;
require.config({ baseUrl: '../' });

// Create reference to request animation frame
window.requestAnimationFrame = window.parent.requestAnimationFrame;

// Load all dependencies and start game
require(    
['src/Body', 'src/Vector.v2', 'src/Engine', 'src/gravity', 'src/Planet'],
function (Body, Vector, Engine, gravity, Planet) {
    
    
    
    
    var Ship = function (options) {
        var ship = this,
            display;
        
        ship = new Body({
            mass: 10,
            x: window.parent.innerWidth/4,
            y: window.parent.innerHeight/4,
            v: { x: 100, y: 10 }
        });
        
        ship.draw = function () {
            display.attr('x', Math.round(ship.x));
            display.attr('y', Math.round(ship.y));
        };
        
        ship.update = function (step) {
            if (ship.x > (window.parent.innerWidth+25)) {
                // ball.v.x(-ball.v.x());
                ship.x = -25;
            } else if (ship.x < -25) {
                // ball.v.x(-ball.v.x());   
                ship.x = window.parent.innerWidth + 25
            }
            if (ship.y > window.parent.innerHeight + 25) {
                ship.y = -25;   
            } else if (ship.y < -25) { 
                ship.y = window.parent.innerHeight + 25;   
            }
            
            ship.advance(step);
            
        };
        
        ship.create = function () {
            display = new Circle(ship.x, ship.y, 25);
            display.fill((options && options.color) || 'blue');
            display.addTo(stage);
            return ship;  
        };
        
        return ship.create();
    };
    
    var Ticker = function (options) {
        var ticker = this,
            display,
            objToWatch;
        
        ticker.draw = function () {
            display.attr('text', 
                'Fx: ' + Math.round(objToWatch.netForce().x(), 4) + ' | Fy: ' + -Math.round(objToWatch.netForce().y(), 4) + 
                ' | Vx: ' + Math.round(objToWatch.v.x(), 4) + ' | Vy: ' + -Math.round(objToWatch.v.y(), 4) + 
                ' | Px: ' + Math.round(objToWatch.x, 4) + ' | Py: ' + Math.round(objToWatch.y, 4));
        };
        
        ticker.update = function (step) {
           
        };
        
        ticker.watch = function (obj) {
            // Save ref to object
            objToWatch = obj;
        };
        
        ticker.create = function () {
            display = new Text().addTo(stage).attr({
                fontFamily: 'Arial, sans-serif',
                fontSize: '16',
                textFillColor: 'black',
                textStrokeColor: 'black',
                x: 5,
                y: 5
            });            
            return ticker;  
        };
        
        return ticker.create();
    };
    
    var engine = new Engine(),
        
        // Random colors for balls
        colors = ['blue', 'red', 'yellow', 'green', 'orange'],
        randomColor = function () {
            return colors[Math.round(Math.random() * colors.length)];
        },
        
        // Add ball to engine (which then updates and renders is)
        addShip = function () {
            // Create new ship            
            var ship = new Ship();
            
            // Apply gravity to ship
            gravity.planetary(ship, planet1);
            gravity.planetary(ship, planet2);
            
            // Add ship to engine
            engine.objects.push(ship);
            
            // Finally, tell ticker to watch ship
            ticker.watch(ship);
        };
    
    // Create new planet and add to engine
    var planet1 = new Planet({ 
        x: window.parent.innerWidth/3,
        y: window.parent.innerHeight/2 
    }, Circle, stage);
    engine.objects.push(planet1);
    
    var planet2 = new Planet({ 
        x: 2*window.parent.innerWidth/3,
        y: window.parent.innerHeight/2 
    }, Circle, stage);
    engine.objects.push(planet2);
    
    // Create ticker
    var ticker = new Ticker();
    engine.objects.push(ticker);
    
    // Add ship to environment
    addShip();
    
    // Finally, start the engine
    engine.start();
    
});