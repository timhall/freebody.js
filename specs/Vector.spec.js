/// <reference path="_references.js" />

define(
['src/Vector'],
function (Vector) {
    var _spec = this,
        roundToDec = function (number, dec) {
            return Math.round(number * Math.pow(10, dec)) / Math.pow(10, dec);  
        };
    
    describe('Vector Class', function () {
        beforeEach(function () {
           _spec.vector = new Vector();
           _spec.shipForce = new Vector(); 
        });
        
        it('should calculate x-component from magnitude and angle', function () {
            vector.magnitude = 2;
            vector.angle = 30;
            //shipForce[0].magnitude = 2;
            //shipforce[0].angle = 30;
            //shipforce[1].magnitude = 2;
            //shipforce[1].angle = 60;
            
            expect(vector.x()).toBeCloseTo(Math.sqrt(3));
        });
        
        it('should calculate y-component from magnitude and angle', function () {
            vector.magnitude = 2;
            vector.angle = 30;
            
            expect(vector.y()).toBeCloseTo(1); 
        });
        
        it('should set magnitude and angle from x-component', function () {
            // Test with no magnitude / angle set
            // ...
            //xValue = roundToDec(Math.sqrt(3),3);
            //vector.y(1);
            vector.x(10)
            
            expect(vector.magnitude).toEqual(10);
            expect(vector.angle).toEqual(0);
            
            // Test with magnitude / angle set
            // ...
            
            vector.x(Math.sqrt(3));
            vector.y(1);
            
            expect(vector.magnitude).toBeCloseTo(2, 0.00001);
            expect(vector.angle).toBeCloseTo(30)
        });
        
        it('should set magnitude and angle from y-component', function () {
            vector.y(10)
            
            expect(vector.magnitude).toEqual(10);
            expect(vector.angle).toEqual(90);
            
            // Test with magnitude / angle set
            // ...
            
            vector.x(1);
            vector.y(Math.sqrt(3));
            
            expect(vector.magnitude).toBeCloseTo(2, 0.00001);
            expect(vector.angle).toBeCloseTo(60)
        });
        
    });
});