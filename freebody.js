// Freebody.js - Free-body mechanics / physics engine in javascript
// (c) Tim Hall - https://github.com/timhall/freebody.js - License: MIT

var freebody = (function(global){
    "use strict";

    // Define and export the freebody namespace
    var freebody = {};

freebody.utils = (function () {
    var utils = {};
    
    /**
     * Determine the radians of a given angle
     * 
     * @param {Number} angle in degrees
     * @return {Number} angle in radians
     */
     
    utils.radians = function (angle) {
        return angle * (Math.PI / 180); 
    };
    
    /**
     * Determine the degrees of a given angle
     * 
     * @param {Number} angle in radians
     * @return {Number} angle in degrees
     */
    
    utils.degrees = function (angle) {
        return angle * (180 / Math.PI);  
    };
    
    /**
     * Determine the length of the hypotenuse for the given sides
     * 
     * @param {Number} x Length of first side
     * @param {Number} y Length of second side
     * @return {Number} length of hypotenuse
     */
    
    utils.hypotenuse = function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));  
    };
    
    /**
     * Round to specified number of decimal places
     * 
     * @param {Number} number Number to round
     * @param {Integer} dec Decimal places to round to
     * @return {Number} rounded number
     */
    
    utils.roundToDec = function (number, dec) {
        var multiplier = Math.pow(10, dec);
        return Math.round(number * multiplier) / multiplier;
    };
    
    /**
     * Round to specified precision (e.g 0.00001)
     * 
     * @param {Number} number Number to round
     * @param {Integer} precision Precision to round to (e.g. 0.0001)
     * @return {Number} rounded number
     */
    
    utils.roundToPrecision = function (number, precision) {
        var dec = Math.round(utils.log10(1 / (precision || 1)));
        return utils.roundToDec(number, dec);
    };
    
    /**
     * Find the base-10 log of the given number
     * 
     * @param {Number} number
     * @return {Number} log base-10
     */
    
    utils.log10 = function (number) {
        return Math.log(number) / Math.LN10;  
    };
    
    /**
     * Find the distance between two bodies
     * 
     * @param {Body} start
     * @param {Body} destination
     * @return {Number} distance
     */
    
    utils.distance = function (start, finish) {
        return utils.hypotenuse(start.x - finish.x, start.y - finish.y);
    };
    
    /**
     * Find the angle between two bodies
     * (wrt start body)
     * 
     * @param {Body} start
     * @param {Body} destination
     * @return {Number} angle (in degrees)
     */
    
    utils.angle = function (start, finish) {
        return utils.degrees(Math.atan2(finish.y-start.y, finish.x-start.x));
    };
    
    // Lodash methods
    // [Lo-Dash](http://lodash.com/)
    
    /**
     * Checks if `value` is a number
     *
     * @param {Mixed} value The value to check
     * @returns {Boolean} Returns `true` if the `value` is a number, else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */

    utils.isNumber = function (value) {
        return typeof value == 'number' || toString.call(value) == '[object Number]';
    }
    
    /**
     * Checks if `value` is a function.
     *
     * @param {Mixed} value The value to check
     * @returns {Boolean} Returns `true` if the `value` is a function, else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */
     
    utils.isFunction = function (value) {
        return typeof value == 'function';
    };
    // fallback for older versions of Chrome and Safari
    if (utils.isFunction(/x/)) {
        utils.isFunction = function(value) {
          return toString.call(value) == '[object Function]';
        };
    }
    
    /**
     * Checks if the `callback` returns a truthy value for **any** element of a
     * `collection`. The function returns as soon as it finds passing value, and
     * does not iterate over the entire `collection`. The `callback` is 
     * invoked with three arguments; (value, index|key, collection).
     *
     * @param {Array} collection The collection to iterate over.
     * @param {Function} callback The function called per iteration.
     * @returns {Boolean} Returns `true` if any element passes the callback check,
     *  else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */
     
    utils.any = function (collection, callback) {
        var result;
    
        var index = -1,
            length = collection.length;
    
        while (++index < length) {
            if ((result = callback(collection[index], index, collection))) {
                break;
            }
        }
        return !!result;
    }
    
    return utils;
})();

