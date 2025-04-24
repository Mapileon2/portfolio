"use client"

import Image from "next/image"

interface TimelineSectionProps {
  data: {
    title: string
    experiences: Array<{
      role: string
      company: string
      period: string
      description: string
      logo: string
    }>
  }
}

export default function TimelineSection({ data }: TimelineSectionProps) {
  return (
    <section id="timeline" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="handwriting text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">{data.title}</span>
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-blue-200 transform -translate-x-1/2 dark:bg-gray-600"></div>

          {/* Timeline items */}
          <div className="space-y-16">
            {data.experiences.map((experience, index) => (
              <div key={index} className="relative flex flex-col md:flex-row items-center">
                <div
                  className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 text-right" : "md:pl-16 order-2 md:order-1"} mb-8 md:mb-0`}
                >
                  <div className="bg-blue-50 p-6 rounded-2xl shadow-lg dark:bg-gray-700">
                    <h3 className="handwriting text-2xl text-blue-700 mb-2 dark:text-blue-300">{experience.role}</h3>
                    <p className="text-gray-600 font-medium mb-2 dark:text-gray-400">
                      {experience.company} • {experience.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">{experience.description}</p>
                  </div>
                </div>
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
                  <div className="timeline-lantern"></div>
                </div>
                <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pl-16" : "md:pr-16 order-1 md:order-2"}`}>
                  <div className="bg-gray-100 p-4 rounded-xl inline-block dark:bg-gray-700">
                    <Image
                      src={experience.logo || "/placeholder.svg"}
                      alt={experience.company}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-600"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
