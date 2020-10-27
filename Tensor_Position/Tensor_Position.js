// Number of dimensions in the position.


const {is_array} = require('lang-mini');
const inspect = Symbol.for('nodejs.util.inspect.custom');


// Maybe want floating point positions
//  And be able to work between the two.


// Integer only positions help restrict some things in the right way.

const Tensor_Vector = require('../Tensor_Vector/Tensor_Vector');


// Tensor Integer Position

class Tensor_Position {
    constructor(spec) {
        // Array with the position within each dimension.
        // Typed array necessary for the positions within each dimension.
        // 32 bit integers.
        let ta_positions_in_dimensions;

        // And also the number of dimensions here?

        // Must be ta 32 bit signed.
        
        // Probably will have an array as the parameters.
        if (is_array(spec)) {
            // Copy it into the ta.
            //const arr = spec;
            //console.log('arr.length', arr.length);
            ta_positions_in_dimensions = new Int32Array(spec);
        }
        // otherwise the arguments are the params?

        // .ta property
        Object.defineProperty(this, 'ta', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
                
                return ta_positions_in_dimensions;

                // 2 items in the ta for each dimension.
                //return ta_dimensions.subarray(0, num_dimensions * 2);

            },
            //set(newValue) { throw 'NYI'; ta_dimensions = newValue; },
            enumerable: true,
            configurable: true
        });



        this.move = vector => {

            if (vector instanceof Tensor_Vector) {

            } else {
                console.log('not vector instanceof Tensor_Vector');
                // so it's an array I guess.

                if (is_array(vector)) {
                    const l = vector.length;
                    for (var c = 0; c < l; c++) {
                        if (vector[c] !== 0) ta_positions_in_dimensions[c] += vector[c];
                    }

                }

            }

        }

        // Make it able to accept an array
        //  But a Tensor_Vector looks like it would be useful.

        // As would a Tensor_Origin





        // Move
        //  Move by a vector.

        // Is position just a vector from the origin?





    }
    [inspect]() {
        //console.log('ta', this.ta);
        //console.log('ta', this.ta + '');
        //let str_res = '';

        return 'Tensor_Position(' + this.ta + ')';
    }
}

module.exports = Tensor_Position;