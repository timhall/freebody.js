FreeBody.js
===

Free-body mechanics / physics engine in javascript.

This little library was designed to give some basic structure to the velocities and forces acting on bodies and the resulting behavior over time. Here are some examples of what it will become:

```javascript
var ball = new Body();

// Set initial position
ball.x = 10; 
ball.y = 10;

// Set initial velocity
ball.v = new Vector({ magnitude: 60, angle: 45 });

// Add gravity
ball.a.push(new Vector({ magnitude: 9.8, angle: 90 }));

// Check on ball after 3 seconds
// (Advance it 3000 ms into the future)
ball.advance(3000);

// Get current velocity in y-direction
var speed = ball.v.y();

// Strap a rocket to the ball for 8 seconds
ball.forces.push(new Vector({ magnitude: { value: 100, duration: 8000 }, angle: 270 }));

// and check on the height after 12 seconds
ball.advance(12000);
var height = ball.y;

// Finally, set values quickly inline
ball = new Body({ x: 10, y: 10, v: { magnitude: 60, angle: 45 } });
```

```javascript
var force = new Vector();

// Set magnitude and angle of force
force.magnitude = 12;
force.angle = 45;

// Get x- and y-components
var forceX = force.x(),
    forceY = force.y();

// Can also create force from components
force = new Vector();
force.x(3);
force.y(4);

var forceNet = force.magnitude; // = 5

// Finally, set values quickly inline
force = new Vector({ magnitude: 12, angle: 45 });
force = new Vector({ x: 3, y: 4 });
```