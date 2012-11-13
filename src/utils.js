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
    
    var degrees = function (angle) {
        return angle * (180 / Math.PI);  
    };
    
    return {
        radians: radians,
        degrees: degrees
    };
});