/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */

// the system of cells
var system;
// a tick counter that is incremented per tick
var tick;


// called at the beginning
function setup() {
    // create a new canvas
    createCanvas(600, 900);
    // initialize the system with a new instance of a system
    system = new System();
    // set the tick to zero
    tick = 0;
}

// called every tick
function draw() {
    // set background color to black
    background(255);
    // call the system's update function
    system.update();
    // increment tick by one
    tick++;
    // if new day starts => log to console
    if(tick % TICKS_PER_DAY == 0) {
        console.log("new day: day " + tick % TICKS_PER_DAY);
    }
}


