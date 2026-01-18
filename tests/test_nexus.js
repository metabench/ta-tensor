
const Tensor_Index_Nexus = require('../Tensor_Index_Nexus/Tensor_Index_Nexus');
//const Simple_Tensor_Shape = require('../Tensor_Shape/Simple_Tensor_Shape');
const { tof } = require('lang-mini');

const run_tests = async () => {
    console.log('Testing Tensor_Index_Nexus');

    const test_2d = () => {
        console.log('Test 2D [2, 2]');
        const shape = new Uint32Array([2, 2]);
        const nexus = new Tensor_Index_Nexus(shape);

        // [0, 0] -> 0
        // [0, 1] -> 1
        // [1, 0] -> 2
        // [1, 1] -> 3

        const check = (pos, expected_i) => {
            const i = nexus.pos_to_i(pos);
            console.log(`pos [${pos}] -> i ${i} (expected ${expected_i})`);
            if (i !== expected_i) throw new Error(`Mismatch for [${pos}]`);

            const pos_back = nexus.i_to_pos(i);
            console.log(`i ${i} -> pos [${pos_back}]`);
            if (pos_back[0] !== pos[0] || pos_back[1] !== pos[1]) throw new Error(`Mismatch back for ${i}`);

        }

        check([0, 0], 0);
        check([0, 1], 1);
        check([1, 0], 2);
        check([1, 1], 3);
    }

    const test_3d = () => {
        console.log('Test 3D [3, 3, 3]');
        // 3x3x3 = 27
        const shape = new Uint32Array([3, 3, 3]);
        const nexus = new Tensor_Index_Nexus(shape);

        // 0,0,0 -> 0
        // 0,0,1 -> 1
        // 0,0,2 -> 2
        // 0,1,0 -> 3

        const check = (pos, expected_i) => {
            const i = nexus.pos_to_i(pos);
            console.log(`pos [${pos}] -> i ${i} (expected ${expected_i})`);
            if (i !== expected_i) throw new Error(`Mismatch for [${pos}] expected ${expected_i} got ${i}`);

            const pos_back = nexus.i_to_pos(i);
            //console.log(`i ${i} -> pos [${pos_back}]`);

            for (let c = 0; c < pos.length; c++) {
                if (pos_back[c] !== pos[c]) {
                    console.log(`Mismatch back for ${i}: expected [${pos}], got [${pos_back}]`);
                    throw new Error(`Mismatch back for ${i}`);
                }
            }

        }

        check([0, 0, 0], 0);
        check([0, 0, 1], 1);
        check([0, 0, 2], 2);
        check([0, 1, 0], 3);

        check([1, 0, 0], 9);
        check([2, 2, 2], 26);


    }

    try {
        test_2d();
        test_3d();
        console.log('All Tensor_Index_Nexus tests passed');
    } catch (e) {
        console.error('Test failed', e);
        process.exit(1);
    }
}

run_tests();
