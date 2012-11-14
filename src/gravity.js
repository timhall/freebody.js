define(
['src/Vector'],
function (Vector) {
    
    // Earth's gravity (m/s^2)
    // (all caps is js convention for constants, no actual contants)
    var G_EARTH = 9.8;
    
    /**
     * Apply simple gravity where the body is 'on' a planet
     * (e.g. Earth's gravity on a projectile)
     * 
     * @param {Body} body Instance of a Body to apply gravity to
     * @param {Number} [acceleration] Acceleration value to apply
     *     (default is 9.8 m/s^2)
     * @return {Body} body with gravity applied
     */
    var simple = function (body, acceleration) {
        // Set default acceleration if none is given
        acceleration = (acceleration || G_EARTH);
        
        // Need to apply a force on the body equal to the gravitational force
        var force = new Vector({ angle: -90 });
        
        // Want to calculate gravitational force each time in case mass changes
        var g = function (body) {
            force.magnitude = ((body && body.mass) || 0) * acceleration;
            return force;
        }
        
        body.forces.push(g);
        return body;
    };
    
    return {
        simple: simple   
    };
    
});