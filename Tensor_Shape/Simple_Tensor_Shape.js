
// Dimension index       Start offset      Length                                                          Unambiguius this way.
//                                                         Begin position     End position   (exclusive)   eg 0 to 100 actually goes from 0 to 99. 0 to 1 is a distance.


// An array of tensor dimensions?
//  Or avoid JS arrays?
//  Doing so seems like it would be faster if possible.

const {is_array} = require('lang-mini');
const inspect = Symbol.for('nodejs.util.inspect.custom');
const Tensor_Shape = require('./Tensor_Shape');
const oext = require('obext');
const {prop, field} = oext;


const LTR_SIGNIFICANCE = 0;
const RTL_SIGNIFICANCE = 1;


// Each Dimension as an object?
// Would be more effective OO access to it.
// Named and indexed dimensions too?


// Worth considering dimensions of a single image to start with.
//  Then, multiple frames could be made out of it with an extra dimension.

// Want to be able to order the dimensions differently?
// eg: x, y, z or z, x, y
//  be able to copy over the data to a different indexing system.

// want to be able to add the frames later...
//  so that would treat 'frame' as the most significant dimension.



// The dimensions array
//  Each dimension needs a few different pieces of information.
// start, length, cumulative total of previous lengths from left, cumulative total of previous lengths from right

// Need to be clear about which cumulative totals are used for what.

// May be worth making a 5(frame) by 10 by 10 by 3 (colors)


// But the simple 2x2 case is also worth getting right to understand it best in a very simple form.


/*

Dimension           Start     Length     Multiplier1    (Multiplier2)
            0           0       2           1               2
            1           0       2           2               1
*/

// Multiplier1 makes sense, its the cumulative totals. 
//  Want to focus on the index calculatons, optimizing them, and then using them for fast operations on the data which has been correctly aligned.




// Named dimensions would be useful too.
//  Especially when outputting, can make the console output neatly labled (in some cases)
//  In many use cases the results would be too large to log to the console.

// Will be worth making a 10x10 or even 100x100 drawing.
//  Want the right mathematical abstractions, then drawing operations will make use of that level.

// Try an antialiased red circle on white background (like Japanese flag)
//  Would then require the color components too.

// 2x2x3 would also be a useful start.
// May actually be 3x2x2 because the pixel is the least significant component???

//  Or the pixel (color) is the most inner component?
//   I think it belongs on the left in the setup we have so far.
//   Would make more sense as (x, y, color_component) as that's how it gets expressed in code most intuitively and is more standard/

// Try ordering in reverse priority order:
//  color, x, y
//   makes sense that way at least.
//   Maybe have a dimensions reordering abstraction.



















