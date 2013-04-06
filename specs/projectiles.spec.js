describe('Projectile Motion', function () {
    var _spec = this;
    var error = 0.2;
    
    describe('Projectile Motion #1', function () {
        // A 50 kg projectile is launched at an angle of 58.770 degree 
        // from the horizontal at a velocity of 39.47 m/s.
        
        beforeEach(function() {
            _spec.projectile = new freebody.Body({ 
                mass: 50, 
                v: new freebody.Vector().magnitude(39.47).angle(58.770)
            });
            
            // This applies simple freebody.gravity to the body
            freebody.gravity.simple(_spec.projectile);            
        });
        
        it('a) Maximum range of the projectile', function () {
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            expect(_spec.projectile.v.x()).toBeCloseTo(20.46);
            expect(_spec.projectile.x).toBeCloseTo(140.998);
        });
        
        it('b) Maximum height of the projectile', function () {
            _spec.projectile.advance(3.44*1000);
            // TODO: investigate reasons this might be too high
            expect(_spec.projectile.y).toBeCloseTo(58.117, error);
        });
        
        it('c) Time of flight for the projectile', function () {
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            expect(_spec.projectile.lifetime).toBeCloseTo(6890);
        });
        
        it('d) Maximum range if the projectile mass was changed to 40.00kg', function () {
            _spec.projectile.m = 40;
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            expect(_spec.projectile.x).toBeCloseTo(140.998);
        });
        
        it('e) Angle of impact', function () {
            _spec.projectile.advance(6.89*1000);
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            expect(_spec.projectile.v.angle()).toBeCloseTo(-58.7858);
        });
        
    });
});
