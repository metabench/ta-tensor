const tensor_item_types = require('./Tensor_Item_Type/types');

const {Tensor_Item_Type, UInt8} = tensor_item_types;

const create_tensor = function() {
    const a = arguments;
    const l = a.length;

    // Dimensions starting at 0.
    //  0 to n dimension expression of dimension size.

    // Will prepare the dimensions.

    //  (tensor item type, the rest are all integers...)
    //   means that area goes from 0 to that integer number.

    // function signature checking may be the best way here. Need to have fast code, reasonably concise too.

    //  Check for (Tensor_Item_Type, sequence of integers...)

    const params_check_type_int_maxes = () => {
        if (l >= 2) {
            if (a[0] instanceof Tensor_Item_Type) {
                // Then check the rest of these, must be int numbers.

                for (let c = 1; c < l; c++) {
                    if (typeof a[1] === 'number') {
                        if (a[1] === floor(a[1])) {

                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }



            } else {
                return false;
            }
        } else {
            return false;
        }
        return true;
    }

    if (params_check_type_int_maxes()) {
        console.log('has (type, ints... start params)');
    } else {

    }



    // [item data type, dimension1, dimension2, ...]
}



module.exports = create_tensor;