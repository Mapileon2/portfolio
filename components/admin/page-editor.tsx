"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

interface Page {
  id: string
  title: string
  slug: string
  description: string | null
  is_published: boolean
}

interface PageEditorProps {
  page?: Page | null
  pageId?: string
  onSave: () => void
  onCancel: () => void
}

// Export as both named and default export to ensure compatibility
export function PageEditor({ page, pageId, onSave, onCancel }: PageEditorProps) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    is_published: true,
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    if (page) {
      setFormData({
        title: page.title,
        slug: page.slug,
        description: page.description || "",
        is_published: page.is_published,
      })
    } else if (pageId) {
      const fetchPage = async () => {
        const { data, error } = await supabase.from("pages").select("*").eq("id", pageId).single()

        if (error) {
          toast({
            title: "Error fetching page",
            description: error.message,
            variant: "destructive",
          })
        } else if (data) {
          setFormData({
            title: data.title,
            slug: data.slug,
            description: data.description || "",
            is_published: data.is_published,
          })
        }
      }
      fetchPage()
    }
  }, [page, pageId, supabase, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, is_published: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (pageId) {
        // Update existing page
        const { error } = await supabase
          .from("pages")
          .update({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            is_published: formData.is_published,
          })
          .eq("id", pageId)

        if (error) throw error

        toast({
          title: "Page updated",
          description: "Your page has been updated successfully",
        })
      } else {
        // Create new page
        const { error } = await supabase.from("pages").insert([
          {
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            is_published: formData.is_published,
          },
        ])

        if (error) throw error

        toast({
          title: "Page created",
          description: "Your new page has been created successfully",
        })
      }

      onSave()
      router.push("/admin")
    } catch (error: any) {
      toast({
        title: "Error saving page",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{pageId ? "Edit Page" : "Create New Page"}</h2>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} />
        </div>

        <div>
          <Label htmlFor="is_published">Published</Label>
          <Switch id="is_published" checked={formData.is_published} onCheckedChange={handleSwitchChange} />
        </div>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  )
}

// Also export as default for backward compatibility
export default PageEditor
