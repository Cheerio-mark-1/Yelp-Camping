const express = require('express')
const app = express();
const path = require('path')
const { logger } = require('./middleware/logEvents')
const errorLogger = require('./middleware/errorLogger')

const mongoose = require('mongoose')
const Campground = require('./models/comapground');
const methodOverride = require('method-override');
const comapground = require('./models/comapground');
const ejsMate = require("ejs-mate");







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

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(logger)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const grounds = await Campground.find({})
    console.log(`${grounds}`);


    res.render('home')
})
app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campground/index', { campgrounds })
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campground/new')
})


app.post('/campgrounds', async (req, res) => {
    // const { campground } = req.body
    try {
        const campground = new Campground(req.body.campground)
        const response = await campground.save();
        console.log(response);



        res.status(200).redirect(`/campgrounds/${response._id}`)
    } catch (error) {
        console.log(error?.message);

    }
})

app.get('/campgrounds/:id', async (req, res) => {
    try {

        const campground = await Campground.findById(req.params.id)
        if (!campground) {
            res.status(401).json({ message: "user not found with that id" })
        }
        res.render('campground/show', { campground })

    } catch (error) {
        res.status(400).json({ message: error })

    }
})

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campground/edit', { campground })
})

app.put('/campgrounds/:id', async (req, res) => {
    try {
        const campground = await Campground.findById(req.params.id)
        if (!campground) {
            res.status(401).json({ message: 'user not found' })
        }

        const { title, location } = req.body.campground;
        if (!title || !location) {
            return res.status(401).json({ message: 'content not found' })
        }
        // const response = await Campground.findByIdAndUpdate(req.params.id, {
        //     title: title.trim(),
        //     location: location.trim()
        // }, {
        //     new: true
        // })

        // await campground.updateOne({
        //     title: title.trim(),
        //     location: location.trim()
        // });
        // const response = await comapground.save();
        const response = await Campground.findByIdAndUpdate(req.params.id, req.body.campground)

        await response.save()

        res.redirect(`/campgrounds/${req.params.id}`)

        // res.status(200).json({ message: "hello" })

    } catch (error) {
        res.status(400).json(error)
    }
})

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params
    console.log(`here in delete method`);

    console.log(id);

    try {
        await Campground.findByIdAndDelete(id);

        res.redirect('/campgrounds')

    } catch (error) {
        res.status(200).json(error)
    }

})


app.use(errorLogger)
app.listen(8000, () => {
    console.log('Serving on port 8000 ')
})