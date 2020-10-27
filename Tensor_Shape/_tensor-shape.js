/*
    // An array of positive integers
    // 32 bit seems best generally

    // However, some shapes could be expressed with smaller ta sizes.
    //  Many convolution mask shapes would be expressable with Uint8 or Int8
    // eg [5, 5].

    // Then the index offsets generated would generally either be Int16 or Int32

    // Want to be able to find the tai16 index offsets for a shape as it moves within a tensor (with a specified shape).



*/

// Should by default use 16 bit.

// Then be able to generate pixel offset tensors. Think it's a 4d tensor, but I'm not sure.
//  Maybe here use some direct typed arrays. Don't have the sizing mechanism reliant on Tensor. Possibly.

// Maybe keep a relatively simple API.
//  Seems like it's best to make this interact with Tensor. Use it in some cases.
//   When we make the offset positions tensor.
//    Then from that we create the index offset tensor or typed array from the offset positions tensor.
//     Is it possible to skip that mid-point process of creating that tensor?
//      We could do a loop iteration through the dimensions.
//      Find the centre point. Then use that centre point to make some of them negative offsets.
//      

// Producing a typed array of index offsets looks like one of the ways to get convolutions running really quickly within tensors.

//  Make sure that Tensor_Shape can represent the shapes of tensors (easy) as well as calculate the offsets within 

// A convolution or offset list could be in more than 2 dimensions.

// Possibly do the direction offsets with some longer tensor calculations.
//  Building a tensor out of the shapes looks sensible. A way to getthis running quite soon.

// Offset_from_origin_vectors
//  Same shape as the original
//  And the array just has its numbers at its positions
//   (therefore does not need to exist)

//  So it just iterates through the indexes

// How can it loop through all the x, y, z etc positions at once?
//  Code in js would need the for loop.

// each_pos seems like it would make sense for a tensor
//  or just a shape

// Will itself have a length.

// is it a typed array?

//   should be an array of some sort
//   all positive integers

// Need to work on this to get the offset positions of the shape
//  Then want to get pixel offsets when applied to a specific tensor as a list.



// Get centered positions offsets from shape.
//  Needs to go every point in the shape getting its position.
//   Needs to make a tensor in each location... rank 1 tensor
//   So each position needs to have a vector corresponding to it.
//    Vector of length rank
//     Some iterations would provide the tensor at that position.

// In some cases could use a view of the very same array.

// Really, it's worth providing indexes at the rank
//  rank_item_size
//   size at particular rank
//   this would be used to iterate pixels.

// Create an offsets tensor
//  The offsets tensor will be used to find the positions in the convolution.
//  It means we can iterate the pixel index, then apply all of the offsets in a list.
//  Then from the offsets tensor, we can create an index offset tensor, applied to a specific tensor shape.

// Rapid iteration for an image convolution being a short term goal.
// Rapid movement of pixel window.

// Shape to offset tensor
//  Shape + another dimension of length shape.length

// get_offsets_tensor

// Or Tensor requiring this?

// Each Tensor has a shape?
//  Probably best to have a base class for the shape.
//   Could have other shaped tensors - 4dsphere?
//   Want to be able to create and specify more complex tensor shapes.

// Sparse tensors?

// Tensors containing tensors?
//  May be a way of doing some more complex shapes?
//   It array of simpler tensor shapes.



// Contiguous tensor regions.
// Sparse tensors

// The tensor's surface planes...?
// Defining a tensor shape through an equation?

// Simple_Tensor_Shape
//  Just an array of the range of each dimension.
//   Minimum and maximum in each dimension.




// Start_Offset
// Integer_Distance? Vector_1D? Integer_Vector_1D?
//  Or could just use integers of course.

// Attaching multiple OO objects to a single TA?












//const Tensor = require('../tensor');



