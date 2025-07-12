import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold mb-4 animate-bounce">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Oops! Page not found</h2>
        <p className="text-xl mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 bg-white text-blue-500 rounded-lg font-medium hover:bg-gray-100 transition duration-300 transform hover:scale-105"
        >
          Go back home
        </Link>
      </div>
    </div>
  )
}