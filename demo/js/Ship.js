define(
['src/freebody'],
function (freebody) {
    var Ship = function (options, Circle, stage) {
        var ship = this,
            display;
        
        ship = new freebody.Body({
            mass: 10,
            x: options && options.x || window.parent.innerWidth/4,
            y: options && options.y || window.parent.innerHeight/4,
            v: new freebody.Vector().x(100).y(10) //{ x: 100, y: 10 }
            
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
    
    return Ship;
})