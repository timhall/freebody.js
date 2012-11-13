define(
[],
function () {
    var utils = {};
    
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
    
    return utils;
});