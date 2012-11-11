/**
 * Vector class to represent forces, velocities, etc.
 */ 

// Example:
// ```
// var force = new Vector();
// 
// // Set magnitude and angle of force
// force.magnitude = 12;
// force.angle = 45;
// 
// // Get x- and y-components
// var forceX = force.x(),
//     forceY = force.y();
// 
// // Can also create force from components
// force = new Vector();
// force.x(3);
// force.y(4);
// 
// var forceNet = force.magnitude; // = 5
// 
// // Finally, set values quickly inline
// force = new Vector({ magnitude: 12, angle: 45 });
// force = new Vector({ x: 3, y: 4 });
// 
// ```
 
// Things to do:
// 1. Figure out how angles are set
//     (i.e. where's zero + what direction does it rotate
// 2. Figure out the x component in the following coordinate system
//     x right +, y down +, top-left is 0,0

// Whenever you see an uppercase in js it's a 'class'
// so these will be a set of properties and functions that we can
// create new ones of
//
// Like this:
// Vehicle = function () { color, topspeed (this isn't how this part actually looks, so I'll show you) }
// car = new Vehicle();
// car.color = 'Blue';
// car.topspeed = 120;
// 
// truck = new Vehicle();
// truck.color = 'Brown';
// truck.topspeed = 90;
//


define(
[],
function () {   
    /**
     * @class Vector
     * @param {Object} [options]
     *     Any options to set inline (magnitude or angle)
     * @return {Object} Vector
     */ 
    
    var Vector = function (options) {
        // Magnitude of the vector
        this.magnitude = (options && options.magnitude) || 0;
        
        // Angle of vector (in degrees)
        this.angle =(options && options.degress) || 0;
    };
    
    // This looks good Riley! But, we'll put it in the Body class ;)
    // var shipForce = new Vector();

    /**
     * Determine the x-component of the vector
     *
     * @param {Number} [newValue] Optional, set new value
     * @return {Number} x-component
     * @prototype
     */

    Vector.prototype.x = function (newValue) {
        if (newValue !== undefined) {
            // My recommendation:
            // Keep the y-component fixed, set the x-value,
            // and then set magnitude and angle
            
            return newValue;
        } else {
            return this.magnitude * Math.cos(radians(this.angle));
        }
        
            // This looks good Riley! But, we'll put it in the Body class
            //var result = 0;
            //for (var i=0;i<shipForce.length;i++){
            //result = result + shipForce[i].magnitude * Math.cos(radians(shipForce[i].angle));
            //}
            //return result;
    };

    /**
     * Determine the y-component of the vector
     *
     * @param {Number} [newValue] Optional, set new value
     * @return {Number} y-component
     * @prototype
     */

    Vector.prototype.y = function (newValue) {
        if (newValue !== undefined) {
            // Similar to above
            
            return newValue;
        } else {
            return this.magnitude * Math.sin(radians(this.angle));
        }
    };
    
    /**
     * Determine the radians of a given angle
     * 
     * @param {Number} angle in degrees
     * @return {Number} angle in radians
     */
    
    var radians = function (angle) {
        return angle * (Math.PI / 180); 
    };

    return Vector;
});