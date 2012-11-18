/*
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
// ball.v = new Vector({ magnitude: 60, angle: 45 });
// 
// // Check on ball after 3 seconds
// // (Advance it 3000 ms into the future)
// ball.advance(3000);
// 
// // Get current velocity in y-direction
// var speed = ball.v.y();
// 
// // Strap a rocket to the ball for 8 seconds
// ball.forces.push(Vector.createWithDuration({ magnitude: 100, angle: 270 }, 8000));
// 
// // and check on the height after 12 seconds
// ball.advance(12000);
// var height = ball.y;
// 
// // Finally, set values quickly inline
// ball = new Body({ x: 10, y: 10, v: { magnitude: 60, angle: 45 } });
// ```

define(
['src/Vector', 'src/utils', 'public/js/lodash.min'],
function (Vector, utils, _) {
    
    /**
     * @class Body
     * @param {Object} [options]
     *     Any options to set inline (mass, x, y, v, a)
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
            // If v is a Vector then assign the standard value
            // If v is a plain object, create a Vector and assign the standard
            this.v = (options.v instanceof Vector)
                ? options.v 
                : new Vector(options.v);   
        } else {
            // Initialize v as empty Vector if not given
            this.v = new Vector();
        }
        
        // TODO: Set 'a' similar to velocity above
        this.a = new Vector();
        
        // Initialize forces
        this.forces = [];
        
        // Initialize time scale
        this.lifetime = 0;
        
        return this;
    };
    
    // Set global options for Body
    Body.options = {
        // Default timestep (in ms)
        timestep: 8,
        
        // Set maximum advance time to avoid infinite loops
        maxAdvanceTime: 30000,
        
        // Precision of calculations
        precision: 0.00001
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
     *
     * @param {Number|Object|function} limit at which to stop advance
     *     time (in ms), 
     *     limit on Body properties (e.g. { x: 10 }), 
     *     or latch function that returns true when it's time to stop
     *     Callback form:
     *       param {Object} body Instance of body
     *       param {Number} elapsed Time that has elapsed during advance
     *       return {Boolean} true = stop advance, false = continue
     * @param {Number} [timestep] Optional timestep in ms
     *     (Use Body.options.timestep by default)
     * @chainable
     */

    Body.prototype.advance = function (limit, timestep) {
        var body = this,
            elapsed = 0,
            stopAdvance;
        
        // Set timestep (if undefined)
        if (_.isUndefined(timestep)) {
            // If forces / a is variable or limit isn't a set time, use default, 
            // otherwise set at limit
            if (body.isVariable() && _.isNumber(limit)) {
                // If the limit is set a defined time, divide the timestep so that it
                // hits close to limit
                timestep = limit / Math.ceil(limit / Body.options.timestep);
            } else {
                timestep = _.isNumber(limit) ? limit : Body.options.timestep;   
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
        
        // Convert timestep from ms to s
        timestep = timestep / 1000;
        
        if (timestep > 0) {
            // TODO: Apply physics
            // This order:
            // 1. Update position based on velocity
            body.x = body.x + (vX * timestep); // m = m + m/s * s (woohoo)
            body.y = body.y + (vY * timestep);
            
            // These 2, we'll have to think about which comes first
            // (but I'm pretty sure this is right)
            // 2. Set acceleration based on force
            body.a.x(netForce.x() / body.mass); // m/s2 = N/kg (weirdest conversion in Physics, but it's right)
            body.a.y(netForce.y() / body.mass);
            
            // 3. Update velocity based on acceleration
            body.v.x(body.v.x() + (body.a.x() * timestep)); // m/s = m/s + m/s^2 * s (good)
            body.v.y(body.v.y() + (body.a.y() * timestep));
            
            // Update lifetime
            body.lifetime += timestep;
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
        var body = this;
        
        // Check if either a or forces contains a function
        return !!_.find(body.a, _.isFunction) || !!_.find(body.forces, _.isFunction);
    };
    
    /**
     * Convience method for getting current state of Body
     * 
     * @return {Object}
     * @prototype
     */
    
    Body.prototype.state = function () {
        return {
            // Current x and y values
            x: this.x,
            y: this.y,
            
            // Current velocity
            v: this.v,
            
            // TODO: This should be eventually return the net acceleration
            // a: this.a
        };
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
        
        _.each(body.forces, function (force) {
            // TODO: This needs to be done...
        });
        
        // Set the x and y components of the net force
        return new Vector({ 
            x: netForceX, 
            y: netForceY
        });
    };
    
    // Create stop advance callback based on the specified limit
    var createStopAdvanceCallback = function (limit) {
        // Advance requires a callback function that it checks on each step 
        // in order to determine whether to stop the advance
        //
        // The callback is a latch function that returns a `Boolean`
        // and is `true` when it is time to stop
        //
        // If a state (`Object`) or time (`Number`) is used as the limit
        // a function needs to be created to check these for the callback
        // If a function is given for the limit, it is used as the callback
        //
        // Callback form:
        // @param {Object} body Instance of body
        // @param {Number} elapsed Time that has elapsed during advance
        // @return {Boolean} true = stop advance, false = continue
        
        if (_.isFunction(limit)) {
            
            // limit is a function, so use as stopAdvance check callback
            return limit;
            
        } else if (_.isObject(limit)) {
            
            // limit by state for stopAdvance callback
            return function (body, elapsed) {
                // Compare the values in limit 
                // to the corresponding values in the current state
                return _.isEqual(
                    limit, 
                    // Pick out the values from state that are specified in limit
                    _.pick(body.state(), _.keys(limit))
                );
                
                /*
                isEqual compares too objects
                limit = { v: 10 } (Stop when v = 10)
                isEqual({ v: 10 }, (state) { v: 10 }) => true
                
                since the state might include extra things which would mess up isEqual
                isEqual({ v: 10 }, { x: 100, v: 10 }) => false
                
                we pick out only the parts of the state that we need
                _.keys(limit) = ['v']
                _.pick({ x: 100, v: 10 }, ['v']) => { v: 10 }
                
                which is then good to compare to the limit
                isEqual({ v: 10 }, ...) => true
                */
            };
            
        } else {
            
            // limit by elapsed time for stopAdvance callback
            return function (body, elapsed) {
                return elapsed >= limit;       
            }
            
        }
    };

    return Body;
});
