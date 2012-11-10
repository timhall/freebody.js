/// <reference path="_references.js" />

define(
['src/Vector'],
function (Vector) {
    var _spec = this;
    
    describe('Vector Class', function () {
        beforeEach(function () {
           _spec.vector = new Vector(); 
        });
        
        it('should calculate components from magnitude and angle', function () {
            vector.magnitude = 2;
            vector.angle = 30;
            
            expect(vector.x()).toEqual(Math.sqrt(3));
            expect(vector.y()).toEqual(1);
        });
        
    });
});