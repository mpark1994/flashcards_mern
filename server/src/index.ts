import express, { Request, Response} from "express"
import mongoose from 'mongoose'

import Deck from "./models/Deck"

const PORT = 5000

const app = express()
// Express middleware - allows JSON post requests
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

app.post("/decks", async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

const db = mongoose.connect('mongodb+srv://flashcard:o3qzijfco0mm2M5O@cluster0.uqfnjcf.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log(`listening on port ${PORT}`)
        app.listen(PORT)
    })




