
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

class Tensor_Shape {
    constructor(arr_shape) {
        
        let ta;

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

        
        const each_pos = cb => {
            //const pos = new 
        }




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
