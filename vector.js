/*      
 *      Virus Simulator 
 *      (c) Moritz Mitterdorfer - 2020
 */

 /**
  * An implementation of a vector 
  */
class Vector {

    /**
     * Constructor
     * @param {number} x - start x
     * @param {number} y - start y
     * @param {number} maxX - maximum x
     * @param {number} minX  - minimum x
     * @param {number} maxY  - maximum y
     * @param {number} minY  - minimum y
     */
    constructor(x, y, maxX, minX, maxY, minY) {
        this.x = x;
        this.y = y;
        this.maxiumum = {
            x: maxX,
            y: maxY
        }
        this.minimum = {
            x: minX,
            y: minY
        }
    }

    /**
     * Add a vector to the classe's own vector
     * @param {object} vec - The vector to add
     */
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        this.x = (this.x > this.maxiumum.x ? this.maxiumum.x : this.x);
        this.x = (this.x < this.minimum.x ? this.minimum.x : this.x);
        this.y = (this.y > this.maxiumum.y ? this.maxiumum.y : this.y);
        this.y = (this.y < this.minimum.y ? this.minimum.y : this.y);
    }

    /**
     * Subtract a vector from the classe's own vector
     * @param {object} vec - The vector to subtract
     */
    subtract(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    }

    /**
     * Each component of the vector is multiplied with a given scalar
     * e.g. [1,2] * 4 = [1*4, 2*4] = [4,8]
     * @param {number} scalar - number 
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

}