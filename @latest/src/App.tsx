
import React, { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId,
  timesTamp: number
  text: string
}

const initial_Items: Item[] = [{
  id: crypto.randomUUID(),
  timesTamp: Date.now(),
  text: 'Videojuegos 🎮'
}, {
  id: crypto.randomUUID(),
  timesTamp: Date.now(),
  text: 'Peliculas 🎬'
}, {
  id: crypto.randomUUID(),
  timesTamp: Date.now(),
  text: 'Series 🍿'
},
  {
    id: crypto.randomUUID(),
    timesTamp: Date.now(),
    text: 'Novelas 👨🏾‍👩🏾‍👧🏾'
  }
]

function App() {
  const [items, setItems] = useState(initial_Items)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const { elements } = event.currentTarget

    const input = elements.namedItem('item')
    const isInput = input instanceof HTMLInputElement 
    if (!isInput || input == null) return

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timesTamp: Date.now()
    }
   
    setItems((prevItems) => {
      return [...prevItems, newItem]
    }) 

    input.value = ""

  }

  const removeItem = (id:ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
    <main>
      <aside>
        <h1>Lista de tareas</h1>
        <h2>añade y elimina</h2>

        <form onSubmit={handleSubmit}>
          <label >
            lista de elementos:
            <input 
            name='item'
            required
            type='text'
            placeholder='tareas 🎮' 
            />
          </label>
          <button>añadir tarea a la lista</button>
        </form>
      </aside>

      <section>
        <h2>elemento a introducir:</h2>
        
          {
            items.length === 0 ? (
              <p>
                <strong>No hay tareas visibles</strong>
              </p>
            ) : (
              <ul> {
            items.map( item =>{
              return (
                <li key={item.id}>
                  {item.text}
                  <button onClick={removeItem(item.id)}>
                    Eliminar  
                  </button>
                </li>
                
              )
            })}
          </ul>
          )
        }
      </section>
    </main>
  )
}

export default App
