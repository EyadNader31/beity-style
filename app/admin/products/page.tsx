'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminProductsPage() {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState<File | null>(null)

  async function addProduct() {

    if (!image) {
      alert('Please select an image')
      return
    }

    const fileName = `${Date.now()}-${image.name}`

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, image)

    if (uploadError) {
      alert(uploadError.message)
      return
    }

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    const imageUrl = data.publicUrl

    const { error } = await supabase
      .from('products')
      .insert([
        {
          name,
          description,
          price: Number(price),
          image_url: imageUrl,
        },
      ])

    if (error) {
      alert(error.message)
      return
    }

    alert('Product added successfully ✅')

    setName('')
    setDescription('')
    setPrice('')
    setImage(null)
  }

  return (
    <main className="min-h-screen bg-[#f7f1ea] p-10">

      <h1 className="text-6xl font-bold mb-10">
        Add Product
      </h1>

      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-4xl">

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-black rounded-2xl p-5 text-2xl mb-6"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-black rounded-2xl p-5 text-2xl mb-6 h-40"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border border-black rounded-2xl p-5 text-2xl mb-6"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setImage(e.target.files[0])
            }
          }}
          className="w-full border border-black rounded-2xl p-5 text-xl mb-8"
        />

        <button
          onClick={addProduct}
          className="bg-[#8b6b4a] text-white px-10 py-5 rounded-2xl text-2xl"
        >
          Add Product
        </button>

      </div>

    </main>
  )
}