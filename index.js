const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/comapground')

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

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


app.get('/', (req, res) => {
    res.render('home')
})
app.get('/campground', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds })

})

app.get('/campground/:id', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campground/show', { campground })

})



app.listen(8000, () => {
    console.log('Serving on port 8000 ')
})