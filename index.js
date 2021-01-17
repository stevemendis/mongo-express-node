
const express = require('express')
const app = express()
const http = require('http').Server(app)
const Joi = require('joi') // Class is returned

app.use(express.json())

const genres = [
    { 'id': 1, 'genre': 'comedy' }
]

app.get('/', (req, res) => {
    res.send('hello world')
})


// Fetching all the genre data
app.get('/api/genre', (req, res) => {
    return res.send(genres)
})

// Fetching a specific genre data
app.get('/api/genre/:id', (req, res) => {
    const genreData = genres.find(data => data.id === parseInt(req.params.id))
    if (!genreData) return res.status(404).send('Data not found')
    return res.send(genreData)
})

app.post('/api/genre', (req, res) => {
    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(result.error.details[0].message)

    const genreData = genres.find(data => data.genre === req.body.genre)
    if (genreData) return res.status(409).send('Data already exists')

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genres)
})

app.put('/api/genre/:id', (req, res) => {
    const genreData = genres.find(data => data.id === parseInt(req.params.id))
    if (!genreData) return res.status(404).send('Data not found')

    const { error } = validateGenre(req.body)
    if (error) return res.status(400).send(result.error.details[0].message)

    genreData.genre = req.body.genre;
    res.send(genres)

})

app.delete('/api/genre/:id', (req, res) => {
    const genreData = genres.find(data => data.id === parseInt(req.params.id))
    if (!genreData) return res.status(404).send('Data not found')

    const index = genres.indexOf(genreData)
    genres.splice(index, 1)
    
    res.send(genres)
})

function validateGenre(genre) {
    const schema = Joi.object({
        genre: Joi.string().min(3).required()
    })
    return result = schema.validate(genre)

}

http.listen(3000, () => {
    console.log('connected to port 3000')
})