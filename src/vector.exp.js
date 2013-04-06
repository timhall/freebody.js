
freebody.vector = (function (utils) {
    
    /*
    Goal:
    
    1. Define some variable that you want to turn into a vector
        var force = {};
        
    2. Transform into vector object
        vector.create(force);
        -> force = { magnitude: 0, angle: 0, x: 0, y: 0 }
        
    3. Set values of force
        vector.update(force).x(10).y(20);
        vector.update(force).magnitude(30).angle(45);
    
    4. Get values of force
        forceX = force.x;
        forceM = force.magnitude
        
    5. Create the force in one step
        var force = vector.create({ angle: 45 }).magnitude(10).value();
        (use .value() to get the value from the vector chain)
        
    ==> Very low overhead objects (no prototype or anything like that)
        All the vector functionality is solely in the vector class
        Use chaining to set values and store plain values on object
    
    */
    
    var vector = {
        create: function (obj) {
            this.value = initialize(obj);
            return this;
        },
        update: function (obj) {
            this.value = initialize(obj);
            return this;
        },
        value: {},
        
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
                this.value.magnitude = value; 
                setXandY(this.value);
        
                // Return parent for chaining 
                return this; 
            } else { 
                // Getter 
                return this.value.magnitude; 
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
                this.value.angle = value; 
                setXandY(this.value);
        
                // Return parent for chaining 
                return this; 
            } else { 
                // Getter 
                return this.value.angle; 
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
                this.value.x = value;
                setMagnitudeAndAngle(this.value); 
                
                return this; 
            } else { 
                return this.value.magnitude * Math.cos(utils.radians(this.value.angle)); 
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
                this.value.y = value;
                setMagnitudeAndAngle(this.value); 
                
                return this; 
            } else { 
                return this.value.magnitude * Math.sin(utils.radians(this.value.angle)); 
            }
        }
    };
    
    var initialize = function (obj) {
        if (obj.x !== undefined || obj.y !== undefined) {
            obj.x = obj.x || 0;
            obj.y = obj.y || 0;
            
            setMagnitudeAndAngle(obj);
        } else {
            obj.magnitude = obj.magnitude || 0;
            obj.angle = obj.angle || 0;    
            
            setXandY(obj);            
        }
        
        return obj;  
    };
    
    var setMagnitudeAndAngle = function (vector) { 
        vector.magnitude = utils.hypotenuse(vector.x, vector.y); 
        vector.angle = utils.degrees(Math.atan2(vector.y, vector.x)); 
    };
    
    var setXandY = function (vector) {
        vector.x = vector.magnitude * Math.cos(utils.radians(vector.angle));
        vector.y = vector.magnitude * Math.sin(utils.radians(vector.angle));
    };
    
    return vector;
    
})(freebody.utils);
