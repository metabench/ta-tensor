/*
    A tensor that's specifically designed to process images. Though it uses / is based on Tensor, it's for processing images.
    Some image processing routines should be a lot faster using the tensor maths.
    Convolutions will be much faster through the use of offset TAs.




*/
const Tensor = require('./_tensor');
class Image_Tensor extends Tensor {
    constructor(spec) {

        // x, y, bytes per pixel

        // Load function when it's on the server?
        //  Load it with jpg, png etc
        super(spec);
        


    }
}

if (require.main === module) {
    //const Tensor = require('ta-tensor');

    // jsgui3 images could be rewritten in a way where it just loads the buffers?
    

} else {
    //console.log('required as a module');
}




module.exports = Image_Tensor;