/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */

/**
 * This is an implementation of a cell
 */
class Cell {

    /**
     * Constructor
     */
    constructor() {
        // the cell is not infected
        this.infected = false;
        // the time the cell is infected 
        this.infectionTimer = TICKS_PER_DAY * (4 + floor(random(8)));
        // if the cell has died
        this.died = false;
        // if the cell has recovered
        this.hasHadIt = false;
        // the position of the cell in the simulation area (vector)
        // max/min values -> borders of the simulation area
        this.position = new Vector(random(width), random(height - 300), width - DIAMETER/2, 0 + DIAMETER/2, height - 300 - DIAMETER/2, 0 + DIAMETER/2)
        // the velocity of the cell (maxXY: 1, minXY: -1) - vector
        this.veclocity = new Vector(0, 0, 1, -1, 1, -1);
        // the acceleration of the cell (maxXY: 0.1, minXY: -0.1)
        this.acceleration = new Vector(random(0.001), random(-0.001), 0.1, -0.1, 0.1, -0.1);
        // the age of the cell -> the greater, the more likely that it dies when it is infected
        this.age = floor(random(85));
    }

    /**
     * Called by the sketch every tick
     */
    show() {
        // display the cell
        // color: 
        //   - yellow:   recovered
        //   - black:    died
        //   - green:    healthy
        //   - red:      infected
        // position:
        //  - its position vector
        // size:
        //  - diameter (set in params.js)
        noStroke();
        fill(this.hasHadIt ? "yellow" : (this.died ? "black" : (this.infected ? "red" : "green")))
        ellipse(this.position.x, this.position.y, DIAMETER, DIAMETER);
    }

    /**
     * Called by the sketch every tick
     * @param {object} cells - The system's cell array
     * @param {number} my_index - Int. The index of the cell in the system's cell array
     */
    update(cells, my_index) {
        // if the cell has not died
        if(!this.died) {
            // add the velocity vector to the position vector
            // add the acceleration vector to the velocity vector
            // change the acceleration vector by a random vector
            this.position.add(this.veclocity);
            this.veclocity.add(this.acceleration);
            this.acceleration.add(new Vector(random(-0.001, 0.001), random(-0.001, 0.001), 1, -1, 1, -1));
            // if it hits a wall -> velocity is multiplied by -1 -> cell goes in the other direction
            if(this.position.x < (DIAMETER/2 + 2))
                this.veclocity.multiply(-1);
            if(this.position.x > (width - DIAMETER/2 -2))
                this.veclocity.multiply(-1);
            if(this.position.y < (DIAMETER/2 + 2))
                this.veclocity.multiply(-1);
            if(this.position.y > (height - 300 - DIAMETER/2 - 2))
                this.veclocity.multiply(-1);
        }

        // if the cell is infected, it should check the distance to all other cells
        // if dist < DIAMETER/2 => other cell is infected

        // if the cell is infected and has not died
        if(this.infected && !this.died) {
            // loop through the system's cell array
            for(let i = 0; i < cells.length; i++) {
                // if the current cell does not refer to 'this'
                if(i != my_index) {
                    // if the current cell is not infected and has not died and the distance between my cell and the current cell is smaller than diameter / 2
                    if(!cells[i].infected && !cells[i].died && dist(this.position.x, this.position.y, cells[i].position.x, cells[i].position.y) < DIAMETER/2) {
                        // if the cell has already recovered look at the propability of getting it again
                        if(!cells[i].hasHadIt || (cells[i].hasHadIt && random(1) < PROP_OF_GETTING_AGAIN)) {
                            // look at the infection propability
                            if(random(1) < INFECTION_PROPABILITY) {
                                // infect the current cell 
                                cells[i].infected = true;
                                cells[i].hasHadIt = false;
                            }
                        }
                    }
                }
            }
            // decrease infectionTimer
            this.infectionTimer--;
            // check if you recovered
            if(this.infectionTimer == 0) {
                // if the cell has recovered, set infected to false
                this.infected = false;
                // set the infectionTimer to a default (a bit random) value
                this.infectionTimer = TICKS_PER_DAY * (8 + floor(random(8)));
                console.log("one cell recovered!");
                this.hasHadIt = true;
            }
            // check if cell should die
            // propab. to die increases with high age
            if(random(1) < PROP_TO_DIE * this.age/10) {
                this.died = true;
                this.infected = false;
                console.log("cell died!");
            }
        }

    }

}