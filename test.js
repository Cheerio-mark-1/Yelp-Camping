
const { places, descriptors } = require('./seeds/seedHelper')


const sample = (array) => array[Math.floor(Math.random() * array.length)];


console.log(sample(places), sample(descriptors))
