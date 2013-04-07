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
