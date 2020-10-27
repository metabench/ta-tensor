// Could be much like an array of dimensions.
//  Each dimension object referring to a range within a single typed array?

// Dimension ranges.
// Tensor-Dimension

// With the shape holding multiple dimensions.
//  Subarrays / views of a single larger array?
const inspect = Symbol.for('nodejs.util.inspect.custom');
class Tensor_Shape {
    constructor(spec) {

        // Number of dimensions...


        // Dimensions array?
        //  Or proxy object?
        //   An array could maybe work OK... But not sure.
        //   Maybe only want TAs and may require a simpler interface.

        // Multiple Tensor_Dimension objects could be very useful.
        //  Maybe in an array...?

        // Separate class for dimensions could make a lot of sense.

        // Number of dimensions...

        

        
        // Tensor_Dimensions_Array?
        //  This could be useful for different possible implementations of this.
        //  Would clear up some possible ambiguity and allow for more flexibility.

        






    }
    [inspect]() {
        return 'Tensor_Shape()';
    }

}

module.exports = Tensor_Shape;