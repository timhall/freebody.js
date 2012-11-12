/**
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
// // Add gravity
// ball.a.push(new Vector({ magnitude: 9.8, angle: 90 }));
// 
// // Check on ball after 3 seconds
// // (Advance it 3000 ms into the future)
// ball.advance(3000);
// 
// // Get current velocity in y-direction
// var speed = ball.v.y();
// 
// // Strap a rocket to the ball for 8 seconds
// ball.forces.push(new Vector({ magnitude: { value: 100, duration: 8000 }, angle: 270 }));
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
    
    var options = {
        // Default timestep (in ms)
        timestep: 10,
        
        // Set maximum advance time to avoid infinite loops
        maxAdvanceTime: 30000
    }
    
    /**
     * @class Body
     * @param {Object} [options]
     *     Any options to set inline (mass, x, y, v)
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
            // If v is a plain object, create a Vector
            this.v = (options.v instanceof Vector)
                ? options.v 
                : new Vector(options.v);   
        } else {
            // Initialize v as empty Vector if not given
            this.v = new Vector();
        }
        
        // Initialize acceleration(s) and forces
        this.a = [];
        this.forces = [];
        
        // Initialize time scale
        this.lifetime = 0;
        
        return this;
    };

    /**
     * Advance through time and find the future body state
     *
     * @param {Number|Object|function} limit at which to stop advance
     *     time (in ms), 
     *     limit on Body properties (e.g. { x: 10 }), 
     *     or latch function that returns true when it's time to stop
     * @param {Number} [timestep] in ms
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
            timestep = (body.isVariable() || !_.isNumber(limit))
                ? options.timestep : limit;   
        }
        
        if (timestep > 0) {
            // Create stop advance callback
            stopAdvance = createStopAdvanceCallback(limit);
            
            while(!stopAdvance(body, elapsed) && elapsed < options.maxAdvanceTime) {
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
        
        if (timestep > 0) {
            // TODO: Apply physics
            
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
        var self = this;
        
        // Check if either a or forces contains a function
        return !!_.find(self.a, _.isFunction) || !!_.find(self.forces, _.isFunction);
    };
    
    /**
     * Convience method for getting current state of Body
     * 
     * @Return {Object}
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
        }
    };
    
    // Create stop advance callback based on the specified limit
    var createStopAdvanceCallback = function (limit) {
        if (_.isFunction(limit)) {
            
            // limit is a function, so use as stopAdvance check callback
            return limit;
            
        } else if (_.isObject(limit)) {
            
            // limit by properties for stopAdvance callback
            return function (body, elapsed) {
                // Compare the values in limit 
                // to the corresponding values in the current state
                return _.isEqual(
                    limit, 
                    // Pick out the values from state that are specified in limit
                    _.pick(body.state(), _.keys(limit))
                );
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
