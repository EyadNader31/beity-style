export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-3xl font-bold">
            Products
          </h2>

          <p className="mt-3">
            Add and manage products
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-3xl font-bold">
            Orders
          </h2>

          <p className="mt-3">
            View customer orders
          </p>
        </div>

      </div>

    </main>
  )
}