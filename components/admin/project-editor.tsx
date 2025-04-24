"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  image_url: string | null
  content: any
  is_featured: boolean
  is_published: boolean
  rating: number | null
  result: string | null
  role: string | null
}

interface ProjectEditorProps {
  project: Project | null
  onSave: () => void
  onCancel: () => void
}

export default function ProjectEditor({ project, onSave, onCancel }: ProjectEditorProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    slug: "",
    description: "",
    image_url: "",
    content: {},
    is_featured: false,
    is_published: true,
    rating: 5,
    result: "",
    role: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()
  const isEditing = !!project

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        slug: project.slug,
        description: project.description,
        image_url: project.image_url,
        content: project.content || {},
        is_featured: project.is_featured,
        is_published: project.is_published,
        rating: project.rating,
        result: project.result,
        role: project.role,
      })
    }
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked })
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Convert to kebab case
    const value = e.target.value
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    setFormData({ ...formData, slug: value })
  }

  const handleTitleBlur = () => {
    // Auto-generate slug from title if slug is empty
    if (!formData.slug && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")

      setFormData({ ...formData, slug })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (!formData.title || !formData.slug) {
        throw new Error("Title and slug are required")
      }

      if (isEditing && project) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            image_url: formData.image_url,
            content: formData.content,
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            rating: formData.rating,
            result: formData.result,
            role: formData.role,
          })
          .eq("id", project.id)

        if (error) throw error

        toast({
          title: "Project updated",
          description: "Your project has been updated successfully",
        })
      } else {
        // Create new project
        const { data, error } = await supabase
          .from("projects")
          .insert({
            title: formData.title,
            slug: formData.slug,
            description: formData.description,
            image_url: formData.image_url,
            content: formData.content || {},
            is_featured: formData.is_featured,
            is_published: formData.is_published,
            rating: formData.rating,
            result: formData.result,
            role: formData.role,
          })
          .select()

        if (error) throw error

        toast({
          title: "Project created",
          description: "Your new project has been created successfully",
        })
      }

      onSave()
    } catch (error: any) {
      toast({
        title: "Error saving project",
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
        <h2 className="text-2xl font-bold">{isEditing ? "Edit Project" : "Create New Project"}</h2>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={handleTitleBlur}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">/case-study/</span>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleSlugChange} required />
              </div>
              <p className="text-sm text-muted-foreground">This will be the URL of your case study</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url || ""}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role || ""}
                  onChange={handleChange}
                  placeholder="Lead Designer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating (1-5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating?.toString() || "5"}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="result">Result</Label>
                <Input
                  id="result"
                  name="result"
                  value={formData.result || ""}
                  onChange={handleChange}
                  placeholder="40% increase in engagement"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleSwitchChange("is_featured", checked)}
                />
                <Label htmlFor="is_featured">Featured Project</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => handleSwitchChange("is_published", checked)}
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
            </div>

            <CardFooter className="px-0 pt-6">
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
