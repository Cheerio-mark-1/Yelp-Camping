
const { places, descriptors } = require('./seeds/seedHelper')


const sample = (array) => array[Math.floor(Math.random() * array.length)];


// console.log(sample(places), sample(descriptors))
const options = [
    'Flats',
    'Village',
    'Canyon',
    'Pond',
    'Group Camp',
    'Horse Camp',
    'Ghost Town',
    'Camp',
    'Dispersed Camp',
    'Backcountry',
    'River',
    'Creek',
    'Creekside',
    'Bay',
    'Spring',
    'Bayshore',
    'Sands',
    'Mule Camp',
    'Hunting Camp',
    'Cliffs',
    'Hollow',
]
options.forEach(name => {
    console.log(`<option value="${name}">`);
});
