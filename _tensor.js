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



// Will do this in a very OO way.
//  Objects will be used to represent all sorts of things.
//   Slices, planes, variety of shapes.
//   Numbers that are used for different kinds of mapping.
//    Mapping between different shapes and coords systems.
//     Want majority of operations to be really simple when carrying out various tensor ops.
//      Will be interesting to make and use classes that represent 3D shapes, and then have algorithm that determines if any 1x1x1 cube within 3D space:
//       1) Has no intersection
//       2) Has partial intersection ?????
//       3) Has full coverage ?????
//       4) Has any intersection / overlap with the shape.
//       5) A single point is within the defined shape (easier to check).

//  High resolution mapping / calculation?
//   High resolution calculations available through (more) advanced maths?

// Generally, work out necessary calculations to do the operation(s).
//  Then it will be fast to do the specific operations, given that we have the preceeding data. Data that gets precalculated in order to enable operations to qork quickly - data locality, and sequential processing of data.
//   If possible, stages necessary to break down task so it can be parallelised. 














const Tensor_Shape = require('./Tensor_Shape/_tensor-shape');


// Add to self?

// Subtrct from?

const ta_copy_to = (source, target) => {
    const l = source.length;
    for (let c = 0; c < l; c++) {
        target[c] = source[c];
    }
    return target;
}

const self_add_ta = (ta1, ta2) => {
    const l = ta1.length;
    for (let c = 0; c < l; c++) {
        ta1[c] = ta1[c] + (ta2[c] || 0);
    }
    return ta1;
}


const self_subtract_ta = (ta1, ta2) => {
    const l = ta1.length;
    for (let c = 0; c < l; c++) {
        ta1[c] = ta1[c] - (ta2[c] || 0);
    }
    return ta1;
}


// Adds the two, new result. Do we want that?
const add_ta = (ta1, ta2) => {
    const l = Math.max(ta1.length, ta2.length);
    const res = new ta1.constructor(l);
    for (let c = 0; c < l; c++) {
        res[c] = (ta1[c] || 0) + (ta2[c] || 0);
    }
    return res;
}

