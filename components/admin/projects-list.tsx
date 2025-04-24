"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Pencil, Plus, Star, Trash2 } from "lucide-react"
import ProjectEditor from "@/components/admin/project-editor"

interface Project {
  id: string
  title: string
  slug: string
  description: string | null
  image_url: string | null
  is_featured: boolean
  is_published: boolean
  rating: number | null
  result: string | null
  role: string | null
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("is_featured", { ascending: false })
        .order("title", { ascending: true })

      if (error) {
        throw error
      }

      setProjects(data || [])
    } catch (error: any) {
      toast({
        title: "Error fetching projects",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleProjectPublished = async (project: Project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ is_published: !project.is_published })
        .eq("id", project.id)

      if (error) {
        throw error
      }

      setProjects(projects.map((p) => (p.id === project.id ? { ...p, is_published: !project.is_published } : p)))

      toast({
        title: project.is_published ? "Project unpublished" : "Project published",
        description: `${project.title} has been ${project.is_published ? "unpublished" : "published"}.`,
      })
    } catch (error: any) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const toggleProjectFeatured = async (project: Project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .update({ is_featured: !project.is_featured })
        .eq("id", project.id)

      if (error) {
        throw error
      }

      setProjects(projects.map((p) => (p.id === project.id ? { ...p, is_featured: !project.is_featured } : p)))

      toast({
        title: project.is_featured ? "Project unfeatured" : "Project featured",
        description: `${project.title} has been ${project.is_featured ? "removed from" : "added to"} featured projects.`,
      })
    } catch (error: any) {
      toast({
        title: "Error updating project",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsEditing(true)
  }

  const handleCreate = () => {
    setSelectedProject(null)
    setIsCreating(true)
  }

  const handleDelete = async (project: Project) => {
    if (!confirm(`Are you sure you want to delete "${project.title}"?`)) {
      return
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("id", project.id)

      if (error) {
        throw error
      }

      setProjects(projects.filter((p) => p.id !== project.id))

      toast({
        title: "Project deleted",
        description: `${project.title} has been deleted.`,
      })
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    setIsCreating(false)
    fetchProjects()
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsCreating(false)
  }

  if (isEditing || isCreating) {
    return <ProjectEditor project={selectedProject} onSave={handleSave} onCancel={handleCancel} />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add New Project
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No projects found</p>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className={project.is_featured ? "border-primary/50" : ""}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <CardTitle>{project.title}</CardTitle>
                    {project.is_featured && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={project.is_published} onCheckedChange={() => toggleProjectPublished(project)} />
                    <span className="text-sm text-muted-foreground">
                      {project.is_published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <CardDescription className="mt-1">/{project.slug}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  {project.image_url && (
                    <div className="md:w-1/4">
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-auto rounded-md object-cover"
                        style={{ maxHeight: "100px" }}
                      />
                    </div>
                  )}
                  <div className={project.image_url ? "md:w-3/4" : "w-full"}>
                    <p className="text-muted-foreground mb-2">{project.description || "No description provided"}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.role && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          {project.role}
                        </span>
                      )}
                      {project.result && (
                        <span className="bg-secondary/20 text-secondary-foreground text-xs px-2 py-1 rounded-full">
                          {project.result}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => toggleProjectFeatured(project)}>
                  {project.is_featured ? (
                    <>
                      <Star className="h-4 w-4 mr-2 fill-none" /> Unfeature
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4 mr-2" /> Feature
                    </>
                  )}
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(project)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
