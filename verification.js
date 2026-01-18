
const Tensor = require('./tensor');

const t = new Tensor({ shape: [2, 2] }, 'Uint8');
t.set([0, 0], 1);
t.set([0, 1], 2);
t.set([1, 0], 3);
t.set([1, 1], 4);

console.log('--- 2D Tensor ---');
console.log(t.toString());


const t3 = new Tensor({ shape: [2, 2, 2] }, 'Uint8');
t3.set([0, 0, 0], 1);
t3.set([1, 1, 1], 9);
console.log('--- 3D Tensor ---');
console.log(t3.toString());
