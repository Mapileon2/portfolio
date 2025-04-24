"use client"

import Image from "next/image"

interface ShowcaseSectionProps {
  data: {
    title: string
    features: Array<{
      title: string
      description: string
      imageUrl: string
    }>
    testimonials: Array<{
      quote: string
      author: string
      rating: number
    }>
  }
}

export default function ShowcaseSection({ data }: ShowcaseSectionProps) {
  return (
    <section id="showcase" className="page-section bg-blue-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ghibli-text-blue handwriting slide-in">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16 slide-in">
          {data.features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg sketch-border gallery-item">
              <Image
                src={feature.imageUrl || "/placeholder.svg"}
                alt={feature.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2 ghibli-text-blue">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="slide-in delayed-1">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-green">What People Are Saying</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg sketch-border">
                <div className="mb-4 text-yellow-500">
                  {"★".repeat(Math.floor(testimonial.rating))}
                  {testimonial.rating % 1 !== 0 && "☆"}
                  {"☆".repeat(5 - Math.ceil(testimonial.rating))}
                  <span className="ml-2 text-gray-600">({testimonial.rating})</span>
                </div>
                <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-right font-bold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center slide-in delayed-2">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transform transition hover:scale-105">
            View Live Demo <i className="fas fa-external-link-alt ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
