define(
['src/Vector', 'public/js/lodash.min'],
function (Vector, _) {
    var _spec = this;
    
    describe('Vector Class', function () {
        beforeEach(function () {
           _spec.vector = new Vector();
           _spec.shipForce = new Vector(); 
        });
        
        it('should calculate x-component from magnitude and angle', function () {
            _spec.vector.magnitude(2);
            _spec.vector.angle(30);
            
            expect(_spec.vector.x()).toBeCloseTo(Math.sqrt(3));
        });
        
        it('should calculate y-component from magnitude and angle', function () {
            _spec.vector.magnitude(2);
            _spec.vector.angle(30);
            
            expect(_spec.vector.y()).toBeCloseTo(1); 
        });
        
        it('should set magnitude and angle from x-component', function () {
            // Test with no magnitude / angle set
            // ...
            //xValue = roundToDec(Math.sqrt(3),3);
            //vector.y(1);
            _spec.vector.x(10)
            
            expect(_spec.vector.magnitude()).toEqual(10);
            expect(_spec.vector.angle()).toEqual(0);
            
            // Test with magnitude / angle set
            // ...
            
            _spec.vector.x(Math.sqrt(3));
            _spec.vector.y(1);
            
            expect(_spec.vector.magnitude()).toBeCloseTo(2, 0.00001);
            expect(_spec.vector.angle()).toBeCloseTo(30)
        });
        
        it('should set magnitude and angle from y-component', function () {
            _spec.vector.y(10)
            
            expect(_spec.vector.magnitude()).toEqual(10);
            expect(_spec.vector.angle()).toEqual(90);
            
            // Test with magnitude / angle set
            // ...
            
            _spec.vector.x(1);
            _spec.vector.y(Math.sqrt(3));
            
            expect(_spec.vector.magnitude()).toBeCloseTo(2, 0.00001);
            expect(_spec.vector.angle()).toBeCloseTo(60)
        });
        
        it('should set magnitude and angle to 0 with 0 x and y components', function () {
            expect(_spec.vector.magnitude()).toEqual(0);
            expect(_spec.vector.angle()).toEqual(0);
            
            _spec.vector.x(0);
            _spec.vector.y(0);
            
            expect(_spec.vector.magnitude()).toEqual(0);
            expect(_spec.vector.angle()).toEqual(0);
            expect(_spec.vector.x()).toEqual(0);
            expect(_spec.vector.y()).toEqual(0);
        });
        
        it('should correctly handle negative vectors', function () {
            _spec.vector.magnitude(10);
            _spec.vector.angle(180);
            expect(_spec.vector.x()).toEqual(-10);
            
            _spec.vector = new Vector();
            _spec.vector.x(-10);
            expect(_spec.vector.magnitude()).toEqual(10);
            expect(_spec.vector.angle()).toEqual(180);
        });
    });
});
