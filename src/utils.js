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
    
    return utils;
});