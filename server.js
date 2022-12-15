const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const Movie = require('./models/movie')
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
mongoose.set('strictQuery', true);

const db = "mongodb://localhost:27017/movies"
mongoose.connect(db).then(() => {
    console.log('connection established');
})


app.get('/', async(req, res) => {
    const movies = await Movie.find()
    res.render('index',{movies});
})

app.get('/new', (req, res) => {
    res.render('new')
})

app.get('/:id', async(req, res) => {
    const movies = await Movie.findById(req.params.id)
    res.render('show',{movies})
})

app.post('/', async (req, res) => {
    let movieData = new Movie({
        title: req.body.title,
        rating: req.body.rating
    })
    try {
        movieData = await movieData.save()
        res.redirect('/')
    } catch (err) {
        res.render('new',{movieData})
    }
})

app.listen(port, () => {
    console.log('listening on port', port);
})