/// <reference path="_references.js" />

// define = create a new module
define(
    
// Write out any dependencies that are needed
['src/Body', 'src/Vector'],

// and pass them into the module
function (Body, Vector) {
    
    // This is just a convenient way to save 'this' since 
    // 'this' is all sorts of headaches in js
    var _spec = this;

    
    // I like to set up a main group for each spec module
    describe('Body Class', function () {
        
        // This is stuff that is run before every spec below
        // I like to put stuff here so that it gets reset every time
        // and you don't get any conflicts between specs
        beforeEach(function () {
            
            // (we'll talk about this in a sec)
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

        
        // So within the main module this is a group of specs 
        // (Newton's 1st, cute right!)
        describe("Newton's First Law (Inertia)", function () {
            
            // This is just some sentence to describe the spec
            // Traditional style is that it should begin with 'should'
            // ala It 'should do something cool'
            it('An object at rest will remain at rest', function () {
                
                // This is the actual code for the spec
                
                // First, do some stuff...

                // Then, each spec should have some idea of 'pass/fail'

                expect(2 + 2).toEqual(4);
                expect(2 + 2).not.toEqual(5);
                
                // Check on the body after 30 seconds
                _spec.atRest.advance(30000);
                
                // Should not have moved
                // with zero velocity and initial position            
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