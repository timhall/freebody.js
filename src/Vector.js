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

// It's so that we can do this right here:
// force = new Vector({ magnitude: 12, angle: 45 });

// This is what I was talking about
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
['src/utils'],
function (utils) {   
    /**
     * @class Vector
     * @param {Object} [options]
     *     Any options to set inline (magnitude or angle)
     * @return {Object} Vector
     */ 
    
    var Vector = function (options) {
        // Magnitude of the vector
        
        // This line is pretty sweet
        // 1. It checks if options is defined
        // 2. If (and only if) options is defined, pull out magnitude property
        // 3. If magnitude is defined use it
        // 4. Otherwise (||) use default value of 0;
        
        // var v = new Vector()
        // (options is undefined)
        // (undefined && not checked since the prev is undefined)
        // this.magnitude = (undefined) || 0; => 0
        
        // var v = new Vector({ magnitude: 10 });
        // options = { magnitude: 10 };
        // ({...} && options.magnitude) => 10 is returned
        // this.magnitude = 10 || 0
        // (since first part is defined, use it and skip 0)
        
        
        this.magnitude = (options && options.magnitude) || 0;
        
        // Angle of vector (in degrees)
        this.angle =(options && options.angle) || 0;
        
        // Right here :)
        this.x(options && options.x);
        this.y(options && options.y);
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

    Vector.prototype.x = function (xValue) {
        if (xValue !== undefined) {
            // My recommendation:
            // 1. Get the current y-component and keep it fixed, 
            // 2. Set the x-value,
            // 3. Set magnitude and angle based on the given x and y-values
            
            // Since we need y for both mag. and angle, I'm going to save a copy
            // so it doesn't change
            
            
            setMagnitudeAndAngle(this, xValue, this.y());
            return xValue;
        } else {
            return this.magnitude * Math.cos(utils.radians(this.angle));
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

    Vector.prototype.y = function (yValue) {
        if (yValue !== undefined) {
            setMagnitudeAndAngle(this, this.x(), yValue);
            return yValue;
        } else {
            return this.magnitude * Math.sin(utils.radians(this.angle));
        }
    }
   
    var setMagnitudeAndAngle = function (vector, xValue, yValue) {
        // Very generic method for calculating and setting the
        // magnitude and angle based on given x- and y-values
        
        vector.angle = utils.degrees(Math.atan(yValue/xValue));
        vector.magnitude = Math.sqrt(Math.pow(xValue,2)+Math.pow(yValue,2));
        
        // And that's it.
        
    };
    return Vector;
});