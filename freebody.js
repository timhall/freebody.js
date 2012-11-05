(function () {
    var freebody = {};

    /**
    * Base object for representing vectors
    *
    * @class Vector
    * @param {Object} [options]
    *     Any options to set inline (magnitude or angle)
    * @return {Object} Vector
    */
    freebody.Vector = function (options) {
        this.magnitude = options.magnitude || 0;
        this.angle = options.angle || 0;
    };
    freebody.Vector.prototype.xComponent = function () {
        // Things to do:
        // 1. Figure out how angles are set
        //     (i.e. where's zero + what direction does it rotate
        // 2. Figure out the x component in the following coordinate system
        //     x right +, y down +, top-left is 0,0
    };
    freebody.Vector.prototype.yComponent = function () {
        // Simlar to above
    };

    /**
    * Body with mass, position, and velocity to apply forces to
    *
    * @class Body
    * @param {Object} [options]
    *     Any options to set inline (mass, position, etc)
    * @return {Object} Body
    */
    freebody.Body = function (options) {
        this.mass = options.mass || 0;
        this.position = options.position || { x: 0, y: 0 };
        this.velocity = options.velocity;

        return this;
    };



    return freebody;
})();