freebody.Vector = (function (utils) {
    
    /**
     * Vector class for simply representing force, velocity, etc.
     * 
     * @class Vector
     * @param {Number} [magnitude]
     * @param {Number} [angle]
     */

    var Vector = function (magnitude, angle) {
        // Set instance values for magnitude and angle
        this._magnitude = (magnitude || 0);
        this._angle = (angle || 0);
        
        return this;
    };
    
    /**
     * @prototype
     */
    Vector.prototype = {
        
        /**
         * Determine the magnitude of the vector
         *
         * @param {Number} [value] Optional, set new value
         * @return {Number} magnitude
         * @prototype
         * @chainable
         */

        magnitude: function (value) {
            if (value !== undefined) { 
                // Setter 
                this._magnitude = value; 
        
                // Return parent for chaining 
                return this; 
            } else { 
                // Getter 
                return this._magnitude; 
            }
        },
        
        /**
         * Determine the angle of the vector
         *
         * @param {Number} [value] Optional, set new value
         * @return {Number} angle
         * @prototype
         * @chainable
         */

        angle: function (value) {
            if (value !== undefined) { 
                // Setter 
                this._angle = value; 
        
                // Return parent for chaining 
                return this; 
            } else { 
                // Getter 
                return this._angle; 
            }
        },
        
        /**
         * Determine the x-component of the vector
         *
         * @param {Number} [value] Optional, set new value
         * @return {Number} x-component
         * @prototype
         * @chainable
         */

        x: function (value) {
            if (value !== undefined) { 
                setMagnitudeAndAngle(this, value, this.y()); 
                return this; 
            } else { 
                return this._magnitude * Math.cos(utils.radians(this._angle)); 
            }
        },
        
        /**
         * Determine the y-component of the vector
         *
         * @param {Number} [value] Optional, set new value
         * @return {Number} y-component
         * @prototype
         * @chainable
         */ 
             
        y: function (value) {
            if (value !== undefined) { 
                setMagnitudeAndAngle(this, this.x(), value); 
                return this; 
            } else { 
                return this._magnitude * Math.sin(utils.radians(this._angle)); 
            }    
        }
    }
    
    var setMagnitudeAndAngle = function (vector, xValue, yValue) { 
        vector._magnitude = utils.hypotenuse(xValue, yValue); 
        vector._angle = utils.degrees(Math.atan2(yValue, xValue)); 
    }
    
    return Vector;

})(freebody.utils);

