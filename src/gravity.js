define(
['src/Vector','src/utils'], // These are the scripts to load as dependencies
function (Vector, utils) { // These are what to load the dependencies as
    // var G_EARTH = ...
    var G = 0.000000000066;
    var G_EARTH = 9.8;
    var gravity = {};
    
    gravity.simple = function (body, acceleration) {
        var value = new Vector({ angle: 90 }); // Change back if needed
        
        // g = function (body) { return Vector({ magnitude: force, angle: down }) };
        // body.forces.push(g);
        acceleration = acceleration || G_EARTH;
        
        // Gravitational force (not acceleration)
        g = function(){
            /* This line was causing lots of GC issues ('new' every update)
            return new Vector({
                angle: 90,
                magnitude = acceleration * body.mass
            });
            */
            value.magnitude = acceleration * body.mass;
            return value;
        };
        
        body.forces.push(g);
    };
    
    gravity.planetary = function (body, planet) {
        //vector.magnitude = (G * planet.mass)/vector.distance;
        var GM = G * planet.mass;
        var value = new Vector();
        
        g = function() {
            value.magnitude = (GM)/Math.pow(utils.distance(body,planet),1.9) * body.mass;
            value.angle = utils.angle(body, planet);
            //console.log(value.angle);         ANGLES ARE FLIPPED ON X AXIS
            return value;
        };
        
        body.forces.push(g);
    };
    
    
    
    return gravity;
});    
