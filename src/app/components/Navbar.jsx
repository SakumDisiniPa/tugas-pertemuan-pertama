'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <Link href="/" className="flex items-center py-4 px-2">
              <span className="font-semibold text-gray-500 text-lg">SAKUM HOSTING</span>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" text="Home" active={pathname === '/'} />
            <NavLink href="/about" text="About" active={pathname === '/about'} />
            <NavLink href="/contact" text="Contact" active={pathname === '/contact'} />
            <NavLink href="/products/" text="Products" active={pathname?.startsWith('/products')} />
            <NavLink href="/profile" text="Profile" active={pathname === '/profile'} />
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <MobileNavLink href="/" text="Home" active={pathname === '/'} />
          <MobileNavLink href="/profile" text="Profile" active={pathname === '/profile'} />
          <MobileNavLink href="/about" text="About" active={pathname === '/about'} />
          <MobileNavLink href="/contact" text="Contact" active={pathname === '/contact'} />
          <MobileNavLink href="/products/1" text="Products" active={pathname?.startsWith('/products')} />
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, text, active }) {
  return (
    <Link href={href} className={`py-4 px-2 font-semibold transition duration-300 ${active ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-blue-500'}`}>
      {text}
    </Link>
  )
}

function MobileNavLink({ href, text, active }) {
  return (
    <Link href={href} className={`block px-3 py-2 rounded-md text-base font-medium ${active ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-500 hover:text-white'}`}>
      {text}
    </Link>
  )
}