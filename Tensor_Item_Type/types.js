const Tensor_Item_Type = require('./Tensor_Item_Type');
const Numeric_Item_Type = require('./Numeric');
const Object_Item_Type = require('./Object');


const UInt8 = new Numeric_Item_Type();



module.exports = {
    'Tensor_Item_Type': Tensor_Item_Type,
    'UInt8': UInt8
}