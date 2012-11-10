/// <reference path="_references.js" />

define(
['src/Body', 'src/Vector'],
function (Body, Vector) {
    var _spec = this;

    describe('Body Class', function () {
        beforeEach(function () {
            _spec.atRest = new Body({ 
                mass: 10, 
                x: 0, y: 0,
                v: { magnitude: 0, angle: 0 }
            }); 
            _spec.inMotion = new Body({
                mass: 10,
                x: 0, y: 0,
                v: { magnitude: 1, angle: 0 }
            });   
        });

        describe("Newton's First Law (Inertia)", function () {
            it('An object at rest will remain at rest', function () {
                // Check on the body after 30 seconds
                _spec.atRest.advance(30000);

                // Should not have moved
                expect(_spec.atRest.x).toEqual(0);
                expect(_spec.atRest.y).toEqual(0);
            });

            it('unless acted on by an unbalanced force', function () {
                // Apply an a force for 1 second and then check on it
                _spec.atRest.forces.push({ magnitude: { value: 4, duration: 1000 }, angle: 45 });
                _spec.atRest.advance(1000);

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
            })
        });
    });
});