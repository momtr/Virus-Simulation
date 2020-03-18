/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */


/**
 * the number of cells that exist
 */
const TOTAL_CELLS = 400;

/**
 * the diameter of a cell -> influences propability of an infection (the bigger, the greater the propab. of an infection)
 */
const DIAMETER = 20;

/**
 * the number of ticks per day
 */
const TICKS_PER_DAY = 100;

/**
 * the infection propability if two cells meet
 */
const INFECTION_PROPABILITY = 0.3;

/**
 * the propability of dying at any point when infected
 */
const PROP_TO_DIE = 0.0001;

/**
 * the propability of getting the virus again when the cell has already recovered (when the cell meets another cell)
 */
const PROP_OF_GETTING_AGAIN = 0.01;