'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    const { data } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    setOrders(data || [])
  }

  async function updateStatus(id: number, status: string) {
    await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    fetchOrders()
  }

  return (
    <main className="min-h-screen p-10 bg-gray-100">

      <h1 className="text-4xl font-bold mb-8">
        Customer Orders
      </h1>

      <div className="space-y-6">

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-2xl shadow"
          >

            <h2 className="text-xl font-bold">
              {order.customer_name}
            </h2>

            <p>📞 {order.phone}</p>
            <p>🏠 {order.address}</p>

            <p>📦 {order.product_name}</p>
            <p>🔢 Quantity: {order.quantity}</p>
            <p>💰 Total: {order.total_price}</p>

            <p className="mt-2 font-semibold">
              Status: {order.status}
            </p>

            {/* BUTTONS GO HERE */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() => updateStatus(order.id, 'Confirmed')}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Delivered')}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Delivered
              </button>

              <button
                onClick={() => updateStatus(order.id, 'Cancelled')}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>

            </div>

          </div>
        ))}

      </div>

    </main>
  )
}