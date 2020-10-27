const Tensor = require('../Tensor');
const Simple_Tensor_Shape = Tensor.Simple_Shape;
const {each} = require('lang-mini');
const Tensor_Position = require('../Tensor_Position/Tensor_Position');

const simple_tests = {
    /*
    '2x2_matrix': async () => {
        const tshape = new Simple_Tensor_Shape([2, 2]);
        console.log('tshape', tshape);
        console.log('tshape ' + tshape);
        const t = new Tensor(tshape, 'UInt8');
        console.log('t', t);

        console.log('t.shape', t.shape);
        console.log('t.shape ' + t.shape);
        console.log('t.shape.volume', t.shape.volume);
        console.log('t.volume', t.volume);
        // Tensor_Coordinates class.
        //  Could have its own shape object, or use a shape object from another Tensor. 

        // Should return the shape object.

        // tensor.shape.dimensions[1]...?

        // t.set(x, y, value);
        // t.set([x, y], value);

        pos = new Tensor_Position([1, 1]);
        console.log('pos', pos);

        // Then we find the index of that position within a tensor.

        const idx_pos = t.shape.idx(pos);
        console.log('idx_pos', idx_pos);

        // t.shape should be a Tensor_Shape object.

        t.set(pos, 60);
        console.log('t.ta', t.ta);

        // Setting of individual position value works :)
        return t;
    },
    */

    // 3x10x10

    /*

    '3x10x10': async () => {
        const tshape = new Simple_Tensor_Shape([3, 10, 10]);
        //  Could make a small antialiased Japanese flag.
        const t = new Tensor(tshape, 'UInt8');
        console.log('t.volume', t.volume);

        pos = new Tensor_Position([0, 4, 4]);
        // 0 being for the red part...?

        //  But the color of the pixel - should that really be on the left?
        //   It is the least significant part (I think) and gets used as the multiplier.
        //   Consider different ways to access the dimensions if they really should be ordered by significance.
        //   Maybe there will be other orders too.

        // Consider dimensions together.
        //  Standards such as 2D, 3D, 4D.
        //   3D may well be 2D with an added time dimension. Physical equivalent to 2d papers in a stack.

        // 4D would be a 3D (in the convential meaning) scene that has an added

        t.set(pos, 255);


        // color, x, y

        pos.move([0, 1, 0]);
        t.set(pos, 255);
        pos.move([0, -1, 1]);
        t.set(pos, 255);
        pos.move([0, 1, 0]);
        t.set(pos, 255);

        console.log('t.ta', t.ta);
    },
    */

   '3x5x5': async () => {
        const tshape = new Simple_Tensor_Shape([3, 5, 5]);
        //  Could make a small antialiased Japanese flag.
        const t = new Tensor(tshape, 'UInt8');
        console.log('t.volume', t.volume);

        pos = new Tensor_Position([0, 2, 2]);
        // 0 being for the red part...?

        //  But the color of the pixel - should that really be on the left?
        //   It is the least significant part (I think) and gets used as the multiplier.
        //   Consider different ways to access the dimensions if they really should be ordered by significance.
        //   Maybe there will be other orders too.

        // Consider dimensions together.
        //  Standards such as 2D, 3D, 4D.
        //   3D may well be 2D with an added time dimension. Physical equivalent to 2d papers in a stack.

        // 4D would be a 3D (in the convential meaning) scene that has an added

        t.set(pos, 255);


        // color, x, y

        pos.move([0, 1, 0]);
        t.set(pos, 255);
        pos.move([0, -1, 1]);
        t.set(pos, 255);
        pos.move([0, 1, 0]);
        t.set(pos, 255);

        console.log('t.ta', t.ta);
    }



    // 3x2x2  (where the 3 is the 3 color components of a pixel)
    
    /*,
    '10x10_matrix': async () => {
        const tshape = new Simple_Tensor_Shape([10, 10]);
        console.log('tshape', tshape);
        console.log('tshape ' + tshape);
        const t = new Tensor(tshape);
        console.log('t', t);
        console.log('t.shape.volume', t.shape.volume);
        console.log('t.volume', t.volume);

        pos = new Tensor_Position([1, 1]);
        console.log('pos', pos);

        // Then we find the index of that position within a tensor.

        const idx_pos = t.shape.idx(pos);
        console.log('idx_pos', idx_pos);


        // And how about 8 bit values within the tensor?
    }
    */
}

const run_tests = () => {

    each(simple_tests, async(fn, name) => {

        console.log('name', name);

        const tres = await fn();
        console.log('tres', tres);


    })
}

if (require.main === module) {
    
    run_tests();


}