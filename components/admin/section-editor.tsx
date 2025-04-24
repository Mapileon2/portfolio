"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { PlusCircle, Trash2 } from "lucide-react"

export function SectionEditor({ sectionId, pageId }: { sectionId?: string; pageId: string }) {
  const [section, setSection] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    if (sectionId) {
      fetchSection()
    } else {
      setSection({
        page_id: pageId,
        type: "hero",
        title: "New Section",
        content: {},
        order_index: 0,
        is_published: true,
      })
      setLoading(false)
    }
  }, [sectionId, pageId])

  const fetchSection = async () => {
    setLoading(true)
    const { data, error } = await supabase.from("sections").select("*").eq("id", sectionId).single()

    if (error) {
      toast({
        title: "Error fetching section",
        description: error.message,
        variant: "destructive",
      })
    } else {
      setSection(data)
    }
    setLoading(false)
  }

  const handleChange = (field: string, value: any) => {
    setSection((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleContentChange = (field: string, value: any) => {
    setSection((prev: any) => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      if (sectionId) {
        // Update existing section
        const { error } = await supabase
          .from("sections")
          .update({
            type: section.type,
            title: section.title,
            content: section.content,
            order_index: section.order_index,
            is_published: section.is_published,
          })
          .eq("id", sectionId)

        if (error) throw error

        toast({
          title: "Section updated",
          description: "Your section has been updated successfully.",
        })
      } else {
        // Create new section
        const { error } = await supabase.from("sections").insert([
          {
            page_id: pageId,
            type: section.type,
            title: section.title,
            content: section.content,
            order_index: section.order_index,
            is_published: section.is_published,
          },
        ])

        if (error) throw error

        toast({
          title: "Section created",
          description: "Your section has been created successfully.",
        })
      }

      router.push(`/admin/pages/${pageId}`)
    } catch (error: any) {
      toast({
        title: "Error saving section",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  // Add a new skill category
  const addCategory = () => {
    const categories = section.content.categories || []
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: "New Category",
      icon: "fa-star",
      color: "blue",
      skills: [{ id: `skill-${Date.now()}`, name: "New Skill", percentage: 75 }],
    }

    handleContentChange("categories", [...categories, newCategory])
  }

  // Remove a skill category
  const removeCategory = (categoryId: string) => {
    const categories = section.content.categories || []
    handleContentChange(
      "categories",
      categories.filter((cat: any) => cat.id !== categoryId),
    )
  }

  // Add a skill to a category
  const addSkill = (categoryIndex: number) => {
    const categories = [...(section.content.categories || [])]
    if (!categories[categoryIndex].skills) {
      categories[categoryIndex].skills = []
    }

    categories[categoryIndex].skills.push({
      id: `skill-${Date.now()}`,
      name: "New Skill",
      percentage: 75,
    })

    handleContentChange("categories", categories)
  }

  // Remove a skill from a category
  const removeSkill = (categoryIndex: number, skillId: string) => {
    const categories = [...(section.content.categories || [])]
    categories[categoryIndex].skills = categories[categoryIndex].skills.filter((skill: any) => skill.id !== skillId)

    handleContentChange("categories", categories)
  }

  // Add a new tool
  const addTool = () => {
    const tools = section.content.tools || []
    const newTool = {
      id: `tool-${Date.now()}`,
      name: "New Tool",
      icon: "fas fa-magic",
    }

    handleContentChange("tools", [...tools, newTool])
  }

  // Remove a tool
  const removeTool = (toolId: string) => {
    const tools = section.content.tools || []
    handleContentChange(
      "tools",
      tools.filter((tool: any) => tool.id !== toolId),
    )
  }

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  // Render different form fields based on section type
  const renderContentFields = () => {
    switch (section.type) {
      case "hero":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Hero Title</Label>
              <Input
                id="title"
                value={section.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="subtitle">Hero Subtitle</Label>
              <Input
                id="subtitle"
                value={section.content.subtitle || ""}
                onChange={(e) => handleContentChange("subtitle", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaText">CTA Button Text</Label>
              <Input
                id="ctaText"
                value={section.content.ctaText || ""}
                onChange={(e) => handleContentChange("ctaText", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="ctaLink">CTA Button Link</Label>
              <Input
                id="ctaLink"
                value={section.content.ctaLink || ""}
                onChange={(e) => handleContentChange("ctaLink", e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        )

      case "about":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={section.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={section.content.description || ""}
                onChange={(e) => handleContentChange("description", e.target.value)}
                className="mt-1"
                rows={5}
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={section.content.image || ""}
                onChange={(e) => handleContentChange("image", e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        )

      case "skills":
        return (
          <Tabs defaultValue="basic" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="categories">Skill Categories</TabsTrigger>
              <TabsTrigger value="tools">Enchanted Tools</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Section Title</Label>
                  <Input
                    id="title"
                    value={section.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Tools Section Title</Label>
                  <Input
                    id="subtitle"
                    value={section.content.subtitle || ""}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="space-y-6">
                {(section.content.categories || []).map((category: any, categoryIndex: number) => (
                  <Card key={category.id} className="relative">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => removeCategory(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={`category-${categoryIndex}-name`}>Category Name</Label>
                          <Input
                            id={`category-${categoryIndex}-name`}
                            value={category.name || ""}
                            onChange={(e) => {
                              const categories = [...(section.content.categories || [])]
                              categories[categoryIndex].name = e.target.value
                              handleContentChange("categories", categories)
                            }}
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`category-${categoryIndex}-icon`}>Icon (Font Awesome)</Label>
                          <div className="flex items-center mt-1">
                            <Input
                              id={`category-${categoryIndex}-icon`}
                              value={category.icon || ""}
                              onChange={(e) => {
                                const categories = [...(section.content.categories || [])]
                                categories[categoryIndex].icon = e.target.value
                                handleContentChange("categories", categories)
                              }}
                              className="mr-2"
                            />
                            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
                              <i className={`fas ${category.icon || "fa-star"} text-xl`}></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <Label htmlFor={`category-${categoryIndex}-color`}>Color</Label>
                        <Select
                          value={category.color || "blue"}
                          onValueChange={(value) => {
                            const categories = [...(section.content.categories || [])]
                            categories[categoryIndex].color = value
                            handleContentChange("categories", categories)
                          }}
                        >
                          <SelectTrigger id={`category-${categoryIndex}-color`} className="mt-1">
                            <SelectValue placeholder="Select color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Blue</SelectItem>
                            <SelectItem value="green">Green</SelectItem>
                            <SelectItem value="purple">Purple</SelectItem>
                            <SelectItem value="yellow">Yellow</SelectItem>
                            <SelectItem value="red">Red</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Label>Skills</Label>
                          <Button variant="outline" size="sm" onClick={() => addSkill(categoryIndex)}>
                            <PlusCircle className="h-4 w-4 mr-1" /> Add Skill
                          </Button>
                        </div>

                        {(category.skills || []).map((skill: any, skillIndex: number) => (
                          <div key={skill.id} className="flex items-center gap-2 mb-2">
                            <Input
                              value={skill.name || ""}
                              onChange={(e) => {
                                const categories = [...(section.content.categories || [])]
                                categories[categoryIndex].skills[skillIndex].name = e.target.value
                                handleContentChange("categories", categories)
                              }}
                              placeholder="Skill name"
                              className="flex-grow"
                            />
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={skill.percentage || 0}
                              onChange={(e) => {
                                const categories = [...(section.content.categories || [])]
                                categories[categoryIndex].skills[skillIndex].percentage = Number.parseInt(
                                  e.target.value,
                                )
                                handleContentChange("categories", categories)
                              }}
                              placeholder="Percentage"
                              className="w-20"
                            />
                            <Button variant="ghost" size="icon" onClick={() => removeSkill(categoryIndex, skill.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button onClick={addCategory} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Category
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <Label>Enchanted Tools</Label>
                  <Button variant="outline" size="sm" onClick={addTool}>
                    <PlusCircle className="h-4 w-4 mr-1" /> Add Tool
                  </Button>
                </div>

                {(section.content.tools || []).map((tool: any, index: number) => (
                  <div key={tool.id} className="flex items-center gap-2">
                    <Input
                      value={tool.name || ""}
                      onChange={(e) => {
                        const tools = [...(section.content.tools || [])]
                        tools[index].name = e.target.value
                        handleContentChange("tools", tools)
                      }}
                      placeholder="Tool name"
                      className="flex-grow"
                    />
                    <Input
                      value={tool.icon || ""}
                      onChange={(e) => {
                        const tools = [...(section.content.tools || [])]
                        tools[index].icon = e.target.value
                        handleContentChange("tools", tools)
                      }}
                      placeholder="Font Awesome icon"
                      className="w-40"
                    />
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
                      <i className={`${tool.icon || "fas fa-wrench"} text-xl`}></i>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeTool(tool.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )

      case "contact":
        return (
          <>
            <div className="mb-4">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={section.content.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="subtitle">Section Subtitle</Label>
              <Input
                id="subtitle"
                value={section.content.subtitle || ""}
                onChange={(e) => handleContentChange("subtitle", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={section.content.email || ""}
                onChange={(e) => handleContentChange("email", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={section.content.phone || ""}
                onChange={(e) => handleContentChange("phone", e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={section.content.address || ""}
                onChange={(e) => handleContentChange("address", e.target.value)}
                className="mt-1"
              />
            </div>
          </>
        )

      default:
        return (
          <div className="mb-4">
            <Label htmlFor="content">Content (JSON)</Label>
            <Textarea
              id="content"
              value={JSON.stringify(section.content, null, 2)}
              onChange={(e) => {
                try {
                  handleChange("content", JSON.parse(e.target.value))
                } catch (error) {
                  // Allow invalid JSON during editing
                }
              }}
              className="mt-1 font-mono"
              rows={10}
            />
          </div>
        )
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{sectionId ? "Edit Section" : "Create New Section"}</h1>

      <div className="bg-card p-6 rounded-lg border">
        <div className="mb-4">
          <Label htmlFor="section-title">Section Admin Title</Label>
          <Input
            id="section-title"
            value={section.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            This title is for admin purposes only and won't be displayed on the site.
          </p>
        </div>

        <div className="mb-4">
          <Label htmlFor="section-type">Section Type</Label>
          <Select value={section.type} onValueChange={(value) => handleChange("type", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select section type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero</SelectItem>
              <SelectItem value="about">About</SelectItem>
              <SelectItem value="skills">Skills</SelectItem>
              <SelectItem value="projects">Projects</SelectItem>
              <SelectItem value="contact">Contact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4">
          <Label htmlFor="order-index">Order Index</Label>
          <Input
            id="order-index"
            type="number"
            value={section.order_index}
            onChange={(e) => handleChange("order_index", Number.parseInt(e.target.value))}
            className="mt-1"
          />
          <p className="text-sm text-muted-foreground mt-1">
            Sections are displayed in ascending order based on this value.
          </p>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <Switch
              checked={section.is_published}
              onCheckedChange={(checked) => handleChange("is_published", checked)}
              id="is-published"
            />
            <Label htmlFor="is-published">Published</Label>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Only published sections will be visible on the site.</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Section Content</h2>
          {renderContentFields()}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button variant="outline" onClick={() => router.push(`/admin/pages/${pageId}`)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Section"}
          </Button>
        </div>
      </div>
    </div>
  )
}
