/**
 * gravity helpers
 */

define(
['src/Vector','src/utils'],
function (Vector, utils) {
    
    var gravity = {};
    
    // Gravitational constants
    var G = 0.000000000066,
        G_EARTH = 9.8;
    
    /**
     * Apply simple gravity (9.8 m/s^2 or given) to a body
     * 
     * @param {Body} body
     * @param {Number} [acceleration] = 9.8 by default
     */
    
    gravity.simple = function (body, acceleration) {
        // TEMP: 90 to correspond with down
        var force = new Vector().angle(90);
        acceleration = acceleration || G_EARTH;
        
        // Gravitational force (not acceleration)
        var g = function(){
            force.magnitude(acceleration * body.mass);
            return force;
        };
        
        // Add gravitational force to body
        body.forces.push(g);
    };
    
    /**
     * Apply planetary gravity to a body
     * 
     * @param {Body} body to apply gravity to
     * @param {Body} planet that generates gravity
     * @param {Number} [power] = 2, used to exaggerate effect
     */
    
    gravity.planetary = function (body, planet, power) {
        var GM = G * planet.mass,
            force = new Vector();
        
        // Allow for custom power for exaggerated effect
        power = power || 2;
        
        // Gravitation force
        var g = function() {
            force.magnitude(
                GM / Math.pow(utils.distance(body, planet), power) * body.mass    
            );
            force.angle(utils.angle(body, planet));

            return force;
        };
        
        // Add gravitational force to body
        body.forces.push(g);
    };
    
    return gravity;
});    
