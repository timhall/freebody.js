/**
 * Vector class to represent forces, velocities, etc.
 */
define(
[],
function () {
    var 
        /**
         * Base object for representing vectors
         *
         * @class Vector
         * @param {Object} [options]
         *     Any options to set inline (magnitude or angle)
         * @return {Object} Vector
         */

        Vector = function (options) {
            this.magnitude = options.magnitude || 0;
            this.angle = options.angle || 0;
        },

        /**
         * Determine the x-component of the vector
         *
         * @return {Number} x-component
         */

        xComponent = function () {
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

        yComponent = function () {
            // Simlar to above
        };

    /*
     * @prototype
     */
    Vector.prototype.xComponent = xComponent;
    Vector.prototype.yComponent = yComponent;

    return Vector;
});