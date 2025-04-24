"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isCaseStudy = pathname.startsWith("/case-study")

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
      className={`fixed top-0 left-0 right-0 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 shadow-md z-50 transition-all ${
        scrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold ghibli-text-blue handwriting">
          {isCaseStudy ? "Whispering Winds" : "Product Journey"}
        </Link>

        {!isAdmin && (
          <>
            <div className="hidden md:flex space-x-8">
              {isCaseStudy ? (
                <>
                  <a
                    href="#hero"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Home
                  </a>
                  <a
                    href="#overview"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Overview
                  </a>
                  <a
                    href="#problem"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Problem
                  </a>
                  <a
                    href="#process"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Process
                  </a>
                  <a
                    href="#showcase"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Showcase
                  </a>
                  <a
                    href="#reflection"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Reflection
                  </a>
                </>
              ) : (
                <>
                  <a
                    href="#about"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    About
                  </a>
                  <a
                    href="#skills"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Skills
                  </a>
                  <a
                    href="#timeline"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Journey
                  </a>
                  <a
                    href="#projects"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                  >
                    Contact
                  </a>
                </>
              )}
              {isCaseStudy && (
                <Link href="/" className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300">
                  Back to Portfolio
                </Link>
              )}
              <Link
                href="/admin/login"
                className="hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
              >
                Admin
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <ModeToggle />
              <button
                onClick={toggleMobileMenu}
                className="md:hidden focus:outline-none"
                aria-label="Toggle mobile menu"
              >
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
            </div>
          </>
        )}

        {isAdmin && (
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-sm">
              View Portfolio
            </Link>
            <Link href="/case-study" className="text-sm">
              View Case Study
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
            <ModeToggle />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {!isAdmin && (
        <div
          className={`md:hidden bg-white dark:bg-gray-800 py-2 px-4 shadow-lg ${mobileMenuOpen ? "block" : "hidden"}`}
        >
          {isCaseStudy ? (
            <>
              <a
                href="#hero"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#overview"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Overview
              </a>
              <a
                href="#problem"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Problem
              </a>
              <a
                href="#process"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Process
              </a>
              <a
                href="#showcase"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showcase
              </a>
              <a
                href="#reflection"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Reflection
              </a>
              <Link
                href="/"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Back to Portfolio
              </Link>
            </>
          ) : (
            <>
              <a
                href="#about"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#skills"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#timeline"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Journey
              </a>
              <a
                href="#projects"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </>
          )}
          <Link
            href="/admin/login"
            className="block py-2 hover:text-blue-500 transition dark:text-gray-300 dark:hover:text-blue-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </nav>
  )
}
