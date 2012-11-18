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
['src/utils', 'public/js/lodash.min'],
function (utils, _) {   
    /**
     * @class Vector
     * @param {Object} [options]
     *     Any options to set inline (magnitude or angle)
     * @chainable
     */ 
    
    var Vector = function (options) {
        var vector = this;
        
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
        
        // Magnitude of the vector
        vector.magnitude = (options && options.magnitude) || 0;        
        
        // Angle of vector (in degrees)
        vector.angle =(options && options.angle) || 0;
        
        // Right here :)
        vector.x(options && options.x);
        vector.y(options && options.y);
        
        // Chainable
        return vector;
    };
    
    // Global options
    Vector.options = {
        precision: 0.00001   
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
    };
   
    /**
     * Create time-based vector
     * 
     * @param {Object} options
     * @param {Number} duration (in ms)
     * @return {Function} vector function that takes elapsed time as argument
     * @static
     */
    
    // Create a vector with duration
    Vector.createWithDuration = function (options, duration) {
        // Create static vector value
        var value = new Vector(stripDuration(options));
        
        // Create duration vector function
        var durationVector = function (elapsed) {
            durationVector.lifetime += (elapsed || 0);
            
            if (durationVector.lifetime < durationVector.duration) {
                return value;
            } else {
                return null;  
            }
        };
        
        // Add lifetime and duration properties
        durationVector.lifetime = 0;
        durationVector.duration = (duration || 0);
        
        return durationVector;
    };
    
    
    // Very generic method for calculating and setting the
    // magnitude and angle based on given x- and y-values
    var setMagnitudeAndAngle = function (vector, xValue, yValue) {
        if (xValue === 0 && yValue === 0) {
            vector.angle = 0;
            vector.magnitude = 0;
        } else {
            vector.angle = utils.degrees(Math.atan(yValue/xValue));
            vector.magnitude = utils.hypotenuse(xValue, yValue);
        }
    };
    
    // Strip duration from magnitude
    var stripDuration = function (options) {
        // Update magnitude to include just value
        delete options.duration;
        
        // Return everything else unmodified
        return options;
    };
    
    return Vector;
});