class Simple_Tensor_Shape extends Tensor_Shape {
    constructor(spec) {
        super(spec);
        // List of dimensions.
        // Representing the dimensions 
        // number of dimensions

        // allocate each dimension as space in the overall dimensions array.
        //  Don't store an array of dimensions, even if given as params or as a result.

        // Constructor where it's given the dimensions.
        
        // Add dimension
        // Will / may need to reallocate.

        // Spec as an array of dimensions?
        //  Array of arrays?

        // Maybe give it multiple dimension objects?
        // (dim1, dim2 etc...)




        // Check if the arguemts are all dimension objects.

        const a = arguments;
        console.log('Simple_Tensor_Shape a.length', a.length);


        let significance = RTL_SIGNIFICANCE;

        let num_supported_dimensions = 8;
        let num_dimensions = 0;

        let ta_dimensions = new Int32Array(num_supported_dimensions * 3);

        if (a.length === 0) {
            // No options, no dimensions specified.
        } else if (a.length === 1) {
            // spec object?
            // Single dimension object?

            console.log('a[0]', a[0]);
            if (is_array(a[0])) {
                const arr = a[0];
                if (arr.length <= num_supported_dimensions) {
                    num_dimensions = arr.length;
                    let idx_write = 0;
                    let cum_dim = 1;

                    let dimension_length;

                    for (let c = 0; c < num_dimensions; c++) {
                        console.log('arr[c]', arr[c]);
                        //ta_dimensions[c * 2]


                        ta_dimensions[idx_write++] = 0;
                        dimension_length = ta_dimensions[idx_write++] = arr[c];




                        ta_dimensions[idx_write++] = cum_dim;
                        cum_dim = cum_dim * arr[c];
                        // Will need to go the opposite way in order of significance.



                        //if (c === 0) {
                        //    ta_dimensions[idx_write++] = dimension_length;
                        //} else {

                        //    ta_dimensions[idx_write] = ta_dimensions[(idx_write++) - 3] * dimension_length;

                            //ta_dimensions[idx_write] = ta_dimensions[(idx_write) - 3] * ta_dimensions[idx_write++]
                        //}

                    }
                } else {
                    throw 'Maximum of ' + num_supported_dimensions + ' supported dimensions';
                }
            }
            // Could be an array of the dimensions.
            // Then will get the number of dimensions from the length of the array
        } else {
            // Multiple dimension objects?
        }
        // Inner functions instead?
        //  Faster or not? Coding style better or worse?
        // Inner functions can use values local to here. Useful.
        
         // 2 items in the array per dimension - start and length. Should assume that the 'end' value is fast to calculate.
        // Dimension name too?
        //  Maybe not in the shape itself. A string of unknown size makes the memory less predictable.
        //  An annotated dimension may be of use though.
        this.add_dimension = (int_start, int_length) => {
            // Say 'length', not 'size'. Length is more clearly 1D.
            throw 'NYI';
            /*

            if (num_dimensions < num_supported_dimensions) {
                ta_dimensions[num_dimensions * 2] = int_start;
                ta_dimensions[num_dimensions * 2 + 1] = int_length;
                num_dimensions++;
            } else {
                throw 'NYI';
            }
            */
        }
        // a getter for 'dimensions'.

        // and a function to get the size.

        //prop(this, 'size', (e_change) => {
        //    console.log('prop size e_change', e_change);
        //});

        //prop(this, 'shape', (e_change) => {
        //    console.log('prop shape e_change', e_change);
        //});

        // dimensions property...
        //  as a read-only value?

        //  at least to start with...

        //prop(this, 'dimensions', x => x, x => x);

        // Dimension_Pairs?
        //  Dimension triples...
        //  Dimension triples would include the size per value in that dimension.
        //   Dimension ordering too?
        //   So dimension 0 is the most signigicant one.

        // Eg in a film or animation:

        // 0: frame
        // 1: x   |   may swap?
        // 2: y   |
        // 3: color

        // 0 z frame
        // 1 y
        // 2 x
        // 3 color

        // For the moment, will start with 0 as the most significant

        //  So to advance that, will need a high multiplier.


        // 3a: red
        // 3b: green
        // 3c: blue

        // Each pixel component in 1 byte
        //  So that means the most significant dimension is the first / 0th.
        //  Most significant being the frame.
        //  Then each column (y)
        //   Then the pixel is the frame, row, and 

        // 





        // Subdimensions or inner dimensions.
        // Need the numbers for skipping around to different parts of the tensor.

        Object.defineProperty(this, 'dimensions', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
                console.log('num_dimensions', num_dimensions);
                // 2 items in the ta for each dimension.
                return ta_dimensions.subarray(0, num_dimensions * 3);

            },
            set(newValue) { throw 'NYI'; ta_dimensions = newValue; },
            enumerable: true,
            configurable: true
        });
        // Dimension lengths

        // size or total size property.
        //  or it's volume?
        // https://www.scienceforums.net/topic/65901-2d-area-3d-volume-4d/
        //  some call it hypervolume

        // Dimensions value skip...
        //  How many up or down in the ta to move up or down 1 within that dimension?

        // Need more work on dimension ordering / 2 modes for dimension ordering.
        //  Often want the first dimension to be the most significant one.

        // Seems like much of the work will be about the numerical navigation / reindexing of tensors
        //  or about mapping between spaces. Linear space and tensor space.
        //








        Object.defineProperty(this, 'volume', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
                console.log('get volume - num_dimensions', num_dimensions);
                let res = 1;
                for (let c = 0; c < num_dimensions; c++) {
                    const dimension_length = ta_dimensions[c * 3 + 1];
                    res = res * dimension_length;
                }
                return res;

                // 2 items in the ta for each dimension.
                //return ta_dimensions.subarray(0, num_dimensions * 2);

            },
            //set(newValue) { throw 'NYI'; ta_dimensions = newValue; },
            enumerable: true,
            configurable: true
        });

        //this.

        const dimension_multiplier = (idx_dim) => {
            return ta_dimensions[idx_dim * 3 + 2];
        }

        // function to calculate the index from the position.

        this.idx = (tensor_position) => {
            // Starting at the lowest / highest dimension?
            // And have a size for each dimension and all below it?
            // So a cumulative dimension value?

            // start at the lowest dimension.
            //  the lowest dimension would have a multiplier of 1.

            // 2x2 tensor
            //  dimension 0: a change means a change of 1 in the index
            //  dimension 1: a change means change of 2 in the index.

            // so we use the cumulative multiplier to work out the index.
            //console.log('idx of tensor_position', tensor_position);

            //console.log('tensor_position.ta', tensor_position.ta);
            //console.log('tensor_position.ta.length', tensor_position.ta.length);

            // go through the dimensions...

            const d = this.dimensions;
            const n = d.length / 3;
            //console.log('n', n);

            const ta = tensor_position.ta;
            const tal = ta.length;
            let res = 0;
            for (let c = 0; c < tal; c++) {
                const i = ta[c];
                const component = i * dimension_multiplier(c);
                res += component;
            }
            return res;
            // then for each of the idx positions, use the cumulative multiplier... or whatever other value works instead.

            // May be best to make a 10x10 image?

            //      x: 0    1
            //   y:
            //     0   0    1
            //     1   2    3

            // For (0, 1) we use the y multiplier.
            //  That multiplier is cumulative for those before it.

            // Dimension Index Multiplier...?

            // A function for the multiplier of any numbered dimension...



        }






        //this.inspect = () => {
        //    return 'Simple_Tensor_Shape()';
        //}

        // Dimension subarray?
        //  For fastest access?
        
        // Dimensions property - returning an array of dimensions makes sense.

        // .dimension(0) returns the dimension object? get_dimension for the moment I think.

        // Dimensions iterator could be useful.
        // Would be worth looking into JS iterators and some newer functionality.

    }
    [inspect]() {
        // Need the inner part...
        //console.log('this.dimensions', this.dimensions);
        return 'Simple_Tensor_Shape([' + this.dimensions + '])';
    }

    /*
    add_dimension(int_start, int_size) {

    } */

}

const Tensor_Dimensions = Tensor_Shape; // 

module.exports = Simple_Tensor_Shape;