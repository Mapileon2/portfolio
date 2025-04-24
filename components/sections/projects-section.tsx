"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { EditableText } from "@/components/editable/editable-text"

interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  image_url: string | null
  is_featured: boolean
  rating: number | null
  result: string | null
  role: string | null
}

interface ProjectsSectionProps {
  projects: Project[]
  title?: string
  subtitle?: string
  sectionId?: string
  onUpdate?: (data: any) => Promise<void>
}

export default function ProjectsSection({
  projects,
  title = "Magical Projects",
  subtitle,
  sectionId = "projects",
  onUpdate,
}: ProjectsSectionProps) {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    setMounted(true)

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const isEditable = !!user && !!onUpdate

  const handleUpdate = async (field: string, value: any) => {
    if (onUpdate) {
      await onUpdate({
        title,
        subtitle,
        [field]: value,
      })
    }
  }

  if (!mounted) return null

  // Separate featured projects from regular projects
  const featuredProjects = projects.filter((project) => project.is_featured)
  const regularProjects = projects.filter((project) => !project.is_featured)

  return (
    <section id={sectionId} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="ghibli-font text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">
            {isEditable ? (
              <EditableText
                value={title}
                onSave={(value) => handleUpdate("title", value)}
                className="ghibli-font text-4xl"
              />
            ) : (
              title
            )}
          </span>
        </h2>

        {subtitle && (
          <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-400">
            {isEditable ? (
              <EditableText value={subtitle} onSave={(value) => handleUpdate("subtitle", value)} />
            ) : (
              subtitle
            )}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-book">
              <div className="relative h-full">
                <div className="book-inner bg-white rounded-xl shadow-xl overflow-hidden h-full dark:bg-gray-800">
                  <Image
                    src={project.image_url || "/placeholder.svg?height=400&width=600"}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="ghibli-font text-2xl text-gray-800 mb-2 dark:text-gray-200">{project.title}</h3>
                    <p className="text-gray-600 mb-4 dark:text-gray-400">{project.description}</p>
                    <div className="flex items-center mb-4">
                      {project.role && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                          {project.role}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        {project.rating && (
                          <div className="text-yellow-500">
                            {Array.from({ length: project.rating }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                            {Array.from({ length: 5 - (project.rating || 0) }).map((_, i) => (
                              <span key={i}>☆</span>
                            ))}
                          </div>
                        )}
                        {project.result && <p className="text-sm text-gray-600 dark:text-gray-400">{project.result}</p>}
                      </div>
                      <Link
                        href={`/case-study/${project.slug}`}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        Read Story <i className="fas fa-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="book-spine"></div>
              </div>
            </div>
          ))}
        </div>

        {projects.length > 6 && (
          <div className="text-center mt-16">
            <Link
              href="/projects"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              View All Projects <i className="fas fa-sparkles ml-2"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
