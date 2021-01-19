const express = require('express')
const router = express.Router()

const genres = [{
    'id': 1,
    'genre': 'comedy'
}]

// Fetching all the genre data
router.get('/', (req, res) => {
    return res.send(genres)
})

// Fetching a specific genre data
router.get('/:id', (req, res) => {
    const genreData = genres.find(data => data.id === parseInt(req.params.id))
    if (!genreData) return res.status(404).send('Data not found')
    return res.send(genreData)
})

router.post('/', (req, res) => {
    const {
        error
    } = validateGenre(req.body)
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

router.put('/:id', (req, res) => {
    const genreData = genres.find(data => data.id === parseInt(req.params.id))
    if (!genreData) return res.status(404).send('Data not found')

    const {
        error
    } = validateGenre(req.body)
    if (error) return res.status(400).send(result.error.details[0].message)

    genreData.genre = req.body.genre;
    res.send(genres)

})

router.delete('/:id', (req, res) => {
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

module.exports = router