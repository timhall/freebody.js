define(
[],
function () {
    // This is the "game" engine
    // It's pretty much only in charge of managing the two loops
    // and then calling any update / draw functions on objects
    var Engine = function () {
        var engine = this,
            rAF = window.requestAnimationFrame,
            frameRate = 60,
            objects = [], prevTime = +new Date,
        
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
            
            var currTime = +new Date;
            var timestep = currTime - prevTime;
            prevTime = currTime;
            
            // Loop through all the objects and call update()
            // (bc length may change, can't cache it)
            for (var i = 0; i < objects.length; i += 1) {
                // If objects[i] = null, remove it from objects
                if (objects[i] === null) {
                    objects.splice(i, 1); // Remove 1 item at i index
                    
                    // splice( at index, number of things to remove, things to add)
                    // splice(2, 1, 'a', 'b')
                    // just removes stuff if you don't give anything to add
                } else {
                    objects[i].update(timestep);   
                }
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
            for (var i = 0; i < objects.length; i += 1) {
                // If objects[i] = null, remove it from objects
                if (objects[i] === null) {
                    objects.splice(i, 1);
                } else {
                    objects[i].draw();  
                }
            }
        };
        
        return {
            start: start,
            objects: objects
        };
    };
    
    return Engine;
});