class Tensor_Shape {
    constructor(arr_shape) {

        let ta;

        // then a limits ta




        if (Array.isArray(arr_shape)) {
            ta = new Uint32Array(arr_shape)
        } else {

            // if it's just a number, then that will be the length of the uint32 array


            if (typeof arr_shape === 'number') {
                ta = new Uint32Array(arr_shape)
            } else {
                ta = arr_shape;
            }
            // presuming typed array
        }




        const rank = ta.length;
        const ta_limits = new Uint32Array(rank);

        for (let c = 0; c < rank; c++) {
            ta_limits[c] = ta[c] - 1;
        }

        let dimension_factors = new Uint32Array(rank + 1);
        dimension_factors[0] = 1;

        // Need to create the dimension factors in the opposite direction.
        //  The right-most part has got the smallest result in the dimensions.
        let tsize = 1;
        // reversed shape?
        const rshape = ta.slice().reverse();

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


        // Not sure we should return a Tensor from Tensor_Shape.

        /*

        const get_offsets_tensor = () => {

            // Not so sure that's how the offset tensor will work.
            //  Actually it seems right...


            let ta_new_shape = new Uint32Array(rank + 1);
            for (let c = 0; c < rank; c++) {
                ta_new_shape[c] = ta[c];
            }
            ta_new_shape[rank] = rank;

            const ta_rank_centering_offsets = new Int32Array(rank);
            for (let c = 0; c < rank; c++) {
                ta_rank_centering_offsets[c] = -1 * Math.floor(ta[c] / 2);
            }

            //console.log('ta_rank_centering_offsets', ta_rank_centering_offsets);


            // 
            //console.log('ta_new_shape', ta_new_shape);
            // then make a new tensor with that shape.
            // Iterate through the coordinates, writing values to the result tensor.

            // At least we have the fast iterator.
            console.log('Tensor', Tensor);

            const res = new Tensor(ta_new_shape, Int32Array);


            // iterating the positions... it creates a new Typed_Array each time.
            //  how about setting a result tensor?


            // Do need some new versions of functions that return tensors rather than typed arrays?
            //console.log('res', res);

            / *
            res.each_pos(pos => {
                console.log('res pos', pos);

            })
            * /

            // each pos at rank, with its index


            // ranks are 1 indexed
            /// dimensions 0 indexed?
            // try each pos at rank 2

            // could do each

            //res.each_pos_idx((pos, index) => {
            //console.log('res pos', [pos, index]);

            //})

            // zero dimensioned ranks.
            const resta = res.ta;
            res.each_pos_idx_at_or_below_rank(2, (pos, index) => {
                //console.log('2) res pos', [pos, index]);


                // then write the pos to the tensor
                // and subtract half the rank size from each position?

                // subtract the centering offsets.

                / *
                const write_ta = (idx, p_ta) => {
                const max = idx + p_ta.length;
                let i = 0;
                for (let c = idx; c < max; c++) {
                    ta[c] = p_ta[i++];
                }
                return this;
            }
                * /

                const max = index + pos.length;
                let i = 0;
                //console.log('max', max);
                for (let c = index; c < max; c++) {
                    resta[c] = pos[i] + ta_rank_centering_offsets[i++];
                }

                //res.write_ta(index, pos);
            });


            //console.log('res.ta', res.ta);

            return res;


            // then iterate through the positions.
            //  and write into the result tensor the position values.

            // tensor.slice
            //  should work like array.slice with rank 1
            //  then with higher rank tensors?
            // slice from position within tensor.
            //  a slice between two positions in the tensor, expressed by different vectors.
            // make like tf.slice

            //   begin is a tensor position (vector)
            // .slice(begin, size)
            //  size is a Tensor_Shape.
            // Tensor_Shape possibly itself should be a Tensor of rank 1.





        }

        this.get_offsets_tensor = get_offsets_tensor;

        */


        // Then with an offsets tensor and another shape, we should be able to create an offsets ta
        //  It applies that offsets tensor to the shape of an already existing tensor.
        //  Then it calculates a single position for each item in the offsets tensor.

        // shape.get_offset_tensor_index_offset_ta
        //  so we give it the offsets as a tensor.
        //  the offsets of a convolution are a 3D tensor.







        // Then a loop for each pixel in the shape?

        // to_tensor?
        //  once the shape has been defined, create an actual tensor from that shape?

        // This could also use the dimension factors.
        // loop through each dimension
        //  for each dimension, loop through each lower dimension
        //   loop through the indexes in each dimension

        // Does look like we need another algorithm and boilerplate coded to loop through the values in a Tensor_Size.

        // Could be recursive

        // But worth making non-recursive, multi for loop too.

        // ???
        // loop through dimensions
        //  loop through inner dimensions
        //   loop from 0 to dimension size


        // incrementors
        //  comparison to the max
        //  next() function or code
        //  can tell when complete
        //  simple arithmatic
        //  efficient algorithm. 
        //   advances a typed array position (vector)
        //   advances an index

        // loop to see if all positions are under the max...?
        //  maybe, but a simpler advincing algo may be better
        //  start from right, increment by 1
        //   test if it brings to max, if so, bring to 0, advance previous
        //   seems like a sensible advance() or next() function.

        // next could even be undefined when there is none.

        // Could run that each_pos over a tensor, or the inner loop.

        const each_pos = cb => {
            let pos = new Uint32Array(rank);
            //console.log('1) pos', pos);
            //throw 'stop';
            // they are all 0 to start with.
            let done = false;
            let d = rank - 1;
            const max_d = d;

            /*
            const incr = (pos) => {
                d = rank - 1;

                // find the first from right which is not at maximim
                //console.log('pos[d]', pos[d]);
                //console.log('ta[d]', ta[d]);
                while (pos[d] === ta_limits[d] && d > -1) {
                    d--;
                }
                //console.log('d', d);
                if (d === -1) {
                    done = true;
                } else {
                    pos[d]++;
                    if (d < max_d) {
                        //d++;
                        while (++d < rank) {
                            pos[d] = 0;
                            //d++;
                        }
                    }
                }
                return pos;
            }
            */


            // The loop without the callback fn is the quickest way to iterate.

            // It should be used as a pattern.

            // Also want callbacks with the value
            // Callbacks with the index

            // A lot of different optimized iteration functions would be useful.
            //  They will provide different callbacks

            // each_pos
            // each_index
            // each_value
            // each_index_pos_value
            // each_index_value
            // each_value_index
            // each_value_pos
            // each_value_pos_index
            // each_value_index_pos


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

        const each_pos_index = cb => {
            let index = 0;
            let pos = new Uint32Array(rank);
            //console.log('1) pos', pos);
            //throw 'stop';
            // they are all 0 to start with.
            let done = false;
            let d = rank - 1;
            const max_d = d;
            while (!done) {
                // The callback takes a not all that much time when it doesn't do much.
                cb(pos, index++);
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


        const each_index_pos = cb => {
            let index = 0;
            let pos = new Uint32Array(rank);
            //console.log('1) pos', pos);
            //throw 'stop';
            // they are all 0 to start with.
            let done = false;
            let d = rank - 1;
            const max_d = d;
            while (!done) {
                // The callback takes a not all that much time when it doesn't do much.
                cb(index++, pos);
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

        this.each_index_pos = each_index_pos;

        // each index is like a for loop.
        //  very simple function

        this.each_pos = each_pos;

        const calc_size = () => {
            let res = 1;
            const l = ta.length;
            for (let c = 0; c < l; c++) {
                res *= ta[c];
            }
            return res;
        }


        const each_index = (cb) => {

            // calculate the size or be able to get it as a property.

            const l = calc_size();

            for (let c = 0; c < l; c++) {
                cb(c);
            }
            //let i = 0;

        }

        this.each_index = each_index;

        // get offsets_tensor_indexes
        //  give that to a tensor, and it gets the indexes of the offsets






        const offsets_tensor_to_index_offsets = ot => {
            // go through the items in the offsets tensor.
            //console.log('ot.shape', ot.shape);
            //  The last rank contains the offsets.
            // calculate the rank multiplier up to the one before last.
            const ot_s_l = ot.shape.length;
            //console.log('ot_s_l', ot_s_l);
            const last_i = ot_s_l - 1;
            // then iterate through at 2, getting the tas.
            //  can use temporary ta vectors.
            // the number of results... ot.size
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
        this.offsets_tensor_to_index_offsets = offsets_tensor_to_index_offsets;



        /*
        
        Not here
        */
        // each_value

        /*
        const each_value = cb => {
            const l = calc_size();

            for (let c = 0; c < l; c++) {
                cb(c);
            }
        }
        */




        // loop through dimensions
        //  loop through outer dimensions
        //   loop from 0 to dimension size

        // repeated dimension loop
        //  a system where we process the next dimension

        // process the next pixel and calculate the index

        // using index recalculation definiely looks easiest to implement now.
        //  a loop is in that calculation though.





        // loop through all indexes, running the conversion function.

    }
}



if (require.main === module) {
    //const Tensor = require('ta-tensor');

    //const ts = new Tensor_Shape([5, 5, 3]);
    //const ts = new Tensor_Shape([1000, 1000, 3]);
    const ts = new Tensor_Shape([3, 3]);

    let c = 0;
    const mss = Date.now();
    ts.each_pos(pos => {
        //console.log('pos', pos);
        //c++;

    });
    const mst = Date.now() - mss;
    console.log('mst', mst);
    console.log('c', c);

    const ot = ts.get_offsets_tensor();
    console.log('ot.ta', ot.ta + '');
    console.log('ot', ot + '');
    console.log('ot.ta', ot.ta + '');


    // then get the offsets as a different 

    // could just do this on the tensor shape

    const larger_shape = new Tensor_Shape([1000, 1000, 3]);
    // then with the larger shape we can get the position offsets from the offsets tensor

    const ta_index_offsets = larger_shape.offsets_tensor_to_index_offsets(ot);
    console.log('ta_index_offsets', ta_index_offsets);

    // Then we can use this for a convolution.





    /*


    const bigt = new Tensor([1000, 1000, 3]);
    // then work out the offsets index list

    console.log('bigt.shape', bigt.shape);

    */

    // iterate over the offsets tensor
    //  however, iterate over rank 1 or lower

    // Each value / tensor at or below rank.
    //  Here we may need to create a new tensor.
    //  Iterating through values, using the index, seems faster.

    // Getting a tensor at each position could be useful
    //  Getting a temporary tensor could be faster and therefore more useful.

    // Get ta at position
    //  It copies the required length into place.




    //ot.ea


    // hold a shape inside the Tensor as a Tensor_Shape?

    // will be in an offsets index tensor
    // iterate vectors within the last rank


    // want the count of elements within a specific rank.
    //  specified within the shape.


    // A new function to work out the offset positions from offset vectors
    //  Containted in the offsets tensor


    //const position_index_offsets = bigt.get_index_offsets_from_offsets_tensor(ot);

    // Add up the sizes at the various dimensions to compute each index offset.
    //console.log('position_index_offsets', position_index_offsets);


    // Then these index offsets will enable (much) faster convolutions that use direct array access rather than via function call.

    // So for every position index, we can use the index offsets to find the different positions and values for use in a convolution.






    // Want a nicer way of printing the offset (or other tensor)
    //  Could have a tostring.

    // Then 



    /*
    (async () => {

    })();
    */

} else {
    //console.log('required as a module');
}

module.exports = Tensor_Shape;



/*
    for (i_dim = 0; i_dim < rank, i_dim++)

    // Iterate through offsets from previous dimensions?



*/

// [5, 5]
//  loop through them
//  get all positions with the shape, especially with it centered on 0, 0

// But then 

// Would also have a simple way of doing a convolution on 3 channels.

// multiplying together the dimensions