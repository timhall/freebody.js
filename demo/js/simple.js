// Save a ref to when the script was started and a convenient now fn
var startTime = +new Date;
var now = function () {
    var timestamp = +new Date;
    return (timestamp < 1e12) ? timestamp : timestamp - startTime;  
};

// This is a generic Ball
// The key for the game engine are two functions:
// update and draw
// update: update the position and physics
// draw: render the ball to the screen
//
// It's pretty key to separate these
// we don't want physics calcs causing lag in updating the screen
// and don't want framerate... k god
//
// They are kept separate so that physics update continue even if framerate drops
// Keeping the position updates fluid and everything up to date once it's ready
// to be drawn
var Ball = function (options) {
    var ball = this,
        created,
        display;
    
    // This is really just a helper for the x and y calcs
    // It doesn't really mean anything special
    var time = function () {
        // created is 123456789 or some sort of timestamp
        // now() is 12345.789 which is ms since loading
        // created + now is roughly equal to 
        // honestly I don't know what the 0.002 is for, it really just scales
        // it so that the sin and cos are reasonable
        return (created + now()) * 0.002   
    };
    
    ball.options = options || {};
    ball.x = 0;
    ball.y = 0;
    
    // Update the ball position (and physics in the future)
    ball.update = function (step) {
        // This is just some fancy way to update the position in a cool
        // circular-ish fashion
        // (these will be set in the physics part)
        ball.x = Math.round(Math.sin(time()) * 96 + 128);
        ball.y = Math.round(Math.cos(time() * 0.9) * 96 + 128);
    };
    
    // Actually draw the ball on screen
    ball.draw = function () {
        // If the ball hasn't been created, create it
        if (!created) { ball.create(); }
        // This updates the position
        // (other things that can be updated: http://docs.bonsaijs.org/DisplayObject.html)
        display.attr({ x: ball.x, y: ball.y });
    };
    
    // Create the ball (on screen)
    ball.create = function () {
        // The 'display' is the rendered part of the 'Ball' object
        // (this part is Bonsai, all 'display' things)
        display = new Circle(
            // Initial x
            Math.round(Math.sin(time()) * 96 + 128), 
            // Initial y
            Math.round(Math.cos(time() * 0.9) * 96 + 128), 
            // radius
            25);
        display.fill(ball.options.color || 'blue');
        // Finally, add the ball to the stage
        display.addTo(stage);
        
        created = +new Date;
        return ball;
    };
};

// This is the "game" engine
// It's pretty much only in charge of managing the two loops
// and then calling any update / draw functions on objects
var Engine = function () {
    var engine = this,
        rAF = window.parent.requestAnimationFrame,
        frameRate = 60,
        objects = [],
    
    // Kept this separate in case there is any other initializing code
    start = function () {
        run();
    },
    
    // When starting the game engine, update and render
    run = function () {
        update();
        render();    
    },
    
    // Update the physics / position of objects
    update = function () {
        // Use a set timeout here so that it is always 60 fps
        // This might be something that is variable later depending on what the device can handle
        // This is a recursive loop
        // (call the update function 1000/60 ms from now)
        setTimeout(update, 1000/frameRate);
        
        // Loop through all the objects and call update()
        for (var i = 0, max = objects.length; i < max; i += 1) {
            objects[i].update();   
        }
    },
    
    // Render all of the objects
    render = function (timestamp) {
        // Use a requestAnimationFrame to use the same render pipeline as the browser
        // so that the optimal framerate is used
        // (This is a special "timeout" meaning roughly request an animation frame
        //  frome the browser and when the browser gives us one call the render function
        // (also recursive)
        rAF(render);
        
        // Loop through all the objects and draw()
        for (var i = 0, max = objects.length; i < max; i += 1) {
            objects[i].draw(timestamp);   
        }
    };
    
    return {
        start: start,
        objects: objects
    };
}; 

// Create a new engine
var engine = new Engine(),
    maxBalls = 50,
    numBalls = 0,

    // Random colors for balls
    colors = ['blue', 'red', 'yellow', 'green', 'orange'],
    randomColor = function () {
        return colors[Math.round(Math.random() * colors.length)];
    },
    
    // Add ball to engine (which then updates and renders is)
    addBall = function () {
        // push a new ball with a random color
        engine.objects.push(new Ball({ color: randomColor() }));
        
        // This pushes an object into the engine and in the next update and render
        // loop it will update and draw this new object
        
        // 1 second from now, add another one (recursive, goes on forever)
        if (numBalls++ <= maxBalls) {
            setTimeout(addBall, 1000)
        }
    };

// Finally add first ball and start the ball adding loop
addBall();

// Start the update and render loops
engine.start();

// Tada!