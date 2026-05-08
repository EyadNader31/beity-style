'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function CheckoutContent() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [productName, setProductName] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState(0)

  const searchParams = useSearchParams()

  useEffect(() => {
    const product = searchParams.get('product')
    const price = searchParams.get('price')

    if (product) setProductName(product)
    if (price) setPrice(Number(price))
  }, [searchParams])

  async function placeOrder() {
    const total = Number(price) * Number(quantity)

    const { error } = await supabase.from('orders').insert([
      {
        customer_name: name,
        phone,
        address,
        product_name: productName,
        quantity,
        total_price: total,
        status: 'Pending',
      },
    ])

    if (error) {
      alert(error.message)
      return
    }

    alert('Order placed successfully ✅')

    setName('')
    setPhone('')
    setAddress('')
    setProductName('')
    setQuantity(1)
    setPrice(0)
  }

  return (
    <main className="min-h-screen p-10 bg-[#f7f1ea]">
      <h1 className="text-4xl font-bold mb-8">
        Cash on Delivery Checkout
      </h1>

      <div className="max-w-xl bg-white p-8 rounded-3xl shadow">

        <input
          className="w-full border p-3 mb-4"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <input
          type="number"
          className="w-full border p-3 mb-4"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input
          type="number"
          className="w-full border p-3 mb-6"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <button
          onClick={placeOrder}
          className="w-full bg-[#7a5c48] text-white py-3 rounded-2xl"
        >
          Place Order
        </button>

      </div>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}