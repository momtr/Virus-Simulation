/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */

 /**
  * This class is used to observe a system. The system calls its update function.
  * It then draws a graph of a) cells infeced b) cells died c) cells recovered
  */
class SystemObserver {

    /**
     * Constructor
     * @param {object} system - The system of cells
     */
    constructor(system) {
        // initialize several arrays that keep track of the cells of the system (system.cells)
        this.system = system;
        this.x = [];
        this.y = [];
        this.numOfCellsDied = [];
        this.recoveredCells = [];
    }

    /**
     * This function is called by the system
     */
    update() {
        // we observe the situation evey 12h (= 24 / 2)
        if(tick % (TICKS_PER_DAY / 2) == 0) {
            // calculate x
            let x = tick / TICKS_PER_DAY;
            // evaluate number of infected cells
            let y = 0;
            // evaluate the number of dead cells
            let numOfCellsDied = 0;
            // evaluate the number of cells that have already recovered
            let recoveredCells = 0;
            // loop through all cells of the system and update the local variables
            for(let i of system.cells) {
                y += (i.infected ? 1 : 0);
                numOfCellsDied += (i.died ? 1 : 0);
                recoveredCells += (i.hasHadIt ? 1 : 0)
            }
            // push the values of the local variables to the properties of the class
            this.x.push(x);
            this.y.push(y);
            this.numOfCellsDied.push(numOfCellsDied);
            this.recoveredCells.push(recoveredCells);
        }
        // draw a line between the simulation field and the graph field 
        // the line has strokeWeight three and the color black 
        strokeWeight(3);
        stroke(0);
        line(0, 600, 600, 600);
        // draw graphs of the functions
        // loop through all xs
        for(let i = 0; i < this.x.length; i++) {
            let x = this.x[i];
            let y = this.y[i];
            let deadCells = this.numOfCellsDied[i];
            let recoveredCells = this.recoveredCells[i];
            // draw the graphs
            if(i != this.x.length - 1) {
                stroke(200, 0, 70);
                // graph of infected cells
                line(x * 10, 900 - map(y, 0, TOTAL_CELLS, 0, 300), this.x[i+1] * 10, 900 - map(this.y[i+1], 0, TOTAL_CELLS, 0, 300));
                // graph of dead cells
                stroke(40, 40, 40);
                line(x * 10, 900 - map(deadCells, 0, TOTAL_CELLS, 0, 300), this.x[i+1] * 10, 900 - map(this.numOfCellsDied[i+1], 0, TOTAL_CELLS, 0, 300));
                // graph of cells recovered
                stroke(255, 255, 0);
                line(x * 10, 900 - map(recoveredCells, 0, TOTAL_CELLS, 0, 300), this.x[i+1] * 10, 900 - map(this.recoveredCells[i+1], 0, TOTAL_CELLS, 0, 300));
            } else {
                // put text above graph
                noFill();
                strokeWeight(1);
                stroke(40);
                text(y, x * 10, 870 - map(y, 0, TOTAL_CELLS, 0, 300));
            }
        }
    }

}