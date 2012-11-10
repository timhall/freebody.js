/**
 * Vector class to represent forces, velocities, etc.
 * 
 * Example:
 * ```
 * var force = new Vector();
 * 
 * // Set magnitude and angle of force
 * force.magnitude = 12;
 * force.angle = 45;
 * 
 * // Get x- and y-components
 * var forceX = force.x(),
 *     forceY = force.y();
 * 
 * // Can also create force from components
 * force = new Vector();
 * force.x(3);
 * force.y(4);
 * 
 * var forceNet = force.magnitude; // = 5
 * 
 * // Finally, set values quickly inline
 * force = new Vector({ magnitude: 12, angle: 45 });
 * force = new Vector({ x: 3, y: 4 });
 * 
 * ```
 */
define(
[],
function () {
    var 
        /**
         * @class Vector
         * @param {Object} [options]
         *     Any options to set inline (magnitude or angle)
         * @return {Object} Vector
         */

        Vector = function (options) {
            
        },

        /**
         * Determine the x-component of the vector
         *
         * @return {Number} x-component
         */

        x = function () {
            // Things to do:
            // 1. Figure out how angles are set
            //     (i.e. where's zero + what direction does it rotate
            // 2. Figure out the x component in the following coordinate system
            //     x right +, y down +, top-left is 0,0
        },

        /**
         * Determine the y-component of the vector
         *
         * @return {Number} y-component
         */

        y = function () {
            // Simlar to above
        };

    /*
     * @prototype
     */
    Vector.prototype.x = x;
    Vector.prototype.y = y;

    return Vector;
});