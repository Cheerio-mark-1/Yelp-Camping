const mongoose = require('mongoose')
const Campground = require("../models/comapground")
const cities = require('./cities')
const { places, descriptors } = require("./seedHelper")

async function main() {
    // const connection = await mongoose.connect('mongodb+srv://Provelio:675TQBO98rx7eBVo@provelio.331ajra.mongodb.net/Provelio?retryWrites=true&w=majority',
    const connection = await mongoose.connect('mongodb+srv://Provelio:1LqE89ZrBhLaUxDV@provelio.331ajra.mongodb.net/Forwarders',
        {
            // useUnifiedTopology: true,
            // useNewUrlParser: true,
            // useCreateIndex: true, //make this true
            autoIndex: true, //make this also true
        }
    );
    console.log('Connected Sucesfully ');
    // console.log(connection.connection.host);

}

main().catch(err => console.log(err))

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    try {

        await Campground.deleteMany({});
        console.log('all data deleted successfully')
        for (let index = 0; index < 50; index++) {
            const random100 = Math.floor(Math.random(1000) * 1000);
            const camp = new Campground({
                location: `${cities[random100].city}, ${cities[random100].state}`,
                title: `${sample(descriptors)} ${sample(places)}`
            })
            await camp.save();
        }
        console.log("all data saved successfully")
    } catch (error) {
        console.log('somethign went wront data not saved')

    }


}
seedDb().then(() => {
    mongoose.connection.close();
}).catch(err => {
    console.log(err);

});