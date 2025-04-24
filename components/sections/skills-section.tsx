"use client"

import { useState, useEffect, useRef } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { EditableText } from "@/components/editable/editable-text"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

interface SkillCategory {
  id: string
  name: string
  skills: {
    id: string
    name: string
    percentage: number
  }[]
  icon?: string
  color?: string
}

interface Tool {
  id: string
  name: string
  icon?: string
}

interface SkillsSectionProps {
  data: {
    title?: string
    subtitle?: string
    categories?: SkillCategory[]
    tools?: Tool[]
  }
  sectionId?: string
  onUpdate?: (data: any) => Promise<void>
}

export default function SkillsSection({ data, sectionId, onUpdate }: SkillsSectionProps) {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)
  const [newToolName, setNewToolName] = useState("")
  const [isAddingTool, setIsAddingTool] = useState(false)
  const categoriesRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    // Check if we need to show scroll arrows
    if (categoriesRef.current) {
      const { scrollWidth, clientWidth } = categoriesRef.current
      setShowRightArrow(scrollWidth > clientWidth)
    }
  }, [data.categories, mounted])

  const isEditable = !!user && !!onUpdate

  const handleUpdate = async (field: string, value: any) => {
    if (onUpdate) {
      await onUpdate({
        ...data,
        [field]: value,
      })
    }
  }

  const handleScroll = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const { scrollLeft, clientWidth } = categoriesRef.current
      const newPosition = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2

      categoriesRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })
    }
  }

  const handleCategoriesScroll = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current
      setScrollPosition(scrollLeft)
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  const addTool = async () => {
    if (!newToolName.trim() || !isEditable) return

    const newTool: Tool = {
      id: `tool-${Date.now()}`,
      name: newToolName,
      icon: "fas fa-magic", // Default icon
    }

    const updatedTools = [...(data.tools || []), newTool]
    await handleUpdate("tools", updatedTools)
    setNewToolName("")
    setIsAddingTool(false)
  }

  const removeTool = async (toolId: string) => {
    if (!isEditable) return

    const updatedTools = (data.tools || []).filter((tool) => tool.id !== toolId)
    await handleUpdate("tools", updatedTools)
  }

  const defaultCategories: SkillCategory[] = [
    {
      id: "cat-1",
      name: "Strategy & Vision",
      icon: "fa-chess-queen",
      color: "blue",
      skills: [
        { id: "skill-1", name: "Product Vision", percentage: 95 },
        { id: "skill-2", name: "Roadmapping", percentage: 90 },
        { id: "skill-3", name: "OKRs", percentage: 85 },
      ],
    },
    {
      id: "cat-2",
      name: "Execution",
      icon: "fa-hammer",
      color: "green",
      skills: [
        { id: "skill-4", name: "Agile Methodologies", percentage: 92 },
        { id: "skill-5", name: "User Stories", percentage: 88 },
        { id: "skill-6", name: "Prioritization", percentage: 90 },
      ],
    },
    {
      id: "cat-3",
      name: "Analytics",
      icon: "fa-chart-pie",
      color: "purple",
      skills: [
        { id: "skill-7", name: "SQL", percentage: 85 },
        { id: "skill-8", name: "A/B Testing", percentage: 80 },
        { id: "skill-9", name: "Data Visualization", percentage: 75 },
      ],
    },
    {
      id: "cat-4",
      name: "Leadership",
      icon: "fa-users",
      color: "yellow",
      skills: [
        { id: "skill-10", name: "Team Building", percentage: 88 },
        { id: "skill-11", name: "Mentoring", percentage: 92 },
        { id: "skill-12", name: "Stakeholder Management", percentage: 85 },
      ],
    },
  ]

  const defaultTools: Tool[] = [
    { id: "tool-1", name: "Jira", icon: "fab fa-jira" },
    { id: "tool-2", name: "SQL", icon: "fas fa-database" },
    { id: "tool-3", name: "Figma", icon: "fab fa-figma" },
    { id: "tool-4", name: "Google Analytics", icon: "fas fa-chart-bar" },
    { id: "tool-5", name: "Trello", icon: "fab fa-trello" },
    { id: "tool-6", name: "Git", icon: "fas fa-code-branch" },
  ]

  const categories = data.categories || defaultCategories
  const tools = data.tools || defaultTools

  if (!mounted) {
    return null
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="ghibli-font text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">
            {isEditable ? (
              <EditableText
                value={data.title || "My Magic Toolbox"}
                onSave={(value) => handleUpdate("title", value)}
                className="ghibli-font text-4xl"
              />
            ) : (
              data.title || "My Magic Toolbox"
            )}
          </span>
        </h2>

        {/* Categories with horizontal scroll */}
        <div className="relative">
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </button>
          )}

          <div
            ref={categoriesRef}
            className="flex overflow-x-auto pb-4 gap-8 scrollbar-hide"
            onScroll={handleCategoriesScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg dark:bg-gray-800 min-w-[300px] flex-shrink-0"
              >
                <div className="flex justify-center mb-6">
                  <div className={`bg-${category.color || "blue"}-100 p-4 rounded-full dark:bg-gray-700`}>
                    <i
                      className={`fas ${category.icon || "fa-star"} text-3xl text-${category.color || "blue"}-600 dark:text-${category.color || "blue"}-300`}
                    ></i>
                  </div>
                </div>
                <h3 className="ghibli-font text-2xl text-center mb-4 text-gray-800 dark:text-gray-200">
                  {isEditable ? (
                    <EditableText
                      value={category.name}
                      onSave={(value) => {
                        const updatedCategories = [...categories]
                        updatedCategories[index] = { ...category, name: value }
                        handleUpdate("categories", updatedCategories)
                      }}
                      className="ghibli-font text-2xl"
                    />
                  ) : (
                    category.name
                  )}
                </h3>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {isEditable ? (
                            <EditableText
                              value={skill.name}
                              onSave={(value) => {
                                const updatedCategories = [...categories]
                                updatedCategories[index].skills[skillIndex].name = value
                                handleUpdate("categories", updatedCategories)
                              }}
                              className="text-sm font-medium"
                            />
                          ) : (
                            skill.name
                          )}
                        </span>
                        <span className="text-sm text-gray-500">{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className={`bg-${category.color || "blue"}-600 h-2 rounded-full`}
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </button>
          )}
        </div>

        {/* Tools Section - Enchanted Tools */}
        <div className="mt-16">
          <h3 className="ghibli-font text-2xl text-center mb-8 text-gray-800 dark:text-gray-200">
            {isEditable ? (
              <EditableText
                value={data.subtitle || "Enchanted Tools I Wield"}
                onSave={(value) => handleUpdate("subtitle", value)}
                className="ghibli-font text-2xl"
              />
            ) : (
              data.subtitle || "Enchanted Tools I Wield"
            )}
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-xl shadow-md flex items-center dark:bg-gray-800 group relative"
              >
                <i className={`${tool.icon || "fas fa-wrench"} text-2xl text-blue-500 mr-2`}></i>
                <span className="text-gray-700 dark:text-gray-300">
                  {isEditable ? (
                    <EditableText
                      value={tool.name}
                      onSave={(value) => {
                        const updatedTools = [...tools]
                        const toolIndex = updatedTools.findIndex((t) => t.id === tool.id)
                        if (toolIndex !== -1) {
                          updatedTools[toolIndex] = { ...tool, name: value }
                          handleUpdate("tools", updatedTools)
                        }
                      }}
                    />
                  ) : (
                    tool.name
                  )}
                </span>

                {isEditable && (
                  <button
                    onClick={() => removeTool(tool.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${tool.name}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                )}
              </motion.div>
            ))}

            {isEditable &&
              (isAddingTool ? (
                <div className="bg-white p-3 rounded-xl shadow-md flex items-center dark:bg-gray-800">
                  <input
                    type="text"
                    value={newToolName}
                    onChange={(e) => setNewToolName(e.target.value)}
                    placeholder="Tool name"
                    className="border-none bg-transparent focus:outline-none text-gray-700 dark:text-gray-300"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") addTool()
                      if (e.key === "Escape") setIsAddingTool(false)
                    }}
                  />
                  <Button size="sm" variant="ghost" onClick={addTool} className="ml-2">
                    Add
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setIsAddingTool(false)} className="ml-1">
                    Cancel
                  </Button>
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsAddingTool(true)}
                  className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl shadow-md flex items-center text-blue-600 dark:text-blue-300"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>Add Tool</span>
                </motion.button>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
