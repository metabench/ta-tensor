/// need to know the variety of dimensions

// will work out the index positions based on the sizing and coordinates.
// will do quite a large multiplication.

// Could have image processing systems that return a tensor contain multiple images.
// Could express multiple convolutions in a tensor

// Uint8Tensor

// Tensor (TaType, dimensions)

// Could get the dimensions as a Typed Array.

// Shape
//  Itself a TA
//  Likely UInt32Array

// Rank - number of dimensions

// Maybe worth making Position data type.

// Tensor type

// let t = new Tensor(shape), v;

// t.set_i(idx, value);
// v = t.get_i(idx);

// t.set(ta_pos, value);
// v = t.get(ta_pos);

// --- Maybe:
// t.set_t(ta_pos, tensor) - writes the tensor to that position.
// t.get_t(ta_pos, shape) - gets that position.

// t.slice(pos, shape)

// Animations and frames would be a good way to think through and test a few tensors.
//  Relatively low order, but an image could be a 3d tensor: x, y, pixel_component.

// Then this would be nice to convert to C++ and other optimization methods such as WASM.

// Tensor can't change shape

const read_only = (obj, prop_name, fn_get) => {
    Object.defineProperty(obj, prop_name, {
        get() {
            return fn_get();
        }
    });
}

// Use the regular Map constructor to transform a 2D key-value Array into a map
var m_ta_constructors = new Map([
    [Uint8ClampedArray, true], [Uint8Array, true], [Uint16Array, true], [Uint32Array, true],
    [Int8Array, true], [Int16Array, true], [Int32Array, true],
    [Float32Array, true], [Float64Array, true]
]);


class Tensor {
    // or if we give an instance of a typed array instead of a constructor?
    //  could check for the .constructor property

