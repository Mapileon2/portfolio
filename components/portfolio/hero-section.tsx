"use client"

interface HeroSectionProps {
  data: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
  }
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-16 dark:bg-gray-900">
      <div className="absolute top-20 right-20">
        <div className="soot-sprite floating"></div>
      </div>
      <div className="absolute bottom-10 left-10">
        <div className="kodama floating" style={{ animationDelay: "1s" }}></div>
      </div>
      <div className="absolute top-1/3 left-1/4">
        <div className="catbus floating" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="max-w-4xl mx-auto text-center px-4 z-10">
        <h1 className="handwriting text-5xl md:text-7xl font-bold" style={{ color: "#E6E6FA" }}>
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl mb-10" style={{ color: "#E6E6FA" }}>
          {data.subtitle}
        </p>
        <a
          href={data.ctaLink}
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          {data.ctaText} <i className="fas fa-arrow-down ml-2"></i>
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
    </section>
  )
}