freebody.Body = (function (Vector, utils) {
    /**
     * Body with mass, position, velocity, acceleration, and forces
     *
     * @class Body
     * @param {Object} [options]
     *     Any options to set inline (mass, x, y, v, a)
     */
    var Body = function (options) {
        // Set the default mass, position, velocity, and acceleration
        this.mass = (options && options.mass) || 0;
        this.x = (options && options.x) || 0;
        this.y = (options && options.y) || 0;
        this.v = (options && options.v) || new Vector();
        this.a = (options && options.a) || new Vector();
        
        // Initialize forces and lifetime
        this.forces = [];
        this.lifetime = 0;
        
        return this;
    } 

    /**
     * Global options for body
     * @static
     */
    Body.options = {
        // Default timestep (in ms)
        timestep: 8,
        
        // Set maximum advance time to avoid infinite loops
        maxAdvanceTime: 30000
    };

    /**
     * Advance the body through time until the defined limit is reached,
     * updating the body properties along the way
     * 
     * Ex:
     * 
     * // Advance the body 2 seconds into the future
     * body.advance(2000);
     * 
     * // Advance the body until x = 10, using 10 ms timesteps
     * body.advance({ x: 10 }, 10);
     * 
     * // Advance the body until the fn returns true
     * body.advance(function () { ... return true; });
     * @param {Number|Object|function} limit at which to stop advance (in ms)
     * @param {Number} [timestep] Optional timestep in ms
     *     (Use Body.options.timestep by default)
     * @chainable
     */
    Body.prototype.advance = function (limit, timestep) {
        var body = this,
            elapsed = 0,
            stopAdvance;
        
        // Set timestep (if undefined)
        if (timestep === undefined) {
            // If forces / a is variable or limit isn't a set time, use default, 
            // otherwise set at limit
            if (body.isVariable() && utils.isNumber(limit)) {
                // If the limit is set at a defined time, divide the timestep so that it
                // hits close to limit
                timestep = limit / Math.ceil(limit / Body.options.timestep);
            } else {
                timestep = utils.isNumber(limit) ? limit : Body.options.timestep;   
            } 
        }
        
        if (timestep > 0) {
            // Create stop advance callback
            stopAdvance = createStopAdvanceCallback(limit);
            
            while(!stopAdvance(body, elapsed) && elapsed < Body.options.maxAdvanceTime) {
                // Update elapsed time
                elapsed += timestep; 
                
                // Move object
                body.move(timestep);           
            }
        }
        
        return body;
    };
    
    /**
     * Move the object by applying physics for the specified timestep
     * 
     * @param {Number} timestep
     * @chainable
     */
    Body.prototype.move = function (timestep) {
        var body = this;
        var vX = body.v.x();
        var vY = body.v.y();
        var netForce = body.netForce();
        
        // Update lifetime and convert timestep from ms to s
        body.lifetime += timestep;
        timestep = timestep / 1000;
        
        if (timestep > 0) {
            // Apply physics
            // 1. Update position based on velocity
            body.x = body.x + (vX * timestep); // m = m + m/s * s (woohoo)
            body.y = body.y + (vY * timestep);
            
            // 2. Set acceleration based on force (only if mass > 0)
            body.a.x(body.mass > 0 ? netForce.x() / body.mass : 0);
            body.a.y(body.mass > 0 ? netForce.y() / body.mass : 0);
            
            // 3. Update velocity based on acceleration
            body.v.x(body.v.x() + (body.a.x() * timestep)); // m/s = m/s + m/s^2 * s (good)
            body.v.y(body.v.y() + (body.a.y() * timestep));
        }
        
        return body;
    };
    
    /**
     * Check if body has any variable forces or acceleration
     * 
     * @return {Boolean}
     * @prototype
     */
    Body.prototype.isVariable = function () {
        // Check if forces contains a function
        return !!utils.any(this.forces, utils.isFunction);
    };
    
    /**
     * Calculate the net force currently acting on the body
     * 
     * @return {Vector}
     * @prototype
     */
    Body.prototype.netForce = function () {
        var body = this,
            netForceX = 0,
            netForceY = 0,
            forceValue;
        
        for (var i = 0, max = body.forces.length; i < max; i += 1) {
            // If force is function evaluate to get vector
            forceValue = utils.isFunction(body.forces[i]) 
                ? body.forces[i]() 
                : body.forces[i];
            
            netForceX += forceValue.x();
            netForceY += forceValue.y();
        }
        
        // Set the x and y components of the net force
        return new Vector().x(netForceX).y(netForceY);
    };
    
    // Create stop advance callback based on the specified limit
    var createStopAdvanceCallback = function (limit) {
        // Advance requires a callback function that it checks on each step 
        // in order to determine whether to stop the advance
        //
        // The callback is a latch function that returns a `Boolean`
        // and is `true` when it is time to stop
        // 
        // limit: {Number} create function to check limit
        // (Future) limit: {Object (State)| function}
        //
        // Callback form:
        // @param {Object} body Instance of body
        // @param {Number} elapsed Time that has elapsed during advance
        // @return {Boolean} true = stop advance, false = continue
        
        // limit by elapsed time for stopAdvance callback
        return function (body, elapsed) {
            return elapsed >= limit;       
        }
    };

    return Body;
})(freebody.Vector, freebody.utils);    

freebody.gravity = (function (Vector, utils) {
    
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
        var force = new Vector().angle(-90);
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
})(freebody.Vector, freebody.utils);   


    return freebody;
})(this);