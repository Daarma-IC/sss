export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Selamat Datang di AI Guru 👋
      </h1>
      <div className="flex gap-4">
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md">
          Login Internet Identity
        </button>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md">
          Mulai Belajar
        </button>
      </div>
    </main>
  )
}
