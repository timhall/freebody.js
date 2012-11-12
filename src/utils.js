define(
[],
function () {
    
    /**
     * Determine the radians of a given angle
     * 
     * @param {Number} angle in degrees
     * @return {Number} angle in radians
     */
     
    var radians = function (angle) {
        return angle * (Math.PI / 180); 
    };
    
    return {
        radians: radians
    };
});