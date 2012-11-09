define(
['src/Vector'],
function (Vector) {
    var
        /**
         * Body with mass, position, and velocity to apply forces to
         *
         * @class Body
         * @param {Object} [options]
         *     Any options to set inline (mass, position, etc)
         * @return {Object} Body
         */

        Body = function (options) {
            this.mass = options.mass || 0;
            this.position = options.position || { x: 0, y: 0 };
            this.velocity = options.velocity || new Vector();
        },

        /**
         * Progress through time and find the future body state
         *
         * @param {Number} time (in ms)
         */

        progress = function (time) {
            
        },

        /**
         * Apply the given force on the body
         *
         * @param {Vector} force
         * @param {Number} [time] (in ms) to apply the force
         */

        applyForce = function (force, time) {
             
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
    Body.prototype.progress = progress;
    Body.prototype.applyForce = applyForce;
    Body.prototype.x = x;
    Body.prototype.y = y;

    return Body;
})