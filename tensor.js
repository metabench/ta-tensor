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

/* Possible much faster loop-action method

loop dimension 1
 loop dimension 2
  loop dimension 3
   write them all, updating the offsets
   
Could be a lot faster if it means avoiding having to (re)calculate indexes.
However, calculating indexes could likely be done quickly, and its a reliable method.



*/

// Adds the two, new result. Do we want that?
const add_ta = (ta1, ta2) => {
    const l = Math.max(ta1.length, ta2.length);
    const res = new ta1.constructor(l);
    for (let c = 0; c < l; c++) {
        res[c] = (ta1[c] || 0) + (ta2[c] || 0);
    }
    return res;
}
// copy a ta?
//  could be faster than slice

const read_only = (obj, prop_name, fn_get) => {
    Object.defineProperty(obj, prop_name, {
        get() {
            return fn_get();
        }
    });
}

// Use the regular Map constructor to transform a 2D key-value Array into a map
var m_ta_constructors = new Map([
    [Uint8ClampedArray, true],
    [Uint8Array, true],
    [Uint16Array, true],
    [Uint32Array, true],
    [Int8Array, true],
    [Int16Array, true],
    [Int32Array, true],
    [Float32Array, true],
    [Float64Array, true]
]);


/*
    Position Deltas
    ---------------

    Need to be able to use tensors to represent differences in index values, as well as differences in positions.
    Index value diffs can be stored in a list, while position differences are in a matrix
    Or position differences can be expressed as a shape, where the central pixel / position is right in the middle.

    Then convert a position difference shape to the position deltas list
    // And can / should use / support tensors for both.
    Scalar tensors could even be useful in ensuring the types of numbers.


    // tensor.shape_to_position_deltas
    //  only think we really need the TypedArray here

*/


// Could possibly have a Shape or Tensor_Shape class
//  It would be useful in that it can be combines with another tensor's shape to work out the position offsets as one shape gets used as offsets while moving through that
//  tensor.

