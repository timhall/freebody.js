define(
['src/utils', 'src/Vector', 'src/Body', 'src/gravity'],
function (utils, Vector, Body, gravity) {
    var freebody = {
        utils: utils,
        Vector: Vector,
        Body: Body,
        gravity: gravity
    };
    
    return freebody;
})