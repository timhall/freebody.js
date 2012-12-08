define(
['src/utils'],
function (utils) {
    
    /*
    Goal:
    
    1. Define some variable that you want to turn into a vector
        var force = {};
        
    2. Transform into vector object
        vector(force);
        -> force = { magnitude: 0, angle: 0, x: 0, y: 0 }
        
    3. Set values of force
        vector(force).x(10).y(20);
        vector(force).magnitude(30).angle(45);
    
    4. Get values of force
        forceX = force.x;
        forceM = force.magnitude
        
    5. Create the force in one step
        var force = vector({ angle: 45 }).magnitude(10).value();
        (use .value() to get the value from the vector chain)
        
    ==> Very low overhead objects (no prototype or anything like that)
        All the vector functionality is solely in the vector class
        Use chaining to set values and store plain values on object
    
    */
    
    var vector = function (obj) {
        // First store vector value
        vector.value = obj || {};
        
        // Define vector properties on object
        if (typeof vector.value.magnitude !== 'undefined') { vector.magnitude(vector.value.magnitude); }
        if (typeof vector.value.angle !== 'undefined') { vector.angle(vector.value.angle); }
        if (typeof vector.value.x !== 'undefined') { vector.x(vector.value.x); }
        if (typeof vector.value.y !== 'undefined') { vector.y(vector.value.y); }
        
        // Initialize any missing properties
        initialize(vector.value || {});
        
        // Finally, return vector for chaining
        return vector;
    }
    
    // Generic chainable getter/setter
    var getSetVector = function (property) {
        return function (value) {
            if (typeof value === 'undefined') {
                // If no value is given, treat as get
                return this.value[property];
            } else {
                // Set magnitude and then update x and y
                this.value[property] = value;
                
                // Based on property, update x/y or mag/angle
                if (property === 'magnitude' || property === 'angle') {
                    setXAndY(vector.value);    
                } else {
                    setMagnitudeAndAngle(vector.value);
                }
                
                // Continue chain
                return this;    
            }
        }        
    };
    
    vector.magnitude = getSetVector('magnitude');
    vector.angle = getSetVector('angle');
    vector.x = getSetVector('x');
    vector.y = getSetVector('y');
    
    var initialize = function (obj) {
        obj.magnitude = obj.magnitude || 0;
        obj.angle = obj.angle || 0;
        obj.x = obj.x || 0;
        obj.y = obj.y || 0;
        return obj;
    };
    
    var setXAndY = function (obj) {
        // Initialize magnitude and angle (if needed)
        obj.magnitude = obj.magnitude || 0;
        obj.angle = obj.angle || 0;
        
        obj.x = obj.magnitude * Math.cos(utils.radians(obj.angle));
        obj.y = obj.magnitude * Math.sin(utils.radians(obj.angle));
    };
    
    var setMagnitudeAndAngle = function (obj) {
        // Initialize x and y (if needed)
        obj.x = obj.x || 0;
        obj.y = obj.y || 0;
        
        var angle = utils.degrees(Math.atan(obj.y/obj.x));
        
        obj.magnitude = utils.hypotenuse(obj.x, obj.y);
        obj.angle = (obj.x >= 0) ? angle : angle + 180;
    };
    
    return vector;
    
});