"use client"

interface ContactSectionProps {
  data: {
    title: string
    subtitle: string
    description: string
    email: string
    phone: string
    location: string
    socialLinks: Array<{
      platform: string
      url: string
    }>
  }
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="handwriting text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">{data.title}</span>
        </h2>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 p-10 text-white dark:bg-blue-700">
              <h3 className="handwriting text-3xl mb-4">{data.subtitle}</h3>
              <p className="mb-6">{data.description}</p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span>{data.email}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-phone"></i>
                  </div>
                  <span>{data.phone}</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span>{data.location}</span>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                {data.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                  >
                    <i className={`fab fa-${link.platform}`}></i>
                  </a>
                ))}
              </div>
            </div>
            <div className="md:w-1/2 p-10">
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 dark:bg-gray-700 dark:hover:bg-gray-600 flex items-center mx-auto">
            <i className="fas fa-scroll mr-2"></i> Download My Scroll of Achievements
          </button>
        </div>
      </div>
    </section>
  )
}
