/**
 * Body with mass, position, velocity, acceleration, and forces
 *
 * @class Body
 * @param {Object} [attr]
 *     Any attributes to set inline (mass, x, y, v, a, forces, lifetime)
 */
var Body = freebody.Body = function (attr) {
  _.extend(this, _.defaults({}, attr, {
    mass: 0,
    x: 0,
    y: 0,
    v: new Vector(),
    a: new Vector(),
    forces: [],
    lifetime: 0
  }));
  
  return this;
};

// Global options for body
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
 * @param {Number} limit at which to stop advance (in ms)
 * @param {Number} [timestep] Optional timestep in ms
 *     (Use Body.options.timestep by default)
 * @chainable
 */
Body.prototype.advance = function (limit, timestep) {
  var body = this;
  var elapsed = 0;
  var stopAdvance;
  
  if (timestep === undefined) {
    if (body.isVariable()) {
      timestep = limit / Math.ceil(limit / Body.options.timestep);
    } else {
      timestep = limit;
    }
  }
  
  if (timestep > 0) {
    stop = createStopCallback(limit);
    
    while(!stop(body, elapsed) && elapsed < Body.options.maxAdvanceTime) {
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
    body.x = body.x + (vX * timestep);
    body.y = body.y + (vY * timestep);
    
    // 2. Set acceleration based on force (only if mass > 0)
    if (body.mass > 0) {
      body.a.x(netForce.x() / body.mass);
      body.a.y(netForce.y() / body.mass);
    }
    
    // 3. Update velocity based on acceleration
    body.v.x(body.v.x() + (body.a.x() * timestep));
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
  return !!_.any(this.forces, _.isFunction);
};

/**
 * Calculate the net force currently acting on the body
 * 
 * @return {Vector}
 * @prototype
 */
Body.prototype.netForce = function () {
  var body = this;
  var netForceX = 0;
  var netForceY = 0;
  var forceValue;
  
  for (var i = 0, max = body.forces.length; i < max; i += 1) {
    // If force is function evaluate to get vector
    forceValue = _.isFunction(body.forces[i]) ? body.forces[i](body) : body.forces[i];
    
    netForceX += forceValue.x();
    netForceY += forceValue.y();
  }
  
  // Get existing net force or create new vector
  this._netForce = this._netForce || new Vector();
  
  // Set the x and y components of the net force
  return this._netForce.x(netForceX).y(netForceY);
};

/**
 * Calculate path for specified ms into the future
 * 
 * @param {Number} ms
 * @param {Number} timestep
 * @returns {Array} path points ({ x, y, t })
 */
Body.prototype.path = function (ms, timestep) {
  // Maybe just create a clone of 'this'
  // and advance...
  
  var clone = this.clone();
  var elapsed = 0;
  var path = [];
  var stopAdvance;
      
  timestep = timestep || Body.options.timestep;
  
  if (timestep > 0) {
    stop = createStopCallback(ms);
    
    while(!stop(clone, elapsed) && elapsed < Body.options.maxAdvanceTime) {
      // Update elapsed time
      elapsed += timestep; 
      
      // Move object and store position
      clone.move(timestep);
      path.push({
        x: clone.x, 
        y: clone.y,
        t: elapsed
      });
    }
  }
  
  return path;
};

/**
 * Get a clone of the body
 *
 * @returns {Body}
 */
Body.prototype.clone = function () {
  var original = this;
  
  var cloned = new Body({
    mass: original.mass,
    x: original.x,
    y: original.y
  });
  cloned.v = new freebody.Vector(original.v.magnitude(), original.v.angle());
  cloned.a = new freebody.Vector(original.a.magnitude(), original.a.angle());
  cloned.forces = original.forces;  
  return cloned;
};

// Create stop callback based on the specified limit
var createStopCallback = function (limit) {
  return function (body, elapsed) {
    return elapsed >= limit;       
  };
};  
