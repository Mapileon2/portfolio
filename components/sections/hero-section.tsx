"use client"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react"
import type { User } from "@supabase/auth-helpers-nextjs"
import { EditableText } from "@/components/editable/editable-text"

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    ctaText?: string
    ctaLink?: string
  }
  sectionId?: string
  onUpdate?: (data: any) => Promise<void>
}

export default function HeroSection({ data, sectionId, onUpdate }: HeroSectionProps) {
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()
  }, [supabase])

  const isEditable = !!user && !!onUpdate

  const handleUpdate = async (field: string, value: any) => {
    if (onUpdate) {
      await onUpdate({
        ...data,
        [field]: value,
      })
    }
  }

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
        <h1 className="ghibli-font text-5xl md:text-7xl font-bold" style={{ color: "#E6E6FA" }}>
          {isEditable ? (
            <EditableText
              value={data.title || "Crafting Products That Spark Joy & Magic"}
              onSave={(value) => handleUpdate("title", value)}
              className="text-5xl md:text-7xl font-bold ghibli-font"
            />
          ) : (
            data.title || "Crafting Products That Spark Joy & Magic"
          )}
        </h1>
        <p className="text-xl md:text-2xl mb-10" style={{ color: "#E6E6FA" }}>
          {isEditable ? (
            <EditableText
              value={
                data.subtitle ||
                "A Product Manager's journey through enchanted user experiences and data-driven storytelling"
              }
              onSave={(value) => handleUpdate("subtitle", value)}
              className="text-xl md:text-2xl"
            />
          ) : (
            data.subtitle ||
            "A Product Manager's journey through enchanted user experiences and data-driven storytelling"
          )}
        </p>
        <a
          href={data.ctaLink || "#about"}
          className="inline-block bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105"
        >
          {isEditable ? (
            <EditableText
              value={data.ctaText || "Begin the Journey"}
              onSave={(value) => handleUpdate("ctaText", value)}
              className="font-bold"
            />
          ) : (
            data.ctaText || "Begin the Journey"
          )}{" "}
          <i className="fas fa-arrow-down ml-2"></i>
        </a>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
    </section>
  )
}
