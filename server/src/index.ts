import { config } from "dotenv"
config()

import express, { Request, Response} from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import { getDecksController } from "./controllers/getDecksController"
import { deleteDeckController } from "./controllers/deleteDeckController"
import { createDeckController } from "./controllers/createDeckController"
import { createCardForDeckController } from "./controllers/createCardForDeckController"
import { getDeckController } from "./controllers/getDeckController"
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController"

const PORT = 5000

const app = express()
//for bypassing CORS error
app.use(cors({
    origin: '*'
}))
// Express middleware - allows JSON post requests
app.use(express.json())

app.get("/decks", getDecksController)
app.post("/decks", createDeckController)
app.delete("/decks/:deckId", deleteDeckController)
app.get("/decks/:deckId", getDeckController)
app.post("/decks/:deckId/cards", createCardForDeckController)
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController)

// URL cannot be null
const db = mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        console.log(`listening on port ${PORT}`)
        app.listen(PORT)
    })




