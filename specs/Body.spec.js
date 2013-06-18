describe('Body Class', function () {
    var _spec = this;

    beforeEach(function () {
        _spec.atRest = new freebody.Body({ 
            mass: 10, 
            x: 0, y: 0,
            v: new freebody.Vector().magnitude(0).angle(0)
        }); 
        _spec.inMotion = new freebody.Body({
            mass: 10,
            x: 0, y: 0,
            v: new freebody.Vector().magnitude(1).angle(0)
        });   
    });

    describe('Advance', function () {
        it('should increment lifetime', function () {
            var body = new freebody.Body();
                
            expect(body.lifetime).toEqual(0);
            body.advance(1000);
            expect(body.lifetime).toEqual(1000);
        });
            
        it('should handle 0 mass w/o NaN', function () {
            var body = new freebody.Body();
            expect(body.v.magnitude()).toEqual(0);
            body.advance(1000);
            expect(body.v.magnitude()).toEqual(0);
        });
    });
        
    describe("Newton's First Law (Inertia)", function () {
        it('An object at rest will remain at rest', function () {                
            // Check on the body after 30 seconds
            _spec.atRest.advance(30000);
                
            // Should not have moved
            // with zero velocity and initial position            
            expect(_spec.atRest.x).toEqual(0);
            expect(_spec.atRest.y).toEqual(0);
        });

        it('unless acted on by an unbalanced force', function () {
            // Apply an a force for 1 second and then check on it
            _spec.atRest.forces.push(new freebody.Vector(4, 45));
            _spec.atRest.advance(1000, 10);
                
            // Should have moved
            expect(_spec.atRest.x).not.toEqual(0);
            expect(_spec.atRest.y).not.toEqual(0);
        });

        it('An object in motion continues in motion with the same speed and in the same direction', function () {
            // First, make sure it starts at zero
            expect(_spec.inMotion.x).toEqual(0);
            expect(_spec.inMotion.y).toEqual(0);
                
            // Check on the body after 30 seconds
            _spec.inMotion.advance(30000);

            // Should have stayed in motion
            expect(_spec.inMotion.x).toEqual(30);
            expect(_spec.inMotion.y).toEqual(0);
        });
    });
    
    describe('Looking into the future', function () {
        beforeEach(function () {
            // Apply a force
            _spec.atRest.v = new freebody.Vector(1, 0);    
        });
        
        it('should not advance object during prediction', function () {
            // Look 1 second into the future
            var path = _spec.atRest.path(1000);
            
            expect(_spec.atRest.lifetime).toEqual(0);
            expect(path.length).toBeGreaterThan(0);
        });
        
        it('should store intermediate points', function () {
            // Look 3 seconds into the future and increment by 1s
            var path = _spec.atRest.path(3000, 1000);
            
            expect(path.length).toEqual(3);
            expect(path[0].x).toEqual(1);
            expect(path[1].x).toEqual(2);
            expect(path[2].x).toEqual(3);
        });
        
        it('should work with gravity', function () {
            // Apply simple gravity to body
            freebody.gravity.simple(_spec.atRest);
            
            // Look out 3 seconds with 1s intervals
            var path = _spec.atRest.path(3000, 1000);
            
            expect(path.length).toEqual(3);
            expect(path[0].y).toEqual(0);
            expect(path[1].y).toBeCloseTo(-9.8, 0.01);
            expect(path[2].y).toBeCloseTo(-29.4, 0.01);
        });
        
        it('should not affect velocity or acceleration of original body', function () {
            // Apply simple gravity to body
            freebody.gravity.simple(_spec.atRest);
            
            expect(_spec.atRest.v.y()).toEqual(0);
            
            // Look out 3 seconds with 1s intervals
            var path = _spec.atRest.path(3000, 1000);
            
            expect(_spec.atRest.v.y()).toEqual(0);
        });
    });
});