    constructor(shape, TAConstructor = Uint8Array) {

        const rank = shape.length;
        // calculate the size
        let tsize = 1;
        /*
        for (let c = 0; c < rank; c++) {
            size = size * shape[c];
        }
        */
        //const size = 
        // 

        // coords being used usually
        //  indexes may be used instead for performance reasons.
        //  index change vectors corresponding to coordinate change vectors.

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
        const rshape = shape.slice().reverse();

        for (let c = 0; c < rank; c++) {
            console.log('rshape[c]', rshape[c]);

            tsize = tsize * rshape[c];
            dimension_factors[c + 1] = tsize;
        }
        dimension_factors.reverse();

        const size = tsize;

        //if (m_ta_constructors.has)

        //dimension_factors.reverse();
        dimension_factors = dimension_factors.slice(1);

        console.log('dimension_factors', dimension_factors);
        //throw 'stop';

        read_only(this, 'rank', () => rank);
        read_only(this, 'size', () => size);
        read_only(this, 'shape', () => shape.slice());
        if (!(shape instanceof Uint32Array)) {
            shape = new Uint32Array(shape);
        }
        const ta = m_ta_constructors.has(TAConstructor) ? new TAConstructor(size) : TAConstructor;
        if (ta.length !== size) {
            throw 'Typed Array Size Mismatch';
        }




        // Do more within the constructor optimization, using local variables rather than this?
        //console.log('TAConstructor.constructor ' + TAConstructor.constructor);

        // Can check the contructor against all the known ta constructors,
        //  or have a js map object of the constructors.
        //  that could be fastest and idiomatic...?

        // For some optimized usages, we want to construct a tensor using a typed array already given
        //  check it's the right size too.


        //console.log('TAConstructor.prototype ' + TAConstructor.prototype);
        // number of dimensions?
        //  "order", "degree", or "ndims." - TensorFlow
        // scale? The components of a tensor with respect to a basis is an indexed array. The order of a tensor is the number of indices needed. Some texts may refer to the tensor order using the term degree or rank.
        //  order, degree, rank
        // tf.rank
        //  Returns a 0-D int32 Tensor representing the rank of input
        // tf.size
        //  Returns a 0-D Tensor representing the number of elements in input of type out_type. Defaults to tf.int32.

        // Our rank function will return a number


        // go with rank
        //  like TensorFlow

        //uint MaxValue = 4294967295;
        // uint MaxValue = 4,294,967,295; 4GB
        // For the moment, size is limited to 4GB.
        // size
        


        // It's the smaller part on the right.
        //  So the dimension factors should be created in the opposite direction.

        const pos_to_i = pos => {
            // pos should have all dimensions?
            //

            // But for lower order pos?

            let sum = 0;
            const l = pos.length;

            // Largest dimension factors should be on the left

            for (let c = 0; c < l; c++) {
                sum = sum + dimension_factors[c] * pos[c];
            }
            return sum;

            // need to use dimension factors in calculations.

            // consult dimension_factors.



            /*
            for (let d = rank - 1; d > 0; d--) {
                // all the lower rank shape (dimension) sizes multiplied together.

            }
            */

        }

        this.pos_to_i = pos_to_i;

        // then i to pos
        //  a bit harder to calculate
        //  may work with remainders.
        //  subtraction of dimension_factors, looking at what is left over

        const i_to_pos = i => {
            // work backwards.

            // work back through the dimension factors.

            // from the second last one.
            //  work backwards, using math floor divided part, and remainders once divided by that.

            // Or work up through the lower dimensions, 'accounting for' their components, and subtracting from the index.

            let sum = i;

            const res = new Uint32Array(rank);

            for (let c = rank - 1; c >= 0; c--) {
                //console.log('dimension_factors[c]', dimension_factors[c]);
                const a = Math.floor(sum / dimension_factors[c]);
                res[c] = a;
                //let b = i % dimension_factors[c];

                //console.log('1) a, b', [a, b]);
                sum -= a * dimension_factors[c];
            }

            return res;

            /*
            for (let c = 0; c < rank; c++) {
                console.log('dimension_factors[c]', dimension_factors[c]);
                let a = i / dimension_factors[c];
                let b = i % dimension_factors[c];
                console.log('2) a, b', [a, b]);
            }
            */

            /*
            */

            /*


            for (let c = 0; c < rank; c++) {
                console.log('dimension_factors[c]', dimension_factors[c]);
                if (c > 0) {
                    console.log('c', c);
                    console.log('2) dimension_factors[c]', dimension_factors[c]);
                    console.log('i % dimension_factors[c]', i % dimension_factors[c]);
                }
            }
            */
        }

        this.i_to_pos = i_to_pos;


        // Also various position iteration functions.
        //  Be able to get slices as Tensor objects.


        /*
        const set = (pos, value) => {
            const i = pos_to_i(pos);
            ta[i] = value;
            return this;
        }
        */

        const get_from_lower_rank = pos => {
            console.log('get_from_lower_rank', pos);

            // Should contain a tensor that contains the inner data.
            //  Maybe it gets a bit complex here

            // Tensor gets the dimensions of the remaining ranks.

            let l = pos.length;
            let rem = shape.slice(l);
            console.log('pos l', l);
            console.log('rem', rem);

            //let res = new Tensor(rem);
            //console.log('res', res);

            let i_begin = pos_to_i(pos);
            console.log('i_begin', i_begin);

            //console.log('dimension_factors', dimension_factors);
            let rank_size = 1;
            for (let c = 0, l = rem.length; c < l; c++) {
                rank_size *= rem[c];
            }

            console.log('rank_size', rank_size);
            let i_end = i_begin + rank_size;
            console.log('i_end', i_end);

            let ta_res = ta.slice(i_begin, i_end);
            console.log('ta_res', ta_res);
            console.log('ta_res.length', ta_res.length);

            let res = new Tensor(rem, ta_res);
            return res;

            // then we create a new Tensor with the remaining shape and data.

            // then need to iterate through the positions / indexes
            //  May be able to quickly copy from the ta if we know the right indexes.
            //  It should be a solid chunk of them.

            // Could work out the positions in the ta
            //  Then doing a copy seems like the most efficient.
            //  Could even first copy / slice the ta, and use Tensor.from or a constructor type that allows the ta to be specified


        }

        // Need to be able to write sub-tensors in place.

        // The trick will be to write smaller tensors.
        //  Need to extend functions from writing a 5x5 box into a 100x100 picture.
        //   Can't direct copy, could direct copy rows.
        //   Really need to work ut the corresponding index of each pixel/cell in each, and copy them accross.
        //   Can have fast index finding, and fast copying of data.
        //    So presumably this tensor maths system will be relatively fast.
        //    But would be considerably faster in a compiled language.


        // Say we have multiple frames, and we want to set individual frames.
        //  Or drawing a box within a single frame.
        //  That could be writing a 2d tensor.


        // set to lower rank looks a little more difficult.
        //  need to account for different shapes.

        //  I think we need to convert to and from coordinate systems.


        const set = (pos, value) => ta[pos_to_i(pos)] = value;
        const get = pos => pos.length === rank ? ta[pos_to_i(pos)] : get_from_lower_rank(pos);

        this.set = set;
        this.get = get;


        const fill = (value) => {
            const l = ta.length;
            for (var c = 0; c < l; c++) ta[c] = value;
            return this;
        }
        this.fill = fill;
        /*
        const get = (pos) => {
            const i = pos_to_i
        }
        */

        // index to coordinates
        // coordinates to index
        // movement vectors to index changes

        // y * w + x formula extension.

        // p2 * d1 + p1;



        // 3d x, y, z:

        // z dimension being layers going upwards
        // (w * h * z) + (w * y) + (x)

        //        lower dimension sizes multiplied together.
        //       (d1 * d2 * p3) + (d2 * p2) + p1
        //             z             y        x
        // d:          3             2        1
        // lowerds:    2, 1          1 

        // Time, like frame in a video, would be the first dimension.
        // Then t could be the next dimension / number of frames into the 3d-space animation
        //
        // (width * height * depth * t) + (width * height * z) + (width * y) + x
        // (d1 * d2 * d3 * p4) + (d1 * d2 * p3) + (d1 * p2) + p1
        //       t                     z             y        x
        //       4                     3             2        1
        //       3, 2, 1               2, 1          1

    }

}



if (require.main === module) {
	//var number = 252;
	//var key1 = new XAS2(number);
	//var key2 = xas2(key1.hex);

    const t = new Tensor(new Uint32Array([100, 100, 3]));
    console.log('t', t);

    //let i = t.pos_to_i([2, 2, 2]);
    let i = t.pos_to_i([40, 60, 2]);
    console.log('i', i);

    let pos = t.i_to_pos(i);
    console.log('pos', pos);

    t.set([40, 60, 0], 120);
    t.set([40, 60, 1], 130);
    t.set([40, 60, 2], 255);

    i = t.pos_to_i([40, 60, 0]);
    console.log('i', i);
    i = t.pos_to_i([40, 60, 1]);
    console.log('i', i);
    i = t.pos_to_i([40, 60, 2]);
    console.log('i', i);

    let px = t.get([40, 60]);
    console.log('px', px);
    console.log('px.shape', px.shape);

} else {
	//console.log('required as a module');
}

module.exports = Tensor;