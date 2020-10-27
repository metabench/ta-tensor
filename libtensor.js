// File that brings it together.



const tensor_item_types = require('./Tensor_Item_Type/types');

const create_tensor = require('./create_tensor');


const {UInt8} = tensor_item_types;


// Want to create a tensor of the right type, and lets make a tensor of shape (200, 160, 3, 60). 60 frames of a 3 channel image.

// create_tensor(UInt8, 200, 160, 3, 60)

// create_tensor may be better than having to call the specific tensor constructor.

// Painting 3d shapes within the tensor - very much about a good understanding of where those shapes intersect and where 

// Equational shapes - don't want to have to check oach object in each of the tensor spaces.
//  Better to have the means to iterate / move through the space in the shape to match it / record it's in that place.
//   Various algorithms for going through the shape to be placed, and then noting it's within the coordinate space of the tensor.
//    Could line it up with the target tensor, and then iterate through a 'virtual tensor'? for the shape - or have an actual tensor object that represents the shape within tensor space.
//     Then copy it over. Likely to be able to use a really fast copy algorithm that uses the right jumps in the right places.


// Copy shape from one tensor to another.
//  Seems like this will be useful when composing shapes.
//  Shape gets rendered to its own tensor, and then copied into place.
//   How about using a virtual tensor? Direct rendering of the shape to the tensor space?

// Commands for shape rendering / composition within the tensor space.

// Iterative mechanisms for placing shapes within tensors.
//  Funcions that will iterate through spaces in a theoretical nD shape.

// Defining ND tensor shapes (including on/off maps) 
//  Efficient binary representation of tensor filling maps.

// Need some of the lower level things working nice and quickly.
//  Quick ways of representing which points in a tensor are on/off.
//   Storing that in an object, efficiently packed.
//    Then could it be packed in a compressed way that is also very efficient to read?


// Defining the tensor object itself. (200, 160, 3, 60) will be fine for a 1 second 60fps 200x160 piece of CGI.
//  Will be interesting to have some 3D shapes within this tensor that get shown as 2D slices.

// 3D shape object?
//  Functionally defined shapes.
//   Using an accelerated kernel to render a functional shape into 3D or ND space.

// Will experiment with rendering much smaller objects within this tensor shape, get the maths and performance working nicely on a smaller scale.



// Before creating the Tensor object will create the TensorShape object.
//  This will be used to determine how much space needs to be allocated for the Tensor.





















// Will do some work on the 4D video tensor.
//  Optimizing a 4D tensor for video processing / creation of video or animation content.









/*
    t = create_tensor(UInt8, 200, 160, 3, 60);

    t.

*/