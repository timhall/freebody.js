define(
['./utils', './Vector', './Body', './gravity'],
function (utils, Vector, Body, gravity) {
    var freebody = {
        utils: utils,
        Vector: Vector,
        Body: Body,
        gravity: gravity
    };
    
    return freebody;
})