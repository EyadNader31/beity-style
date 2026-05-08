'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminProductsPage() {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')

  async function addProduct() {
  const { data, error } = await supabase
    .from('products')
    .insert([
      {
        name,
        description,
        price: Number(price),
      },
    ])
    .select()

  console.log("DATA:", data)
  console.log("ERROR:", error)

  if (error) {
    alert(error.message)
    return
  }

  alert("Product added successfully")
}

  return (
    <main className="min-h-screen p-10 bg-[#f7f1ea]">
      <h1 className="text-5xl font-bold mb-10">
        Add Product
      </h1>

      <div className="max-w-xl bg-white p-8 rounded-3xl shadow">

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-4 rounded-xl mb-4"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-4 rounded-xl mb-6"
        />

        <button
          onClick={addProduct}
          className="bg-[#7a5c48] text-white px-8 py-4 rounded-2xl"
        >
          Add Product
        </button>

      </div>
    </main>
  )
}
