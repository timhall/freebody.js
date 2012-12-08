/// <reference path="_references.js" />

define(
['src/vector.v2', 'public/js/lodash.min'],
function (vector, _) {
    var _spec = this,
        expectVectorIsDefined = function (value) {
            expect(value.magnitude).toBeDefined();
            expect(value.angle).toBeDefined();
            expect(value.x).toBeDefined();
            expect(value.y).toBeDefined();         
        },
        expectVectorHasValues = function (value, magnitude, angle, x, y) {
            expect(value.magnitude).toEqual(magnitude || 0);
            expect(value.angle).toEqual(angle || 0);
            expect(value.x).toEqual(x || 0);
            expect(value.y).toEqual(y || 0);   
        }
    
    describe('Vector Class (V2)', function () {
        describe('Initialization', function() {
            it('should add required properties to empty object', function () {
                var test = {};
                
                vector(test);
                expectVectorIsDefined(test);
                expectVectorHasValues(test);
            });
            
            it('should use defined values', function () {
                var test = { magnitude: 10, angle: 45 };
                
                vector(test);
                expectVectorIsDefined(test);
                expect(test.magnitude).toEqual(10);
                expect(test.angle).toEqual(45);
            });
            
            it('should overwrite invalid x/y values', function () {
                var test = { magnitude: 10, angle: 45, x: 3, y: 4 };
                
                vector(test);
                expectVectorIsDefined(test);
                expect(test.x).not.toEqual(3);
                expect(test.y).not.toEqual(4);
            });
            
            it('should set based on just x/y values', function () {
                var test = { x: 3, y: 4 };
                
                vector(test);
                expectVectorIsDefined(test);
                expect(test.magnitude).toEqual(5);
                expect(test.angle).toBeCloseTo(Math.tan(3/4) * 180 / Math.PI, 0);
            });
        });
        
        describe('Chaining', function () {
            it('should return value', function () {
                var test = { x: 3, y: 4 };
                
                expect(vector(test).value.magnitude).toEqual(5);
            });
            
            it('should get/set magnitude', function () {
                var test = { x: 3, y: 3 };
                
                // Getter
                expect(vector(test).magnitude()).toBeCloseTo(3 * Math.sqrt(2), 0);
                
                // Setter
                vector(test).magnitude(Math.sqrt(2))
                expect(test.x).toBeCloseTo(1);
            });
            
            it('should get/set angle', function () {
                var test = { x: 1, y: 1 };
                
                // Getter
                expect(vector(test).angle()).toBeCloseTo(45);
                
                // Setter
                vector(test).angle(0)
                expect(test.x).toBeCloseTo(Math.sqrt(2));
            });
            
            it('should get/set x', function () {
                var test = { magnitude: 4 * Math.sqrt(2), angle: 45 };
                
                // Getter
                expect(vector(test).x()).toBeCloseTo(4);
                
                // Setter
                vector(test).x(3)
                expect(test.magnitude).toBeCloseTo(5);
            });
            
            it('should get/set y', function () {
                var test = { magnitude: 3 * Math.sqrt(2), angle: 45 };
                
                // Getter
                expect(vector(test).y()).toBeCloseTo(3);
                
                // Setter
                vector(test).y(4)
                expect(test.magnitude).toBeCloseTo(5);
            });
            
            it('should chain operations', function () {
                var test = {};
                expect(vector(test).x(3).y(4).magnitude()).toEqual(5);
            });
        })
    });
});