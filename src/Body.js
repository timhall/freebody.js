/*
 * Body with mass, position, velocity, acceleration, and forces
 */

define(
['Vector', 'utils'],
function (Vector, utils) {
    
    /**
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
    };
    
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
});
