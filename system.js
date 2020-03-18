/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */

/**
 * This class is used to store cells. It has a SystemObserver
 */
class System {

    /**
     * Constructor
     */
    constructor() {
        // initialize cells with an empty array
        this.cells = [];
        // go through all cells and push a new cell
        for(let i = 0; i < TOTAL_CELLS; i++) {
            this.cells.push(new Cell());
        }
        // initialize the systemObserver with a new SystemObserver
        this.systemObserver = new SystemObserver(this);
        // starts with day one
        this.day = 1; 

        // (1) infect one random cell
        this.cells[floor(random(this.cells.length))].infected = true;

    }

    /**
     * This function is called by the sketch (every tick)
     */
    update() {
        // go through all cells 
        for(let i = 0; i < this.cells.length; i++) {
            // pick a cell and call its show function
            let cell = this.cells[i];
            cell.show();
            // call the current cell's update function with our classe's cells array
            cell.update(this.cells, i);
        }
        // update the systemObserver
        this.systemObserver.update();
    }

}