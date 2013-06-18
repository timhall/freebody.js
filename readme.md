FreeBody.js
===

Free-body mechanics / physics engine in javascript.

This little library was designed to give some basic structure to the velocities and forces acting on bodies and the resulting behavior over time. Here are some examples of what it will become:

```javascript
// Create a new physics body
var ball = new freebody.Body();
ball.x = 10;
ball.y = 0;
ball.mass = 5;

// Set an initial velocity
ball.v = new freebody.Vector().magnitude(10).angle(0);

// See how far the ball has travelled in 4 seconds
ball.advance(4000);
console.log('Distance:', ball.x); // -> Distance: 50

// Add gravity to the ball
freebody.gravity.simple(ball);

// See how fast it's going after 3 seconds
ball.advance(2000);
console.log('Speed:', ball.v.y()); // -> Speed: -19.6
console.log('Acceleration:', ball.a.y()); // -> Acceleration: -9.8

// Strap a rocket to the ball
ball.forces.push(new freebody.Vector().magnitude(100).angle(45));

// See how high it is after 12 seconds
ball.advance(12000);
console.log('Height:', ball.y); // -> Height: 57.7
```

Vectors
---
```javascript
var force = new freebody.Vector();

// Set magnitude and angle of force
force.magnitude(12);
force.angle(30);

// Get x- and y-components
console.log('force, x:', force.x()); // -> force, x: 10.39
console.log('force, y:', force.y()); // -> force, y: 6.0

// Can also create force from components
force = new freebody.Vector();
force.x(3);
force.y(4);

// Get net force
console.log('force, net:', force.magnitude()); // -> force, net: 5

// Finally, set values quickly inline
force = new freebody.Vector().magnitude(12).angle(45);
force = new freebody.Vector().x(3).y(4);
```