const subtract_ta = (ta1, ta2) => {
    const l = Math.max(ta1.length, ta2.length);
    const res = new ta1.constructor(l);
    for (let c = 0; c < l; c++) {
        res[c] = (ta1[c] || 0) - (ta2[c] || 0);
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


    // Can also have a simpler positions iterator
    //  Carries out an increment operation on a ta of postion vectors.

    // That increment loop will itself also be a useful pattern.



    // (Byte_Tensor?)
    
    constructor(shape, TAConstructor = Uint8Array) {

        const rank = shape.length;
        // but not in this variable
        // rank may sometimes be 0 indexed....


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

        ((ta, rank, dimension_factors, r_dimension_factors, size, shape) => {

            const ta_limits = new Uint32Array(rank);

            for (let c = 0; c < rank; c++) {
                ta_limits[c] = shape[c] - 1;
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

            // write_ta(idx)
            //  could be useful for copying over tensors
            //  can divide into different tas to write.

            // write_tensor(idx)

            // write will be a simple command from the index

            const write_ta = (idx, p_ta) => {
                const max = idx + p_ta.length;
                let i = 0;
                for (let c = idx; c < max; c++) {
                    ta[c] = p_ta[i++];
                }
                return this;
            }
            this.write_ta = write_ta;



            // And we could have a read function.
            //  Could read it to an existing ta
            //  Some loops can use a single ta for values that get checked logically rather than used as results.

            const read_ta = (idx, p_ta) => {
                const max = idx + p_ta.length;
                let i = 0;
                for (let c = idx; c < max; c++) {
                    p_ta[i++] = ta[c];
                }
                return this;
            }
            this.read_ta = read_ta;

            const offsets_tensor_to_index_offsets = ta_conv_shape => {
                // go through the items in the offsets tensor.
                //console.log('ot.shape', ot.shape);
                //  The last rank contains the offsets.
                // calculate the rank multiplier up to the one before last.
                const ot_s_l = ta_conv_shape.length;
                //console.log('ot_s_l', ot_s_l);
                const last_i = ot_s_l - 1;
                // then iterate through at 2, getting the tas.
                //  can use temporary ta vectors.
                // the number of results... ot.size

                // multiply together the items in the shape to get the size.



                let res = new Int32Array(ot.size / 2);
                //console.log('last_i', last_i);
                //console.log('ot.rank', ot.rank);
                //console.log('ot.ta', ot.ta);
                // And a result vector ta?
                let idx = 0;
                let i, c, l;
                ot.each_pos_ta_at_or_below_rank(last_i, (pos, p_ta) => {
                    //console.log('p_ta', p_ta);
                    //console.log('ta', ta);

                    //console.log('dimension_factors', dimension_factors);
                    // Then calculate the index offsets from the pos.

                    // get_index_offset_from_ta_offset_vectors
                    /// calculate it based on the shape

                    // Need to use the cumulative sizes.

                    // Then make subclasss for this that process / represent images.
                    i = 0;
                    l = p_ta.length;
                    for (c = 0; c < l; c++) {
                        i += p_ta[c] * dimension_factors[c];
                    }
                    //console.log('i', i);
                    res[idx++] = i;

                })
                return res;

                // each_pos_ta_at_or_below_index
                //  returns a typed array, which represents a flat reading of that position in the tensor.
                //  could try different types of copying to try for optimization.
                //  maybe slice would work, and also worth looking to creating Data_View objects, ArrayView or whatever it is.




            }

            const conv_index_offsets = (ta_conv_shape) => {
                //console.log('ta_conv_shape', ta_conv_shape + '');

                // create a temp tensor with that shape

                // Create a new tensor with that 

                // an offsets tensor from a shape.

                let new_shape = new Uint32Array(ta_conv_shape.length + 1);
                for (let c = 0; c < ta_conv_shape.length; c++) {
                    new_shape[c] = ta_conv_shape[c]
                }
                new_shape[ta_conv_shape.length] = ta_conv_shape.length;




                //console.log('new_shape', new_shape);
                let sshape = new Tensor(new_shape, Int8Array);
                // then iterate it at and below rank ta_conv_shape.length
                // or try that
                //  not sure if ranks should be considered 0 indexed

                // make the offsets tensor...

                let ta_shape_centre_offsets = new Int32Array(ta_conv_shape.length);
                for (var c = 0, l = ta_conv_shape.length; c < l; c++) {
                    ta_shape_centre_offsets[c] = Math.floor(ta_conv_shape[c] / 2);
                }

                let conv_length = 1;
                for (var c = 0; c < ta_conv_shape.length; c++) {
                    conv_length *= ta_conv_shape[c];
                }


                // have a temporary pos?
                const tpos = new Int32Array(ta_conv_shape.length);
                const res = new Int32Array(conv_length);

                let rw = 0;
                sshape.each_pos_index_at_or_below_rank(ta_conv_shape.length, (pos, idx) => {
                    //console.log('pos, idx', [pos, idx]);

                    // size at and above rank...
                    //  that's one of the coefficients list

                    // and subtract_ta
                    //console.log('1) pos', pos);
                    ta_copy_to(pos, tpos);

                    self_subtract_ta(tpos, ta_shape_centre_offsets);
                    //console.log('2) tpos', tpos);
                    //throw 'stop';
                    // butract 1/2 size in that dimension from it?

                    sshape.write_ta(idx, tpos);

                    // however, we can calculate the index offset
                    let v = 0;
                    for (let c = 0; c < ta_conv_shape.length; c++) {
                        v += shape[c + 1] * tpos[c];
                    }
                    //console.log('v', v);

                    res[rw++] = v;
                })

                //console.log('res', res);

                // Then can use this for the convolution.
                //  Get convolution index offsets





                // size at rank?
                // 


                // Then get the offsets from these vectors.



                //Then go through those, multiplying them by that part of the shape.

                // Use the cumulative amounts 




                // tensor.get_tensor_shape_offsets(sshape);

                //console.log('sshape', sshape + '');
                return res;
                // Then work out the offsets there.




                //let ot = sshape.get_offsets_tensor();
                //let ios = offsets_tensor_to_index_offsets(ot);
                //console.log('ios', ios);


                //const ts = new Tensor_Shape([3, 3]);

                //const offsets = offsets_tensor_to_index_offsets(ta_conv_shape);
                //console.log('offsets', offsets);

                /*



                let c = 0;
                const mss = Date.now();
                const mst = Date.now() - mss;
                console.log('mst', mst);
                console.log('c', c);

                //const ot = ts.get_offsets_tensor();


                //console.log('ot', ot);

                // then we make an item offset multiple of ta_conv_shape multiplied together

                let m = 1;
                for (let c = 0, l = ta_conv_shape.length; c < l; c++) {
                    m *= ta_conv_shape[c];
                }
                console.log('m', m);
                */

                // but we really want to 


            }
            this.conv_index_offsets = conv_index_offsets;


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

                for (let c = 0; c < rank; c++) {
                    const a = Math.floor(sum / dimension_factors[c]);
                    sum -= a * dimension_factors[c];
                    //console.log('a', a);
                    res[c] = a;
                }

                return res;
            }

            this.i_to_pos = i_to_pos;



            const toString = () => {
                // if it's got rank 2
                //  display the values in a grid
                // rank 3 - multiple grids

                if (rank === 2) {
                    let arr_lines = [];
                    // each value at or below rank 0
                    //  0 indexed rank there.

                    // Then get the values within that position?
                    //  Maybe read_ta would help.
                    //  Reads at a position, knowing what the rank coefficient is there.



                    each_idx_at_or_below_rank(0, idx => {
                        // read ta_value there
                        //  based on the position?

                        console.log('idx', idx);

                    })

                } else {
                    // Could have an array at each part for rank 3.

                    // if its rank 3
                    // can show the array at each position in rank 1 (0i)
                    if (rank === 3) {

                        // But if we don't want the full pos, only want the first part of the pos.
                        //return 'Tensor[' + shape + ']';

                        // new item every 2 values
                        // new row every 3 items


                        const arr_all = [];
                        //let c2 = 0;
                        let arr_row = [];
                        let arr_item = [];

                        //let dc0 = dimension_factors[0];
                        //let dc1 = dimension_factors[1];
                        for (let c = 0, l = ta.length; c < l; c++) {

                            /*
                            if (c > 0) {
                                if (c % dc1 === 0) {
                                    arr_row.push(arr_item);
                                    arr_item = [];
                                }
                                if (c % dc0 === 0) {
                                    arr_all.push(arr_row);
                                    arr_row = [];
                                }
                                
                            }*/

                            arr_item.push(ta[c]);

                            if (arr_item.length === 2) {
                                arr_row.push(arr_item);
                                arr_item = [];
                            }
                            if (arr_row.length === 3) {
                                arr_all.push(arr_row);
                                arr_row = [];
                            }
                        }

                        //console.log('arr_all', arr_all);
                        //return 'Tensor[' + shape + ']\n' + JSON.stringify(arr_all, null, 2)
                        return 'Tensor[' + shape + ']\n' + arr_all.map(x => JSON.stringify(x)).join('\n').split('[[').join('[').split(']]').join(']');
                    } else {
                        return 'Tensor[' + shape + ']';
                    }
                }

            }
            this.toString = toString;

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
                                let iv = 0,
                                    lv = value.size;
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


            // a fast each_pos function

            // Then we would like each pos at a specific dimension beginning.
            //  Though that maybe could be calculated with other addition and multiplication in a loop.
            //   Not requiring full iteration.
            //   Find the first item, then know the multiplication factors.
            //    Work through some simpler examples to find really fast performance.

            // each pixel would wrap this or a similar function.

            // Also want some kind of tensor extraction or inner iteration if possible.

            // Each pos at dimension
            //  Won't iterate positions at higher (right) dimensions.

            // like each pos, but have a lower maximum rank.

            // each pos from rank
            //  only cb if the dimension being incremented is at or below the rank_limit / dimension_limit

            // dimension is more JS-compatible terminology

            // each_pos_at_or_below_rank

            // each_pos_at_or_above_rank
            //  etc
            //   may as well have quite a lot of functions and use them as appropriate.


            // Could definitely make a more optimized versions.

            // Could we read tensors that are dataviews of this?
            //  Likely not, in many cases.
            //  Will need to copy when reshaping usually.

            // And a padded version of this too...

            // padded_each_pos
            //  increment the position vector ta, while keeping it within the padding.

            // A convolve function would definitely be useful.
            // Takes a tensor, which is assumed to be centered, and run it on this tensor.
            // Would need to use padding too.



            // Padding tensor iterations would help with convolutions.
            // Padding is important with convolutions and repeating them.

            // Could keep the image or whatever outside of the main space.
            // Though best to leave it unmodified for the moment.





            // const ta_convolve

            // Except it needs to account for padding.
            //  This makes it necessary for there to be a padding-specific loop
            //  Or a few possible ways of looping and iterating while dealing with padding.

            // Want nd convolutions by default.
            //  We can define the nd shapes
            //  We can get the nd index offsets vector
            //  Then need to know which rank to iterate over.
            //   Consider the convolution size, from the left.
            //   Iterate over that rank and below
            //   

            // Could have a convolution_iteration
            //  Or just use padded iteration alongside the offset vector.

            // Offset vector could be used for very fast value lookup. 

            // Want to directly refer by index rather than doing extra object creation or copying.








            // we have the shape already
            const check_position_vector_within_equal_padding = (pos, padding) => {
                // and the position vector may be shorter than the overalls shape

                let is_within_padding = false;
                let d = 0,
                    l = pos.length;
                for (d = 0; d < l; d++) {
                    if (pos[d] - padding < 0) return true;
                    if (shape[d] - 2 * padding - pos[d] <= 0) return true;
                }

                return is_within_padding;
            }

            this.chk_eq_pad = check_position_vector_within_equal_padding;



            // And could also do a non-padded version, but check if its within the padding.
            //  Provide the index, while also using a boolean saying if it's within the padding or not.

            const padded_each_pos_at_or_below_rank = (p_rank, i_padding, cb) => {
                // Only pad at or below that rank.

                // can then use that for a convolution.
                //  Convolution in an image will need to work on multiple channels.

                // As it moves through each index, it uses its offsets

                // really we want each index.

                // iterate pixels
                //  if it's within the padding, raise the callback.

                // However, a version with the index would maybe be more useful.
                // And a version with an additional padding callback

                each_pos_at_or_below_rank(p_rank, pos => {
                    if (!check_position_vector_within_equal_padding(pos, i_padding)) {
                        cb(pos);
                    }
                });


                // for an index, want to be able to calculate if its within padding.
                //  could maybe do this quickly using remainders.


                // May need to redevelop this?

                // Or copy the function below which applies to the position, after checking a position vector for padding.


                // Checking a position vector for padding makes a lot of sense.

                // padding, pos, shape








            }

            this.padded_each_pos_at_or_below_rank = padded_each_pos_at_or_below_rank;


            const each_pos_at_or_below_rank = (p_rank, cb) => {
                // Could this be sped up?
                const pos = new Int32Array(p_rank);
                let done = false,
                    d;
                //const rank_size = dimension_factors[p_rank];
                //console.log('rank_size', rank_size);
                while (!done) {
                    d = p_rank - 1;
                    while (pos[d] === ta_limits[d] && d > -1) d--;
                    if (d === -1) {
                        done = true;
                    } else {
                        //if (d <= p_rank) docb = true;
                        pos[d]++;
                        if (d < p_rank) {
                            while (++d < p_rank) pos[d] = 0;
                        }
                        //if (docb) cb(pos);
                        cb(pos);
                    }
                }
                // Need to do that counting algorithm.
            }
            this.each_pos_at_or_below_rank = each_pos_at_or_below_rank;

            // We could just limit the output pos size





            // Could likely make faster algorithm that does not do any smaller iteration at all.

            // Think this function should work somewhat differently.

            const each_pos_index_at_or_below_rank = (p_rank, cb) => {
                // find the coefficient at that rank.
                // 

                const co = dimension_factors[p_rank - 1];
                console.log('co', co);
                console.log('p_rank', p_rank);


                // can increment by the rank coefficient.
                //  should use the same algorithm as each_pos_at_or_below_rank

                //each_pos_at_or_below_rank()

                // loop with that index increase
                // also want to loop through the positions
                // will efficiently increment both of them

                // 

                const pos = new Int32Array(p_rank);
                let done = false,
                    d, idx = 0;

                const rank_size = dimension_factors[p_rank];
                console.log('rank_size', rank_size);

                // cb with a copy of the pos?
                //  even a temp copy of the pos.
                //const pos = new Int32Array(p_rank);

                // Or use a temporary pos elsewhere
                // Could also use ta_copy





                cb(pos, idx);
                idx += co;
                while (!done) {

                    d = p_rank - 1;
                    while (pos[d] === ta_limits[d] && d > -1) d--;

                    if (d === -1) {
                        done = true;
                    } else {
                        //if (d <= p_rank) docb = true;
                        pos[d]++;
                        if (d < p_rank) {
                            while (++d < p_rank) {
                                pos[d] = 0;
                            }
                        }
                        //if (docb) cb(pos);
                        cb(pos, idx);
                        idx += co;
                    }
                }
            }

            const size_above_rank = p_rank => {
                console.log('size_above_rank p_rank', p_rank);
                let res = 1;
                for (let c = p_rank; c < rank; c++) {
                    res *= shape[c];
                }
                return res;
            }


            const each_pos_ta_at_or_below_rank = (p_rank, cb) => {
                // need to work out the size at rank or above
                let size_above = size_above_rank(p_rank);
                //console.log('size_above', size_above);

                const ta_res = new ta.constructor(size_above);
                const co = dimension_factors[p_rank - 1];
                //console.log('co', co);
                const pos = new Int32Array(p_rank);
                let done = false,
                    d, idx = 0;
                const rank_size = dimension_factors[p_rank];
                let next_idx = idx + co;
                let c2 = 0;
                for (let c = idx; c < next_idx; c++) ta_res[c2++] = ta[c];
                cb(pos, ta_res);
                idx += co;
                while (!done) {
                    d = p_rank - 1;
                    while (pos[d] === ta_limits[d] && d > -1) d--;
                    if (d === -1) {
                        done = true;
                    } else {
                        pos[d]++;
                        if (d < p_rank) {
                            while (++d < p_rank) {
                                pos[d] = 0;
                            }
                        }
                        let next_idx = idx + co;
                        let c2 = 0;
                        for (let c = idx; c < next_idx; c++) ta_res[c2++] = ta[c];
                        //console.log('ta_res', ta_res);
                        cb(pos, ta_res);
                        idx += co;
                    }
                }

                // then iterate the indexes and positions

            }
            this.each_pos_ta_at_or_below_rank = each_pos_ta_at_or_below_rank;


            this.each_pos_index_at_or_below_rank = each_pos_index_at_or_below_rank;
            this.each_pos_idx_at_or_below_rank = each_pos_index_at_or_below_rank;


            const each_pos = (cb) => {
                const pos = new Uint32Array(rank);
                //console.log('1) pos', pos);
                //throw 'stop';
                // they are all 0 to start with.
                let done = false;
                let d = rank - 1;
                const max_d = d;
                while (!done) {
                    // The callback takes a not all that much time when it doesn't do much.
                    cb(pos);
                    d = rank - 1;
                    while (pos[d] === ta_limits[d] && d > -1) d--;
                    if (d === -1) {
                        done = true;
                    } else {
                        pos[d]++;
                        if (d < max_d) {
                            while (++d < rank) {
                                pos[d] = 0;
                            }
                        }
                    }
                }
            }
            this.each_pos = each_pos;

            const each_pos_index = (cb) => {
                const pos = new Uint32Array(rank);
                //console.log('1) pos', pos);
                //throw 'stop';
                // they are all 0 to start with.
                let done = false;
                let d = rank - 1;
                const max_d = d;
                let i = 0;
                while (!done) {
                    // The callback takes a not all that much time when it doesn't do much.
                    cb(pos, i++);
                    d = rank - 1;
                    while (pos[d] === ta_limits[d] && d > -1) d--;
                    if (d === -1) {
                        done = true;
                    } else {
                        pos[d]++;
                        if (d < max_d) {
                            while (++d < rank) {
                                pos[d] = 0;
                            }
                        }
                    }
                }
            }
            this.each_pos_index = each_pos_index;
            this.each_pos_idx = each_pos_index;

            // And also should have padded iterations.
            //  These will be most useful for convolutions.





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
                const tta = t.ta,
                    ttal = tta.length,
                    l = ta.length;
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

            const clone = () => {
                const res = new this.constructor(this.shape, this.ta.slice());
                return res;
            }
            this.copy = this.clone = clone;

            const empty_copy = () => {
                return new this.constructor(shape, this.ta.constructor);
            }
            this.empty_copy = empty_copy;









            // slice

            // has begin and end positions.

            // need to create a new tensor of the chosen size.

        })(ta, rank, dimension_factors, r_dimension_factors, size, shape);


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


if (require.main === module) {
    //const t = new Tensor([10, 10, 3]);
    const t = new Tensor([1000, 1000, 3]);

    // Then when doing a convolution, we can create the convolution from three colors at once.

    // Getting the shapes offset seems like one of the most important things

    // 0 to 4 > index 2

    // Tensor_Image




    // Then a convolution kernel
    //  Or create the displacements out of the convolution kernel.
    //   Can do this using the Tensor_Shape iteration.

    // Then each_pixel would iterate at depth 2.

    // Want to get index displacement tensors to assist with a convolution loop.




    /*
    t.each_pos_at_or_below_rank(1, pos => {
        console.log('pos', pos);
    })
    */

    let ts = Date.now();
    // each pos idx at or above rank
    // or between ranks
    //  
    t.each_pos_at_or_below_rank(2, (pos) => {
        //console.log('pos', [pos]);
    });
    console.log('1 tt', Date.now() - ts);

    ts = Date.now();
    t.each_pos_idx_at_or_below_rank(2, (pos, idx) => {
        //console.log('pos, idx', [pos, idx]);

        // then we could do a convolution mask.
    });
    console.log('2 tt', Date.now() - ts);


}

module.exports = Tensor;