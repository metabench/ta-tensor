
// 
const Tensor_Nexus = require('./Tensor_Nexus');

// 1D <> nD

class Tensor_Index_Nexus extends Tensor_Nexus {
    constructor(spec) {
        // Needs the shape.

        // Not sure what else.

        // This will calculate conversions between 1D and nD index / coordinate space.

        let shape;

        if (spec.shape) {
            shape = spec.shape;
        }

        // Shape object should not itself do the calculations - but should provide useful / necessary info in order to do it.

        // Tensor_Position class?
        //  Could make sense logically, and act as a pointer.
        //   Multiple ones could define points for shapes / polygons.





        // Functions - get_1d_index(nd_position)

    }

}

module.exports = Tensor_Nexus;