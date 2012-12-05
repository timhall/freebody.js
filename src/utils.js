/**
 * General-purpose utilities
 */

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
    
    // Lodash methods
    // [Lo-Dash](http://lodash.com/)
    
    /**
     * Checks if `value` is a number
     *
     * @param {Mixed} value The value to check
     * @returns {Boolean} Returns `true` if the `value` is a number, else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */
    utils.isNumber = function (value) {
        return typeof value == 'number' || toString.call(value) == '[object Number]';
    }
    
    /**
     * Checks if `value` is a function.
     *
     * @param {Mixed} value The value to check
     * @returns {Boolean} Returns `true` if the `value` is a function, else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */
     
    utils.isFunction = function (value) {
        return typeof value == 'function';
    };
    // fallback for older versions of Chrome and Safari
    if (utils.isFunction(/x/)) {
        utils.isFunction = function(value) {
          return toString.call(value) == '[object Function]';
        };
    }
    
    /**
     * Checks if the `callback` returns a truthy value for **any** element of a
     * `collection`. The function returns as soon as it finds passing value, and
     * does not iterate over the entire `collection`. The `callback` is 
     * invoked with three arguments; (value, index|key, collection).
     *
     * @param {Array} collection The collection to iterate over.
     * @param {Function} callback The function called per iteration.
     * @returns {Boolean} Returns `true` if any element passes the callback check,
     *  else `false`
     * @source [Lo-Dash](http://lodash.com/)
     */
     
    utils.any = function (collection, callback) {
        var result;
    
        var index = -1,
            length = collection.length;
    
        while (++index < length) {
            if ((result = callback(collection[index], index, collection))) {
                break;
            }
        }
        return !!result;
    }
    
    return utils;
});