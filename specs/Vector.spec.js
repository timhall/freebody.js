/// <reference path="_references.js" />

define(
['src/Vector'],
function (Vector) {
    var _spec = this,
        roundToDec = function (number, dec) {
            return Math.round(number * 10^dec) / 10^dec;  
        };
    
    describe('Vector Class', function () {
        beforeEach(function () {
           _spec.vector = new Vector(); 
        });
        
        it('should calculate x-component from magnitude and angle', function () {
            //vector.magnitude = 2;
            //vector.angle = 30;
            shipForce[0].magnitude = 2;
            shipforce[0].angle = 30;
            shipforce[1].magnitude = 2;
            shipforce[1].angle = 60;
            
            expect(roundToDec(vector.x(), 3)).toEqual(roundToDec(Math.sqrt(3), 3) + 1);
        });
        
        it('should calculate y-component from magnitude and angle', function () {
            vector.magnitude = 2;
            vector.angle = 30;
            
            expect(roundToDec(vector.y(), 1)).toEqual(1); 
        });
        
    });
});