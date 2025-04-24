"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { getPortfolioSectionById, updatePortfolioSection } from "@/lib/portfolio"
import type { Section } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

export default function EditPortfolioSectionPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [section, setSection] = useState<Section | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadSection = async () => {
      if (typeof params.id !== "string") return

      try {
        const data = await getPortfolioSectionById(params.id)
        setSection(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load section data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSection()
  }, [params.id, toast])

  const handleSave = async () => {
    if (!section) return

    setIsSaving(true)

    try {
      await updatePortfolioSection(section.id, section)

      toast({
        title: "Success",
        description: "Section updated successfully",
      })

      // Navigate back to the admin dashboard
      router.push("/admin")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update section",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex items-center justify-center">
        <p>Loading section data...</p>
      </div>
    )
  }

  if (!section) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Section Not Found</h1>
        <Button onClick={() => router.push("/admin")}>Back to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Portfolio Section: {section.title}</h1>
        <Button variant="outline" onClick={() => router.push("/admin")}>
          Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Section Details</CardTitle>
          <CardDescription>Edit the content and settings for this portfolio section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={section.title}
              onChange={(e) => setSection({ ...section, title: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Section Type</Label>
            <Input id="type" value={section.type} disabled />
            <p className="text-sm text-gray-500">Section type cannot be changed</p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={section.isPublished}
              onCheckedChange={(checked) => setSection({ ...section, isPublished: checked })}
            />
            <Label htmlFor="published">Published</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input
              id="order"
              type="number"
              value={section.order}
              onChange={(e) => setSection({ ...section, order: Number.parseInt(e.target.value) })}
            />
          </div>

          {/* Render different editor fields based on section type */}
          {section.type === "hero" && (
            <div className="space-y-4 border p-4 rounded-lg">
              <h3 className="font-medium">Hero Content</h3>

              <div className="space-y-2">
                <Label htmlFor="hero-title">Title</Label>
                <Input
                  id="hero-title"
                  value={section.data.title}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      data: { ...section.data, title: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle</Label>
                <Input
                  id="hero-subtitle"
                  value={section.data.subtitle}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      data: { ...section.data, subtitle: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-cta-text">CTA Text</Label>
                <Input
                  id="hero-cta-text"
                  value={section.data.ctaText}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      data: { ...section.data, ctaText: e.target.value },
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hero-cta-link">CTA Link</Label>
                <Input
                  id="hero-cta-link"
                  value={section.data.ctaLink}
                  onChange={(e) =>
                    setSection({
                      ...section,
                      data: { ...section.data, ctaLink: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Add similar editor fields for other section types */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
