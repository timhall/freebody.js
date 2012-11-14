define(
['src/Body', 'src/Vector', 'src/gravity', 'src/utils'],
function (Body, Vector, gravity, utils) {
    var _spec = this;
    
    describe('Projectile Motion #1', function () {
        // A 50 kg projectile is launched at an angle of 58.770 degree 
        // from the horizontal at a velocity of 39.47 m/s.
        
        beforeEach(function() {
            _spec.projectile = new Body({ 
                mass: 50, v: { magnitude: 39.47, angle: 58.770 }
            });
            
            // This applies simple gravity to the body
            gravity.simple(_spec.projectile);
        });
        
        it('a) Maximum range of the projectile', function () {
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            console.log('Maximum range: ', _spec.projectile.x);
        });
        
        it('b) Maximum height of the projectile', function () {
            _spec.projectile.advance(3.44*1000);
            console.log('Maximum height: ', _spec.projectile.y); 
        });
        
        it('c) Time of flight for the projectile', function () {
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            console.log('Time of flight: ', _spec.projectile.lifetime); 
        });
        
        it('d) Maximum range if the projectile mass was changed to 40.00kg', function () {
            _spec.projectile.m = 40;
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            _spec.projectile.advance(6.89*1000);
            console.log('Maximum range: ', _spec.projectile.x);
        });
        
        it('e) Angle of impact', function () {
            _spec.projectile.advance(6.89*1000);
            //_spec.projectile.advance({ x: 0, y: { gt: 0 } });
            console.log('Angle of impact: ', _spec.projectile.v.angle);
            
            console.log(_spec.projectile);
            window.body = _spec.projectile;
            window.utils = utils;
        });
        
    });
});