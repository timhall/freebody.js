//Create Planet with x-position, y-position, mass, and radius

define(
['freebody'],
function (freebody) {
    var Planet = function (options, Circle, stage) {
        var planet = this,
            display;
        
        // Planet inherits from body
        planet = new freebody.Body({
            mass: options && options.mass || 10000000000000000,
            x: options && options.x || 0,
            y: options && options.y || 0
        });
               
        planet.draw = function () {
            display.attr('x', Math.round(planet.x));
            display.attr('y', Math.round(planet.y));
        };
        
        planet.update = function (step) {
            
        };
        
        planet.create = function () {
            display = new Circle(planet.x, planet.y, 50);
            display.fill('cyan');
            display.addTo(stage);
            return planet;
        };
        
        return planet.create();
    };    
 
    
    return Planet;
})