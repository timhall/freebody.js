define(
[],
function () {
    var
        /**
        * Body with mass, position, and velocity to apply forces to
        *
        * @class Body
        * @param {Object} [options]
        *     Any options to set inline (mass, position, etc)
        * @return {Object} Body
        */
        Body = function (options) {
            this.mass = options.mass || 0;
            this.position = options.position || { x: 0, y: 0 };
            this.velocity = options.velocity;
        };

    return Body;
})