// Tensor_Shape does seem like it would be useful.
//  Can use that rather than full tensors for working out the shape.
//  Possibly Tensor itself can hold Tensor_Shape which can do a few more calculations.


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
            //console.log('rshape[c]', rshape[c]);

            tsize = tsize * rshape[c];
            dimension_factors[c + 1] = tsize;
        }
        dimension_factors.reverse();

        const size = tsize;

        //if (m_ta_constructors.has)

        //dimension_factors.reverse();
        dimension_factors = dimension_factors.slice(1);

        //console.log('dimension_factors', dimension_factors);

        const r_dimension_factors = dimension_factors.slice().reverse();

        //throw 'stop';


        if (!(shape instanceof Uint32Array)) {
            shape = new Uint32Array(shape);
        }
        const ta = m_ta_constructors.has(TAConstructor) ? new TAConstructor(size) : TAConstructor;
        if (ta.length !== size) {
            throw 'Typed Array Size Mismatch';
        }

        read_only(this, 'rank', () => rank);
        read_only(this, 'size', () => size);
        read_only(this, 'shape', () => shape.slice());
        read_only(this, 'dimension_factors', () => dimension_factors.slice());


        // index offsets.


        const shape_to_index_offsets = shape => {
            // depends on own dimension factors

            console.log('shape', shape);
            console.log('shape.length', shape.length);

            // Possibly return its own tensor.
            // Maybe we don't need to return a tensor with its own shape.

            // Then can use the index offsets for a floating window.
            //  Use another for loop, and read values, rather than have to assemble a new object.

            

            // will need to go through all positions within the shape.
            //  or the expansion of the shape really.

            // Will use this to make the index position deltas from a shape
            // Will need to find the centre position within each dimension.

            // Make a tensor with that shape?
            //  Then go through its positions
            //  Making a list of the deltas with reference to this / assigning that value to the tensor.

            // Maybe we could have a Shape class?
            //  Not sure.

            // iterate shape?
            //  get_shape_positions?
            //   then we can find the centre of all of them?
            //    then recentre the shape positions.

        }


        // dimension_factors

        // Why enable access to the underlying ta? is that less secure?
        // To enable faster operations with direct access, that don't require function calls.
        //  Want other objects, including other tensors, to be able to read the ta.
        // In some cases it wouldn't be as secure. Can't rely on this data being either hidden or immutable.
        read_only(this, 'ta', () => ta);

        (( rank, dimension_factors, r_dimension_factors, size, shape ) => {

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
                //console.log('');
                //console.log('i', i);

                //console.log('rank', rank);
                const res = new Uint32Array(rank);

                // need the dimension factors in the other dimension here.

                //console.log('dimension_factors', dimension_factors);
                //console.log('r_dimension_factors', r_dimension_factors);

                //throw 'stop';

                for (let c = 0 ; c < rank; c++) {
                    const a = Math.floor(sum / dimension_factors[c]);
                    sum -= a * dimension_factors[c];
                    //console.log('a', a);
                    res[c] = a;
                }

                /*
                for (let c = rank - 1; c >= 0; c--) {
                    console.log('dimension_factors[c]', dimension_factors[c]);
                    console.log('r_dimension_factors[c]', r_dimension_factors[c]);

                    // r_dimension_factors
                    const a = Math.floor(sum / r_dimension_factors[c]);
                    res[c] = a;
                    //let b = i % dimension_factors[c];

                    //console.log('1) a, b', [a, b]);
                    sum -= a * r_dimension_factors[c];
                }
                */

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

            // Seems much like slice
            //  Not sure

            const get_from_lower_rank = pos => {
                console.log('get_from_lower_rank', pos);

                // Should contain a tensor that contains the inner data.
                //  Maybe it gets a bit complex here

                // Tensor gets the dimensions of the remaining ranks.

                const l = pos.length;
                const rem = shape.slice(l);
                //console.log('pos l', l);
                //console.log('rem', rem);

                //let res = new Tensor(rem);
                //console.log('res', res);

                const i_begin = pos_to_i(pos);
                //console.log('i_begin', i_begin);

                //console.log('dimension_factors', dimension_factors);
                let rank_size = 1;
                for (let c = 0, l = rem.length; c < l; c++) {
                    rank_size *= rem[c];
                }

                //console.log('rank_size', rank_size);
                //const i_end = i_begin + rank_size;
                //console.log('i_end', i_end);

                //const ta_res = ta.slice(i_begin, i_begin + rank_size);
                //console.log('ta_res', ta_res);
                //console.log('ta_res.length', ta_res.length);

                //let res = new Tensor(rem, ta_res);
                return new Tensor(rem, ta.slice(i_begin, i_begin + rank_size));

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

            const set = function (pos, value) {
                const a = arguments,
                    l = a.length;
                if (l === 1) {
                    value = a[0];
                    pos = null;
                    // or zeros throughout the whole thing.?

                    // May need to look at the value.length
                }

                if (Array.isArray(pos)) {
                    pos = new Uint32Array(pos);
                }

                // if the value is a number
                //  need to have a position
                if (typeof value === 'number') {
                    // need to have a position.

                    if (pos !== null) {
                        ta[pos_to_i(pos)] = value;
                    } else {
                        throw 'NYI';
                    }

                } else {
                    if (Array.isArray(value)) {
                        //console.log('arr value.length', value.length);
                        if (pos === null) {
                            if (value.length === ta.length) {
                                const l = value.length;
                                for (let c = 0; c < l; c++) {
                                    ta[c] = value[c];
                                }
                            }
                        }

                    } else {
                        if (m_ta_constructors.has(value.constructor)) {
                            // typed array
                            //console.log('ta value.length', value.length);

                            if (pos === null) {
                                if (value.length === ta.length) {
                                    const l = value.length;
                                    for (let c = 0; c < l; c++) {
                                        ta[c] = value[c];
                                    }
                                } else {
                                    throw 'NYI';
                                }
                            }
                        } else {
                            // 

                            if (value instanceof Tensor) {
                                //console.log('value', value);
                                //console.log('value.shape', value.shape);
                                //console.log('value.rank', value.rank);
                                //throw 'stop';

                                const vta = value.ta;
                                // Can only do a direct copy where there is the right shape alignment.

                                // More checks that it will fit within the boundary of this tensor?
                                //  Automatically clip it is it won't be?

                                // Better to iterate through all indexes of the value.
                                //  Then get the coords from that value
                                let iv = 0, lv = value.size;
                                for (iv = 0; iv < lv; iv++) {
                                    //console.log('iv', iv);

                                    /*
                                    
                                    
                                    let posv = value.i_to_pos(iv);
                                    //console.log('posv', posv);
                                    //console.log('pos', pos);

                                    // then add together the tas
                                    //console.log('pos', pos);

                                    const mypos = add(pos, posv);
                                    //console.log('mypos', mypos);

                                    const imy = pos_to_i(mypos);
                                    //console.log('imy', imy);

                                    ta[imy] = vta[iv];
                                    */
                                    
                                    // Or could use some kind of index offset list / tensor.
                                    ta[pos_to_i(add_ta(pos, value.i_to_pos(iv)))] = vta[iv];
                                }
                                // find the index of the pos
                                //const i = pos_to_i(pos);

                                // then need to iterate through that tensor's pos.

                            } else {
                                console.trace();

                                throw 'Unsupported value type ' + value;
                            }
                        }
                    }
                }
            }

            //const set = (pos, value) => ta[pos_to_i(pos)] = value;
            // 

            const get = pos => pos.length === rank ? ta[pos_to_i(pos)] : get_from_lower_rank(pos);

            this.set = set;
            this.get = get;

            const fill_with_value = value => {
                const l = ta.length;
                for (var c = 0; c < l; c++) ta[c] = value;
                return this;
            }
            const fill_with_tensor = value_tensor => {
                //console.log('fill_with_tensor');
                const tr = value_tensor.rank;
                //console.log('tr', tr);
                const ts = value_tensor.size;
                //console.log('ts', ts);
                const tta = value_tensor.ta;

                // Check to see if the dimension size matches?
                //  Needs more work for other cases.

                // Only a tensor of rank 1, we could copy it directly.

                // But lets loop through all of that tensor's coordinates and values.
                //  Better to directly access the other tensor's ta?
                //  would make sense, so that we get fastest access without having to use a callback function system.

                // find the rank where this gets added

                //let my_target_dimension = rank - tr;
                //console.log('my_target_dimension', my_target_dimension);

                const l = ta.length;

                let c, d;
                for (c = 0; c < l; c += ts) {
                    for (d = 0; d < ts; d++) {
                        ta[c + d] = tta[d];
                    }
                }
                return this;

                // then go through every dimension up to the target dimension

                // need to be able to write the tensor in every value within the right dimension

                // ideally want to look through the index, doing an addition.


                //const l = ta.length;
                //for (var c = 0; c < l; c++) ta[c] = value;
                //return this;
            }

            const fill = (value) => value instanceof Tensor ? fill_with_tensor(value) : fill_with_value(value);
            this.fill = fill;


            const scale = scalar => {
                const l = ta.length;
                for (let c = 0; c < l; c++) ta[c] *= scalar;
                return this;
            }
            this.scale = scale;

            // add
            //  add another tensor to this - the shapes need to match
            //  how about just comparing the sizes?

            // add and subtract

            // could just compare the ta sizes for the lower level ops.

            const add = (t, alpha = 1) => {
                const tta = t.ta, ttal = tta.length, l = ta.length;
                if (l !== ttal) {
                    throw 'Unequal sizes'
                }

                if (alpha === 1) {
                    for (let c = 0; c < l; c++) ta[c] += tta[c];
                } else if (alpha === -1) {
                    for (let c = 0; c < l; c++) ta[c] -= tta[c];
                } else {
                    for (let c = 0; c < l; c++) ta[c] += tta[c] * alpha;
                }
                
                return this;
            }
            this.add = add;

            const subtract = t => add(t, -1);
            this.subtract = subtract;





            // slice

            // has begin and end positions.

            // need to create a new tensor of the chosen size.

        })(rank, dimension_factors, r_dimension_factors, size, shape);


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



        // see y is on the left of x here.

        //
        // (width * height * depth * t) + (width * height * z) + (width * y) + x
        // (d1 * d2 * d3 * p4) + (d1 * d2 * p3) + (d1 * p2) + p1
        //       t                     z             y        x
        //       4                     3             2        1
        //       3, 2, 1               2, 1          1

    }

}




module.exports = Tensor;