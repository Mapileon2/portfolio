"use client"

import Image from "next/image"
import Link from "next/link"

interface ProjectsSectionProps {
  data: {
    title: string
    projects: Array<{
      title: string
      description: string
      image: string
      role: string
      rating: number
      result: string
      link: string
      isFeatured?: boolean
    }>
  }
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  // Find the featured project (Whispering Winds case study)
  const featuredProject = data.projects.find((project) => project.isFeatured)
  const otherProjects = data.projects.filter((project) => !project.isFeatured)

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="handwriting text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">{data.title}</span>
        </h2>

        {/* Featured Project (Case Study) */}
        {featuredProject && (
          <div className="mb-16">
            <h3 className="handwriting text-2xl text-center mb-8 text-gray-800 dark:text-gray-200">Featured Project</h3>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden dark:bg-gray-800">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <Image
                    src={featuredProject.image || "/placeholder.svg"}
                    alt={featuredProject.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h3 className="handwriting text-3xl text-gray-800 mb-4 dark:text-gray-200">
                    {featuredProject.title}
                  </h3>
                  <p className="text-gray-600 mb-6 dark:text-gray-400">{featuredProject.description}</p>
                  <div className="flex items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mr-2">
                      {featuredProject.role}
                    </span>
                    <span className="text-yellow-500">{"★".repeat(featuredProject.rating)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 dark:text-gray-400">{featuredProject.result}</p>
                  <Link
                    href={featuredProject.link}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    View Case Study <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project, index) => (
            <div key={index} className="project-book">
              <div className="relative h-full">
                <div className="book-inner bg-white rounded-xl shadow-xl overflow-hidden h-full dark:bg-gray-800">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="handwriting text-2xl text-gray-800 mb-2 dark:text-gray-200">{project.title}</h3>
                    <p className="text-gray-600 mb-4 dark:text-gray-400">{project.description}</p>
                    <div className="flex items-center mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                        {project.role}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-yellow-500">{"★".repeat(project.rating)}</span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{project.result}</p>
                      </div>
                      <a
                        href={project.link}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read Story <i className="fas fa-arrow-right ml-1"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="book-spine"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800">
            View All Projects <i className="fas fa-sparkles ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  )
}
