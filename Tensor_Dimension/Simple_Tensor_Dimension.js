
// 
const Tensor_Dimension = require('./Tensor_Dimension');

// 1D <> nD

class Simple_Tensor_Dimension extends Tensor_Dimension {
    constructor(spec) {
        // Needs the shape.

        // Could look at arguments object.

        // (int_start, int_length)

        const a = arguments;

        let ta_dimension;

        // but what about if given a subarray to another array?

        if (a.length === 2) {
            // (int_start, int_length)

            if (typeof a[0] === 'number' && typeof a[1] === 'number') {
                // both integers?

                if (Math.floor(a[0]) === a[0] && Math.floor(a[1]) === a[1]) {
                    if (!ta_dimension) {
                        ta_dimension = new Int32Array(2);
                        ta_dimension[0] = a[0];
                        ta_dimension[1] = a[1];
                    }

                }

            }

        }
        

        // Not sure what else.

        // This will calculate conversions between 1D and nD index / coordinate space.

        //let shape;

        //if (spec.shape) {
        //    shape = spec.shape;
        //}

        // Shape object should not itself do the calculations - but should provide useful / necessary info in order to do it.

        // Tensor_Position class?
        //  Could make sense logically, and act as a pointer.
        //   Multiple ones could define points for shapes / polygons.





        // Functions - get_1d_index(nd_position)

    }

}

module.exports = Simple_Tensor_Dimension;