//Create Planet with x-position, y-position, mass, and radius
//
//Gravitational Constant to put somewhere:
//const G = 6.67 * Math.pow(10,-11);
//
//vector.magnitude should be changed to vector.distance/radius
//
//Example equation for finding magnitude of force exerted by a planet's gravity
//vector.magnitude = (G * planet.mass)/vector.distance; 
//


var Planet = function(options){
    // Mass of the planet
    this.mass = (options && options.mass) || 0;
        
    // Position of the planet
    this.x = (options && options.x) || 0;
    this.y = (options && options.y) || 0;
    
    //Radius of the planet
    //This is for collision purposes
    this.radius = (options && options.y) || 0;
    
    
    
};