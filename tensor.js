const Tensor_Shape = require('./Tensor_Shape/Tensor_Shape');
const Simple_Tensor_Shape = require('./Tensor_Shape/Simple_Tensor_Shape');

const Tensor_Position = require('./Tensor_Position/Tensor_Position');

// Need the indexing / calculation functions.
//  Go from an nD index to a 1D index and vice versa.

// Worth having the index calculation functions elsewhere.
//  Within the shape?
//  Probably best in its own file.
//  Consult an index? A nexus? Indexing Nexus? Index Nexus makes sense.
//   Tensor_Index_Nexus
//    has the shape
//    uses the shape to calculate:
//                                 position of [a, b, c, d, e] type coords within the 1D coord space
//                                 position of 1D index within the nD coord space.

// Will do calculations to get indexes.
//  For some operations that go over a range of tensor values, maybe using Tensor_Iteration, the ranges will be precalculated - dont want to calculate indexes for each operation.
//   Will know what pointers, ranges and jumps to use.

// Will work on the most efficient ways to iterate through shapes, and shapes within shapes.
//  Be able to do these iteration calculations without actual data - check and test it separately.

// Tensor-Index-Nexus
//  nexus meaning it goes from 1 coord system to another. 1D to nD.
//  nD to nD mapping will be a 'manifold nexus'.
//   It could go via 1D? Maybe would make a lot of sense there.

// Has the shape
// Has the ta
// Has access to the code that carries out the mapping between them.

//  Different parts will b substitutable, as and when implementation improvements get made.
//   Consider caching of dimension locations?
//   Or they will be quick to calculate, but then with the right calculations, it will be quick to iterate through them.
//    Quick iteration of one space mapped within another space.

// Will investigate a variety of different modules to see how well they could fit in.

// A 'Sphere' shape module could be of use. As could other rounded shapes. Different ways of storing these. Would be useful for different things.
//  Will explore how fast different implementations / versions will work.
//   Consider multi-threading for decompression / calculation.

// Much of this will be used, at first at least, for rendering voxels within a 3D space (or 4D when considering colour channel).
//  Want the functions to be easy to use / call.
//   Internally, on larger objects, it may have to do many operations. Have a framework around that that knows how many small operations a larger operation would need.

// Consider a 1000x1000x1000 cube. That's a billion. Could consider time estimation for the runnings of this library.
//  Will know about and calculate algorithm running times regarding complexity before the algorithms get run.
//   This will be a lot faster with (much) smaller shapes.
//   100x100x100 (x3) represents (rgb color within) a 100x100 square, shown for 1.66 seconds.
//    That's 3 million. This is the kind of size it would be good to start with.
//     Will be able to get nice / recognisable effects.
//      Would be able to experiment with putting together replication of existing video, using different algorithm.
//       A GA method to create a video out of adding 3D RGB shapes (3D filled polygons) to the tensor would be cool.
//        Can adjust, add and remove these 3D filled polygons.
//        With limited numbers of these 3D filled polygons, they could create a clear and efficient cartoon style that represents the visual source material, rebuilt out of components algorithmically.

// Parameterised objects that represent moving objects within 2D space, by means of static objects within 3D space.




const {tof} = require('lang-mini');




const UInt8 = 0;
const Int8 = 1;
const UInt16 = 2;
const Int16 = 3;
const UInt32 = 4;
const Int32 = 5;


// Will create the typed array according to what type it internally holds.

// UInt8 will be useful for all sorts of binary data as it's 1 byte.
//  Absractions on top of that will be useful for subsets of that.


// Image processing tools will probably work on an abstraction on top of Tensor.
//  Want compression and decompression to use them.
//   Hope to write it in a concise and fast way. Likely with the right sorts of inner functions getting run on some other abstractions.










class Tensor {
    // or if we give an instance of a typed array instead of a constructor?
    //  could check for the .constructor property


    // Can also have a simpler positions iterator
    //  Carries out an increment operation on a ta of postion vectors.

    // That increment loop will itself also be a useful pattern.
    // (Byte_Tensor?)
    
    constructor(spec, spec2) {
        // The shape
        //  Shape could even be / act as an array of dimensions.

        // Each unit? Each Item?
        console.log('Tensor spec', spec);

        let shape;
        //let ta;
        if (spec instanceof Tensor_Shape) {
            shape = spec;
        } else {
            if (spec.shape) {
                shape = spec.shape; // Check / enforce type?
            }
            //if (spec.ta) {
            //    ta = spec.ta;
            //}
        }
        
        
        

        let ta_type;

        if (spec2) {
            // is it a string?
            //  The string may be a data type.
            if (tof(spec2) === 'string') {
                const lc = spec2.toLowerCase();
                if (lc === 'uint8') ta_type = UInt8;
                if (lc === 'int8') ta_type = Int8;
                if (lc === 'uint16') ta_type = UInt16;
                if (lc === 'int16') ta_type = Int16;
            }

        } else {
            ta_type = UInt8;
        }

        const starting_volume = shape.volume;
        //console.log('starting_volume', starting_volume);

        const ta = (() => {
            if (ta_type === UInt8) {
                return new Uint8Array(starting_volume);
            }
        })();

        //console.log('ta', ta);






        // Needs its ta.
        //  Other implementations would need direct access to this ta.
        //  Provide abstractions as well as direct access to the ta.


        
        

        


        // Then need a shape property...


        Object.defineProperty(this, 'shape', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
                //console.log('num_dimensions', num_dimensions);
                // 2 items in the ta for each dimension.
                return shape;

            },
            set(newValue) { throw 'NYI';},
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(this, 'volume', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
               return shape.volume;

                // 2 items in the ta for each dimension.
                //return ta_dimensions.subarray(0, num_dimensions * 2);

            },
            //set(newValue) { throw 'NYI'; ta_dimensions = newValue; },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(this, 'ta', {
            // Using shorthand method names (ES2015 feature).
            // This is equivalent to:
            // get: function() { return bValue; },
            // set: function(newValue) { bValue = newValue; },
            get() { 
               return ta;

                // 2 items in the ta for each dimension.
                //return ta_dimensions.subarray(0, num_dimensions * 2);

            },
            //set(newValue) { throw 'NYI'; ta_dimensions = newValue; },
            enumerable: true,
            configurable: true
        });


        this.set = (pos, value) => {
            if (pos instanceof Tensor_Position) {
                const idx = shape.idx(pos);
                ta[idx] = value;
            }
        }
        this.get = pos => {
            if (pos instanceof Tensor_Position) {
                const idx = shape.idx(pos);
                return ta[idx];
            }
        }


        // spec.item_type?
        //  as string for example.


        // type - type of item at each tensor position.
        // Tensor item definition.

        // Data will indeed be stored in a typed array.
        //  But then when there are 'Car' class items in a tensor, it would need to use a reference number, an integer ID.

        // typed array type being lower level...?



        // let ta;

        // Different potential typed array types given?





        // The data type in each position - ie which typed array type to use.



    }

}

Tensor.Shape = Tensor_Shape;
Tensor.Simple_Shape = Simple_Tensor_Shape;

module.exports = Tensor;