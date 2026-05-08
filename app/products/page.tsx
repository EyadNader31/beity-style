import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')

  return (
    <main className="min-h-screen bg-[#f7f1ea] p-10">

      <h1 className="text-5xl font-bold text-[#5c4033] mb-10">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {products?.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-lg p-6"
          >

            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-64 object-cover rounded-2xl mb-4"
            />

            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2 text-gray-600">
              {product.description}
            </p>

            <p className="text-xl mt-4 font-semibold">
              {product.price} EGP
            </p>

            <Link
              href={`/checkout?product=${product.name}&price=${product.price}`}
            >
              <button className="mt-5 w-full bg-[#7a5c48] text-white py-3 rounded-2xl">
                Order Now
              </button>
            </Link>

          </div>
        ))}

      </div>

    </main>
  )
}