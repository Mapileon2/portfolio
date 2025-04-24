import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="ghibli-font text-2xl mb-6 md:mb-0">
            <Link href="/">
              <span className="text-yellow-400">★</span> Product Journey
            </Link>
          </div>
          <div className="flex space-x-6 mb-6 md:mb-0">
            <Link href="/" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link href="#about" className="hover:text-yellow-400 transition">
              About
            </Link>
            <Link href="#projects" className="hover:text-yellow-400 transition">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-yellow-400 transition">
              Contact
            </Link>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full transition">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Product Journey. All rights reserved. Crafted with magic and ♥</p>
          <p className="mt-2 text-sm">Inspired by the enchanting worlds of Studio Ghibli</p>
        </div>
      </div>
    </footer>
  )
}
