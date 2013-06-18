// Freebody.js - Free-body mechanics / physics engine in javascript
// (c) Tim Hall - https://github.com/timhall/freebody.js - License: MIT

var freebody = (function(global, _, undefined){
  "use strict";

  // Define and export the freebody namespace
  var freebody = {};

var utils = freebody.utils = {};

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

/**
 * Vector class for simply representing force, velocity, etc.
 * 
 * @class Vector
 * @param {Number} [magnitude]
 * @param {Number} [angle]
 */
var Vector = freebody.Vector = function (magnitude, angle) {
// Set instance values for magnitude and angle
this._magnitude = (magnitude || 0);
this._angle = (angle || 0);

return this;
};

/**
 * Determine the magnitude of the vector
 *
 * @param {Number} [value] Optional, set new value
 * @return {Number} magnitude
 * @prototype
 * @chainable
 */
Vector.prototype.magnitude = function (value) {
  if (value !== undefined) { 
    // Setter 
    this._magnitude = value; 

    // Return parent for chaining 
    return this; 
  } else { 
    // Getter 
    return this._magnitude; 
  }
};

/**
 * Determine the angle of the vector
 *
 * @param {Number} [value] Optional, set new value
 * @return {Number} angle
 * @prototype
 * @chainable
 */
Vector.prototype.angle = function (value) {
  if (value !== undefined) { 
    // Setter 
    this._angle = value; 

    // Return parent for chaining 
    return this; 
  } else { 
    // Getter 
    return this._angle; 
  }
};

/**
 * Determine the x-component of the vector
 *
 * @param {Number} [value] Optional, set new value
 * @return {Number} x-component
 * @prototype
 * @chainable
 */
Vector.prototype.x = function (value) {
  if (value !== undefined) { 
    setMagnitudeAndAngle(this, value, this.y()); 
    return this; 
  } else { 
    return this._magnitude * Math.cos(utils.radians(this._angle)); 
  }
};

/**
 * Determine the y-component of the vector
 *
 * @param {Number} [value] Optional, set new value
 * @return {Number} y-component
 * @prototype
 * @chainable
 */     
Vector.prototype.y = function (value) {
  if (value !== undefined) { 
    setMagnitudeAndAngle(this, this.x(), value); 
    return this; 
  } else { 
    return this._magnitude * Math.sin(utils.radians(this._angle)); 
  }    
};

var setMagnitudeAndAngle = function (vector, xValue, yValue) { 
  vector._magnitude = utils.hypotenuse(xValue, yValue); 
  vector._angle = utils.degrees(Math.atan2(yValue, xValue)); 
};

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

var gravity = freebody.gravity = {};

// Gravitational constants
var G = 0.000000000066;
var G_EARTH = 9.8;

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
  var g = function(body){
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
  var GM = G * planet.mass;
  var force = new Vector();
  
  // Allow for custom power for exaggerated effect
  power = power || 2;
  
  // Gravitation force
  var g = function(body) {
    force.magnitude(
        GM / Math.pow(utils.distance(body, planet), power) * body.mass    
    );
    force.angle(utils.angle(body, planet));

    return force;
  };
  
  // Add gravitational force to body
  body.forces.push(g);
};   

  return freebody;
})(this, _);
