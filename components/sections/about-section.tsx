"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { EditableText } from "@/components/editable/editable-text"

interface AboutSectionProps {
  data: {
    title?: string
    subtitle?: string
    description?: string
    image?: string
    skills?: {
      title: string
      description: string
      icon?: string
    }[]
  }
  sectionId?: string
  onUpdate?: (data: any) => Promise<void>
}

export default function AboutSection({ data, sectionId, onUpdate }: AboutSectionProps) {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
    }

    checkUser()
    setMounted(true)

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const isEditable = !!user && !!onUpdate

  const handleUpdate = async (field: string, value: any) => {
    if (onUpdate) {
      await onUpdate({
        ...data,
        [field]: value,
      })
    }
  }

  const handleSkillUpdate = async (index: number, field: string, value: string) => {
    if (!onUpdate || !data.skills) return

    const updatedSkills = [...data.skills]
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    }

    await onUpdate({
      ...data,
      skills: updatedSkills,
    })
  }

  if (!mounted) {
    return null
  }

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="ghibli-font text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">
            {isEditable ? (
              <EditableText
                value={data.title || "My Story"}
                onSave={(value) => handleUpdate("title", value)}
                className="ghibli-font text-4xl"
              />
            ) : (
              data.title || "My Story"
            )}
          </span>
        </h2>

        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 relative">
            <div className="bg-blue-100 rounded-3xl p-6 shadow-xl dark:bg-gray-700">
              <div className="relative">
                <Image
                  src={data.image || "/placeholder.svg?height=600&width=600" || "/placeholder.svg"}
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
            <h3 className="ghibli-font text-3xl mb-6 text-gray-800 dark:text-gray-200">Once upon a time...</h3>
            <div className="text-gray-600 mb-6 dark:text-gray-400">
              {isEditable ? (
                <EditableText
                  value={
                    data.description ||
                    "A Product Manager set out to bridge user needs and business goals in the mystical land of technology. With a compass of curiosity and a map of metrics, I navigate through complex problems to deliver solutions that feel like magic."
                  }
                  onSave={(value) => handleUpdate("description", value)}
                  className="text-gray-600 dark:text-gray-400"
                  multiline
                />
              ) : (
                <p>
                  {data.description ||
                    "A Product Manager set out to bridge user needs and business goals in the mystical land of technology. With a compass of curiosity and a map of metrics, I navigate through complex problems to deliver solutions that feel like magic."}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {(
                data.skills || [
                  {
                    title: "Roadmap Wizardry",
                    description: "Turning visions into actionable plans",
                    icon: "fa-route",
                  },
                  {
                    title: "Stargazer Alignment",
                    description: "Bringing teams together under one sky",
                    icon: "fa-users",
                  },
                  {
                    title: "Metric Sorcery",
                    description: "Weaving data into compelling stories",
                    icon: "fa-chart-line",
                  },
                  {
                    title: "Innovation Alchemy",
                    description: "Transforming ideas into gold",
                    icon: "fa-lightbulb",
                  },
                ]
              ).map((skill, index) => (
                <div
                  key={index}
                  className={`bg-${index === 0 ? "blue" : index === 1 ? "yellow" : index === 2 ? "green" : "purple"}-50 p-4 rounded-xl flex items-center dark:bg-gray-700`}
                >
                  <div
                    className={`bg-${index === 0 ? "blue" : index === 1 ? "yellow" : index === 2 ? "green" : "purple"}-100 p-3 rounded-full mr-4 dark:bg-gray-600`}
                  >
                    <i
                      className={`fas ${skill.icon || "fa-star"} text-${index === 0 ? "blue" : index === 1 ? "yellow" : index === 2 ? "green" : "purple"}-600 dark:text-${index === 0 ? "blue" : index === 1 ? "yellow" : index === 2 ? "green" : "purple"}-300`}
                    ></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      {isEditable ? (
                        <EditableText
                          value={skill.title}
                          onSave={(value) => handleSkillUpdate(index, "title", value)}
                          className="font-bold"
                        />
                      ) : (
                        skill.title
                      )}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {isEditable ? (
                        <EditableText
                          value={skill.description}
                          onSave={(value) => handleSkillUpdate(index, "description", value)}
                          className="text-sm"
                        />
                      ) : (
                        skill.description
                      )}
                    </p>
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
