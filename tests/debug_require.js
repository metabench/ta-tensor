
try {
    console.log('Requiring Tensor_Nexus directly from relative path...');
    const nexus_path = '../Tensor_Index_Nexus/Tensor_Nexus.js';
    const TN = require(nexus_path);
    console.log('Success requiring Tensor_Nexus:', TN);
} catch (e) {
    console.error('Failed to require Tensor_Nexus:', e);
}

try {
    console.log('Requiring Tensor_Index_Nexus...');
    const TIN = require('../Tensor_Index_Nexus/Tensor_Index_Nexus');
    console.log('Success requiring Tensor_Index_Nexus');
} catch (e) {
    console.error('Failed to require Tensor_Index_Nexus:', e);
}
