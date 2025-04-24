"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Pencil, Plus, Trash2 } from "lucide-react"
import PageEditor from "@/components/admin/page-editor"

interface Page {
  id: string
  title: string
  slug: string
  description: string | null
  is_published: boolean
}

export default function PagesList() {
  const [pages, setPages] = useState<Page[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("pages").select("*").order("title", { ascending: true })

      if (error) {
        throw error
      }

      setPages(data || [])
    } catch (error: any) {
      toast({
        title: "Error fetching pages",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePagePublished = async (page: Page) => {
    try {
      const { error } = await supabase.from("pages").update({ is_published: !page.is_published }).eq("id", page.id)

      if (error) {
        throw error
      }

      setPages(pages.map((p) => (p.id === page.id ? { ...p, is_published: !page.is_published } : p)))

      toast({
        title: page.is_published ? "Page unpublished" : "Page published",
        description: `${page.title} has been ${page.is_published ? "unpublished" : "published"}.`,
      })
    } catch (error: any) {
      toast({
        title: "Error updating page",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleEdit = (page: Page) => {
    setSelectedPage(page)
    setIsEditing(true)
  }

  const handleCreate = () => {
    setSelectedPage(null)
    setIsCreating(true)
  }

  const handleDelete = async (page: Page) => {
    if (!confirm(`Are you sure you want to delete "${page.title}"?`)) {
      return
    }

    try {
      const { error } = await supabase.from("pages").delete().eq("id", page.id)

      if (error) {
        throw error
      }

      setPages(pages.filter((p) => p.id !== page.id))

      toast({
        title: "Page deleted",
        description: `${page.title} has been deleted.`,
      })
    } catch (error: any) {
      toast({
        title: "Error deleting page",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    setIsCreating(false)
    fetchPages()
  }

  const handleCancel = () => {
    setIsEditing(false)
    setIsCreating(false)
  }

  if (isEditing || isCreating) {
    return <PageEditor page={selectedPage} onSave={handleSave} onCancel={handleCancel} />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pages</h2>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" /> Add New Page
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading pages...</p>
        </div>
      ) : pages.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">No pages found</p>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> Create Your First Page
          </Button>
        </div>
      ) : (
        <div className="grid gap-6">
          {pages.map((page) => (
            <Card key={page.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{page.title}</CardTitle>
                    <CardDescription className="mt-1">/{page.slug}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={page.is_published} onCheckedChange={() => togglePagePublished(page)} />
                    <span className="text-sm text-muted-foreground">{page.is_published ? "Published" : "Draft"}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{page.description || "No description provided"}</p>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(page)}>
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(page)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
