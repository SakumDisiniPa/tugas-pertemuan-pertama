import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './globals.css'

export const metadata = {
  title: 'NextApp - Home',
  description: 'Modern Next.js application with Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}