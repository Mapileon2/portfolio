"use client"

import Image from "next/image"

interface AboutSectionProps {
  data: {
    title: string
    subtitle: string
    description: string[]
    profileImage: string
    skills: Array<{
      title: string
      description: string
      icon: string
    }>
  }
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="handwriting text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">{data.title}</span>
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 relative">
            <div className="bg-blue-100 rounded-3xl p-6 shadow-xl dark:bg-gray-700">
              <div className="relative">
                <Image
                  src={data.profileImage || "/placeholder.svg"}
                  alt="Profile illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl border-4 border-white dark:border-gray-600"
                />
                <div className="absolute -bottom-6 -right-6">
                  <div className="bg-yellow-400 rounded-full p-4 shadow-lg">
                    <i className="fas fa-magic text-2xl text-gray-800"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -left-10 z-10">
              <div className="soot-sprite floating" style={{ animationDelay: "0.5s" }}></div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h3 className="handwriting text-3xl mb-6 text-gray-800 dark:text-gray-200">{data.subtitle}</h3>
            {data.description.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-6 dark:text-gray-400">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="bg-blue-50 p-4 rounded-xl flex items-center dark:bg-gray-700">
                  <div className="bg-blue-100 p-3 rounded-full mr-4 dark:bg-gray-600">
                    <i className={`fas fa-${skill.icon} text-blue-600 dark:text-blue-300`}></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">{skill.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
