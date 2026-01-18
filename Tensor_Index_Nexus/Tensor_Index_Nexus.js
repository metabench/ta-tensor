
const Tensor_Nexus = require('./Tensor_Nexus');
const { tof } = require('lang-mini');

class Tensor_Index_Nexus extends Tensor_Nexus {
    constructor(spec) {
        super(spec);
        // Needs the shape.

        let shape;

        if (spec.shape) {
            shape = spec.shape;
        } else {
            if (Array.isArray(spec)) {
                shape = spec;
            } else {
                if (spec instanceof Uint32Array) {
                    shape = spec;
                }
            }
        }

        if (!shape) throw 'Tensor_Index_Nexus requires a shape';


        const rank = shape.length;

        // calculate the size
        let tsize = 1;

        // compute rank multiplication tables
        //  dimension multipliers

        // create the array of dimension multipliers

        // d1, d1 * d2, d1 * d2 * d3;
        //  can have quick algorithm to compute them.

        let dimension_factors = new Uint32Array(rank + 1);
        dimension_factors[0] = 1;

        // Need to create the dimension factors in the opposite direction.
        //  The right-most part has got the smallest result in the dimensions.

        // reversed shape?
        const rshape = new Uint32Array(shape).reverse();

        for (let c = 0; c < rank; c++) {
            //console.log('rshape[c]', rshape[c]);
            tsize = tsize * rshape[c];
            dimension_factors[c + 1] = tsize;
        }
        dimension_factors.reverse();

        //const size = tsize;

        //if (m_ta_constructors.has)

        //dimension_factors.reverse();
        dimension_factors = dimension_factors.slice(1);

        //console.log('dimension_factors', dimension_factors);

        //const r_dimension_factors = dimension_factors.slice().reverse();


        this.pos_to_i = pos => {
            // pos should have all dimensions?
            // But for lower order pos?
            let sum = 0;
            const l = pos.length;
            // Largest dimension factors should be on the left
            for (let c = 0; c < l; c++) {
                sum = sum + dimension_factors[c] * pos[c];
            }
            return sum;
        }

        this.i_to_pos = i => {
            // work backwards.

            // work back through the dimension factors.

            // from the second last one.
            //  work backwards, using math floor divided part, and remainders once divided by that.

            // Or work up through the lower dimensions, 'accounting for' their components, and subtracting from the index.

            let sum = i;
            //console.log('');
            //console.log('i', i);

            //console.log('rank', rank);
            const res = new Uint32Array(rank);

            // need the dimension factors in the other dimension here.

            //console.log('dimension_factors', dimension_factors);
            //console.log('r_dimension_factors', r_dimension_factors);

            //throw 'stop';

            for (let c = 0; c < rank; c++) {
                const a = Math.floor(sum / dimension_factors[c]);
                sum -= a * dimension_factors[c];
                //console.log('a', a);
                res[c] = a;
            }

            return res;
        }
    }
}

module.exports = Tensor_Index_Nexus;