define(
['src/vector.exp', 'public/js/lodash.min'],
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
    
    describe('Vector Class (Experiment)', function () {
        describe('Initialization', function() {
            it('should add required properties to empty object', function () {
                var test = {};
                
                vector.create(test);
                expectVectorIsDefined(test);
                expectVectorHasValues(test);
            });
            
            it('should use defined values', function () {
                var test = { magnitude: 10, angle: 45 };
                
                vector.create(test);
                expectVectorIsDefined(test);
                expect(test.magnitude).toEqual(10);
                expect(test.angle).toEqual(45);
            });
            
            it('should set based on just x/y values', function () {
                var test = { x: 3, y: 4 };
                
                vector.create(test);
                expectVectorIsDefined(test);
                expect(test.magnitude).toEqual(5);
                expect(test.angle).toBeCloseTo(Math.tan(3/4) * 180 / Math.PI, 0);
            });
        });
        
        describe('Chaining', function () {
            it('should return value', function () {
                var test = { x: 3, y: 4 };
                
                expect(vector.create(test).value.magnitude).toEqual(5);
            });
            
            it('should get/set magnitude', function () {
                var test = { x: 3, y: 3 };
                
                // Getter
                expect(vector.create(test).magnitude()).toBeCloseTo(3 * Math.sqrt(2), 0);
                
                // Setter
                vector.update(test).magnitude(Math.sqrt(2))
                expect(test.x).toBeCloseTo(1);
            });
            
            it('should get/set angle', function () {
                var test = { x: 1, y: 1 };
                
                // Getter
                expect(vector.create(test).angle()).toBeCloseTo(45);
                
                // Setter
                vector.update(test).angle(0)
                expect(test.x).toBeCloseTo(Math.sqrt(2));
            });
            
            it('should get/set x', function () {
                var test = { magnitude: 4 * Math.sqrt(2), angle: 45 };
                
                // Getter
                expect(vector.create(test).x()).toBeCloseTo(4);
                expect(test.y).toBeCloseTo(4);
                
                // Setter
                vector.update(test).x(3)
                expect(test.magnitude).toBeCloseTo(5);
            });
            
            it('should get/set y', function () {
                var test = { magnitude: 3 * Math.sqrt(2), angle: 45 };
                
                // Getter
                expect(vector.create(test).y()).toBeCloseTo(3);
                
                // Setter
                vector.update(test).y(4)
                expect(test.magnitude).toBeCloseTo(5);
            });
            
            it('should chain operations', function () {
                var test = {};
                expect(vector.create(test).x(3).y(4).magnitude()).toEqual(5);
            });
        })
    });
});