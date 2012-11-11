/**
 * Body with mass, position, velocity, acceleration, and forces
 */
// Example:
// ```
// var ball = new Body();
// 
// // Set initial position
// ball.x = 10; 
// ball.y = 10;
// 
// // Set initial velocity
// ball.v = { magnitude: 60, angle: 45 };
// 
// // Add gravity
// ball.a.push({ magnitude: 9.8, angle: 90 });
// 
// // Check on ball after 3 seconds
// // (Advance it 3000 ms into the future)
// ball.advance(3000);
// 
// // Get current velocity in y-direction
// var speed = ball.v.y();
// 
// // Strap a rocket to the ball for 8 seconds
// ball.forces.push({ magnitude: { value: 100, duration: 8000 }, angle: 270 });
// 
// // and check on the height after 12 seconds
// ball.advance(12000);
// var height = ball.y;
// 
// // Finally, set values quickly inline
// ball = new Body({ x: 10, y: 10, v: { magnitude: 60, angle: 45 } });
// ```

define(
['src/Vector'],
function (Vector) {
    
    /**
     * @class Body
     * @param {Object} [options]
     *     Any options to set inline (mass, x, y, v)
     * @return {Object} Body
     */
    
    var Body = function (options) {
        // Mass of the body
        this.mass = (options && options.mass) || 0;
        
        // Position of the body
        this.x = (options && options.x) || 0;
        this.y = (options && options.y) || 0;
        
        // Velocity of the body
        if (options && options.v) {
            this.v = (typeof options.v === 'object')
                ? new Vector(options.v) 
                : options.v;   
        } else {
            this.v = new Vector();
        }
        
        // Initialize acceleration(s) and forces
        this.a = [];
        this.forces = [];
    };

    /**
     * Advance through time and find the future body state
     *
     * @param {Number} time (in ms)
     */

    Body.prototype.advance = function (time) {
        
    };

    return Body;
})