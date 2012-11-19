/// <reference path="_references.js" />

define(
['src/Vector', 'public/js/lodash.min'],
function (Vector, _) {
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
            _spec.vector.magnitude = 2;
            _spec.vector.angle = 30;
            
            expect(_spec.vector.x()).toBeCloseTo(Math.sqrt(3));
        });
        
        it('should calculate y-component from magnitude and angle', function () {
            _spec.vector.magnitude = 2;
            _spec.vector.angle = 30;
            
            expect(_spec.vector.y()).toBeCloseTo(1); 
        });
        
        it('should set magnitude and angle from x-component', function () {
            // Test with no magnitude / angle set
            // ...
            //xValue = roundToDec(Math.sqrt(3),3);
            //vector.y(1);
            _spec.vector.x(10)
            
            expect(_spec.vector.magnitude).toEqual(10);
            expect(_spec.vector.angle).toEqual(0);
            
            // Test with magnitude / angle set
            // ...
            
            _spec.vector.x(Math.sqrt(3));
            _spec.vector.y(1);
            
            expect(_spec.vector.magnitude).toBeCloseTo(2, 0.00001);
            expect(_spec.vector.angle).toBeCloseTo(30)
        });
        
        it('should set magnitude and angle from y-component', function () {
            _spec.vector.y(10)
            
            expect(_spec.vector.magnitude).toEqual(10);
            expect(_spec.vector.angle).toEqual(90);
            
            // Test with magnitude / angle set
            // ...
            
            _spec.vector.x(1);
            _spec.vector.y(Math.sqrt(3));
            
            expect(_spec.vector.magnitude).toBeCloseTo(2, 0.00001);
            expect(_spec.vector.angle).toBeCloseTo(60)
        });
        
        it('should set magnitude and angle to 0 with 0 x and y components', function () {
            expect(_spec.vector.magnitude).toEqual(0);
            expect(_spec.vector.angle).toEqual(0);
            
            _spec.vector.x(0);
            _spec.vector.y(0);
            
            expect(_spec.vector.magnitude).toEqual(0);
            expect(_spec.vector.angle).toEqual(0);
            expect(_spec.vector.x()).toEqual(0);
            expect(_spec.vector.y()).toEqual(0);
        });
        
        it('should correctly handle negative vectors', function () {
            _spec.vector.magnitude = 10;
            _spec.vector.angle = 180;
            expect(_spec.vector.x()).toEqual(-10);
            
            _spec.vector = new Vector();
            _spec.vector.x(-10);
            expect(_spec.vector.magnitude).toEqual(10);
            expect(_spec.vector.angle).toEqual(180);
        });
        
        describe('Time-based vectors', function () {
            beforeEach(function () {
                _spec.vector = Vector.createWithDuration({ magnitude: 10, angle: 90 }, 2000);
            });
            
            it('should create duration vector as function', function () {
                expect(_.isFunction(_spec.vector)).toEqual(true);
            });
            
            it('should return value with no elapsed and not change lifetime', function () {
                expect(_spec.vector().y()).toEqual(10);
                expect(_spec.vector.lifetime).toEqual(0);
            });
            
            it('should add elapsed to lifetime', function () {
                expect(_spec.vector(1000).y()).toEqual(10);
                expect(_spec.vector.lifetime).toEqual(1000);
                expect(_spec.vector(999).y()).toEqual(10);
                expect(_spec.vector.lifetime).toEqual(1999);
            });
            
            it('should return null after expiration', function () {
                expect(_spec.vector(1999)).not.toEqual(null);
                expect(_spec.vector(1)).toEqual(null);
                expect(_spec.vector()).toEqual(null);
            });
            
            it('should be able to add time to duration', function () {
                expect(_spec.vector(1999)).not.toEqual(null);
                expect(_spec.vector(1)).toEqual(null);
                expect(_spec.vector()).toEqual(null);
                
                _spec.vector.duration += 1000;
                expect(_spec.vector(999)).not.toEqual(null);
                expect(_spec.vector(1)).toEqual(null);
                
                _spec.vector(1000);
                _spec.vector.duration += 500;
                expect(_spec.vector()).toEqual(null);
            });
        });
    });
});