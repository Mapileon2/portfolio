"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { EditableText } from "@/components/editable/editable-text"
import { useToast } from "@/components/ui/use-toast"

interface ContactSectionProps {
  data: {
    title?: string
    subtitle?: string
    email?: string
    phone?: string
    address?: string
    socialLinks?: {
      platform: string
      url: string
    }[]
  }
  sectionId?: string
  onUpdate?: (data: any) => Promise<void>
}

export default function ContactSection({ data, sectionId, onUpdate }: ContactSectionProps) {
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setMounted(true)
    }

    checkUser()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    })

    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="ghibli-font text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">
            {isEditable ? (
              <EditableText
                value={data.title || "Send a Message to the Spirit Realm"}
                onSave={(value) => handleUpdate("title", value)}
                className="ghibli-font text-4xl"
              />
            ) : (
              data.title || "Send a Message to the Spirit Realm"
            )}
          </span>
        </h2>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-gray-800">
          <div className="md:flex">
            <div className="md:w-1/2 bg-blue-600 p-10 text-white dark:bg-blue-700">
              <h3 className="ghibli-font text-3xl mb-4">
                {isEditable ? (
                  <EditableText
                    value={data.subtitle || "Let's Create Magic Together"}
                    onSave={(value) => handleUpdate("subtitle", value)}
                    className="ghibli-font text-3xl"
                  />
                ) : (
                  data.subtitle || "Let's Create Magic Together"
                )}
              </h3>
              <p className="mb-6">
                Whether you're looking for a product wizard to join your quest or just want to share thoughts on Ghibli
                films and product management, I'd love to hear from you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <span>
                    {isEditable ? (
                      <EditableText
                        value={data.email || "hello@productjourney.com"}
                        onSave={(value) => handleUpdate("email", value)}
                      />
                    ) : (
                      data.email || "hello@productjourney.com"
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-phone"></i>
                  </div>
                  <span>
                    {isEditable ? (
                      <EditableText
                        value={data.phone || "+1 (555) 123-4567"}
                        onSave={(value) => handleUpdate("phone", value)}
                      />
                    ) : (
                      data.phone || "+1 (555) 123-4567"
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-full mr-4 dark:bg-blue-600">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <span>
                    {isEditable ? (
                      <EditableText
                        value={data.address || "San Francisco, CA"}
                        onSave={(value) => handleUpdate("address", value)}
                      />
                    ) : (
                      data.address || "San Francisco, CA"
                    )}
                  </span>
                </div>
              </div>
              <div className="mt-8 flex space-x-4">
                <a
                  href="#"
                  className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="#"
                  className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="#"
                  className="bg-white text-blue-600 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-200"
                >
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 p-10">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 mb-2 dark:text-gray-300">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:scale-105 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  <i className="fas fa-paper-plane mr-2"></i> {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
