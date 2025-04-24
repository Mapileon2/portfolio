"use client"

import Image from "next/image"

interface ProcessSectionProps {
  data: {
    title: string
    ideation: Array<{
      title: string
      description: string
      imageUrl: string
    }>
    designEvolution: Array<{
      stage: string
      imageUrl: string
    }>
    timeline: Array<{
      phase: string
      date: string
      description: string
    }>
  }
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <section id="process" className="page-section bg-green-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ghibli-text-green handwriting slide-in">
          {data.title}
        </h2>

        <div className="mb-16 slide-in">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-blue">Ideation & Brainstorming</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {data.ideation.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg sketch-border gallery-item">
                <Image
                  src={item.imageUrl || "/placeholder.svg"}
                  alt={item.title}
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded mb-4"
                />
                <h4
                  className={`font-bold mb-2 ${index === 0 ? "ghibli-text-blue" : index === 1 ? "ghibli-text-green" : "ghibli-text-yellow"}`}
                >
                  {item.title}
                </h4>
                <p className="text-sm">{item.description}</p>
                {index === 1 && (
                  <button className="mt-3 text-blue-500 hover:text-blue-700 text-sm flex items-center">
                    <i className="fas fa-external-link-alt mr-2"></i> View Miro Board
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 slide-in delayed-1">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-green">Design Evolution</h3>
          <div className="bg-white p-6 rounded-xl sketch-border">
            <div className="flex overflow-x-auto pb-4 custom-scrollbar space-x-4">
              {data.designEvolution.map((item, index) => (
                <div key={index} className="flex-shrink-0 w-64">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.stage}
                    width={256}
                    height={200}
                    className="w-full h-auto rounded border border-gray-200"
                  />
                  <p className="text-center mt-2 text-sm">{item.stage}</p>
                  {index === 3 && (
                    <button className="mt-2 mx-auto text-blue-500 hover:text-blue-700 text-sm flex items-center justify-center">
                      <i className="fas fa-external-link-alt mr-2"></i> View Figma
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="slide-in delayed-2">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-red">Development Timeline</h3>
          <div className="relative pl-8">
            {/* Timeline connector */}
            <div className="timeline-connector"></div>

            {/* Timeline items */}
            {data.timeline.map((item, index) => (
              <div key={index} className="relative mb-10 timeline-item">
                <div className="bg-white p-6 rounded-xl shadow-lg sketch-border">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold ghibli-text-blue">{item.phase}</h4>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{item.date}</span>
                  </div>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
