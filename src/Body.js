/**
 * Body with mass, position, velocity, acceleration, and forces
 *
 * Example:
 * ```
 * var ball = new Body();
 *
 * // Set initial position
 * ball.x = 10; 
 * ball.y = 10;
 *
 * // Set initial velocity
 * ball.v = { magnitude: 60, angle: 45 };
 * 
 * // Add gravity
 * ball.a.push({ magnitude: 9.8, angle: 90 });
 * 
 * // Check on ball after 3 seconds
 * // (Advance it 3000 ms into the future)
 * ball.advance(3000);
 * 
 * // Get current velocity in y-direction
 * var speed = ball.v.y();
 *
 * // Strap a rocket to the ball for 8 seconds
 * ball.forces.push({ magnitude: { value: 100, duration: 8000 }, angle: 270 });
 * 
 * // and check on the height after 12 seconds
 * ball.advance(12000);
 * var height = ball.y;
 *
 * // Finally, set values quickly inline
 * ball = new Body({ x: 10, y: 10, v: { magnitude: 60, angle: 45 } });
 * 
 * ```
 */
define(
['src/Vector'],
function (Vector) {
    var
        /**
         * @class Body
         * @param {Object} [options]
         *     Any options to set inline (mass, position, etc)
         * @return {Object} Body
         */

        Body = function (options) {
            
        },

        /**
         * Advance through time and find the future body state
         *
         * @param {Number} time (in ms)
         */

        advance = function (time) {
            
        },

        /**
         * Get the body's current x-position
         */

        x = function () {
            return 0;
        },

        /**
         * Get the body's current y-position
         */

        y = function () {
            return 0;
        };

    /*
     * @prototype
     */
    Body.prototype.advance = advance;
    Body.prototype.x = x;
    Body.prototype.y = y;

    return Body;
})