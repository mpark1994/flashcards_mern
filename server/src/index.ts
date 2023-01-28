import { config } from "dotenv"
config()

import express, { Request, Response} from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import Deck from "./models/Deck"

const PORT = 5000

const app = express()
//for bypassing CORS error
app.use(cors({
    origin: '*'
}))
// Express middleware - allows JSON post requests
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// Load decks
app.get("/decks", async (req: Request, res: Response) => {
    // Fetch all decks
    const decks = await Deck.find()
    res.json(decks)
})

// Create new deck
app.post("/decks", async (req: Request, res: Response) => {
    const newDeck = new Deck({
        title: req.body.title
    })
    const createdDeck = await newDeck.save()
    res.json(createdDeck)
})

// Delete deck
app.delete("/decks/:deckId", async (req: Request, res: Response) => {
    const deckId = req.params.deckId
    const deck = await Deck.findByIdAndDelete(deckId)
    res.json(deck)
})

// URL cannot be null
const db = mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log(`listening on port ${PORT}`)
        app.listen(PORT)
    })




