"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { Section } from "@/lib/types"

export default function Navigation({ sections }: { sections: Section[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-md z-50 transition-all ${scrolled ? "py-2" : "py-3"}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold ghibli-text-blue handwriting">
          Studio Case
        </Link>

        {!isAdmin && (
          <>
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.type}`} className="hover:text-blue-500 transition">
                  {section.title}
                </a>
              ))}
              <Link href="/admin/login" className="hover:text-blue-500 transition">
                Admin
              </Link>
            </div>

            <button onClick={toggleMobileMenu} className="md:hidden focus:outline-none" aria-label="Toggle mobile menu">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </>
        )}

        {isAdmin && (
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm">
              View Site
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {!isAdmin && (
        <div className={`md:hidden bg-white py-2 px-4 shadow-lg ${mobileMenuOpen ? "block" : "hidden"}`}>
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.type}`}
              className="block py-2 hover:text-blue-500 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              {section.title}
            </a>
          ))}
          <Link
            href="/admin/login"
            className="block py-2 hover:text-blue-500 transition"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  )
}
