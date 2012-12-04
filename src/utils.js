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
    
    /**
     * Find the distance between two bodies
     * 
     * @param {Body} start
     * @param {Body} destination
     * @return {Number} distance
     */
    
    utils.distance = function (start, finish) {
        return utils.hypotenuse(start.x-finish.x,start.y-finish.y);
    };
    
    /**
     * Find the angle between two bodies
     * (wrt start body)
     * 
     * @param {Body} start
     * @param {Body} destination
     * @return {Number} angle (in degrees
     */
    
    utils.angle = function (start, finish) {
        if (start.y-finish.y === 0) {
            var angle = 90;
        } else {
            var angle = utils.degrees(Math.atan((start.y-finish.y)/(start.x-finish.x)));
        }
        
        // Let's do quadrants
        // A, x = 3, y = 3, theta = 45, atan(1) = 0.76, 45
        // B, x = -3, y = 3, theta = 135, atan(-1) = -0.76, -45 -> add 180, 135
        // C, x = -3, y = -3, theta = -135 / 225, atan(1) = 0.76, 45 -> add 180, 225
        // D, x = 3, y = -3, theta = -45 / 315, atan(-1) = -0.76, -45
        // -> whenever x is negative, add 180
        
        return (finish.x-start.x < 0) ? angle + 180 : angle;
    };
    
    return utils;
});