import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDeck } from './api/createDeck'
import { deleteDeck } from './api/deleteDeck'
import { getDecks, TDeck } from './api/getDecks'
import './App.css'

function App() {
  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState('')

  // create deck
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    const deck = await createDeck(title)
    setDecks([...decks, deck])
    setTitle("")
  }

  // delete deck
  async function handleDelete(deckId: string) {
    await deleteDeck(deckId)
    setDecks(decks.filter(deck => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks()
      setDecks(newDecks)
    }
    fetchDecks()
  }, [])

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDelete(deck._id)}>X</button>
            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreate}>
        <label htmlFor="deck-title">Deck Title</label>
        <input 
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
        <button>Create Deck</button>
      </form>
    </div>
  )
}

export default App
