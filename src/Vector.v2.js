/**
 * Vector class for simply representing force, velocity, etc.
 */

define(
['src/utils'],
function (utils) {
    var Vector = function (magnitude, angle) {
        this._magnitude = (magnitude || 0);
        this._angle = (angle || 0);
        
        return this;
    };
    
    Vector.prototype = {
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
        x: function (value) {
            if (value !== undefined) { 
                setMagnitudeAndAngle(this, value, this.y()); 
                return this; 
            } else { 
                return this._magnitude * Math.cos(this._angle); 
            }
        },
        y: function (value) {
            if (value !== undefined) { 
                setMagnitudeAndAngle(this, this.x(), value); 
                return this; 
            } else { 
                return this._magnitude * Math.sin(this._angle); 
            }    
        }
    }
    
    var setMagnitudeAndAngle = function (vector, xValue, yValue) { 
        vector._magnitude = utils.hypotenuse(xValue, yValue); 
        vector._angle = Math.atan2(yValue, xValue); 
    }
    
    return Vector;
});
