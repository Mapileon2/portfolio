"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2, Upload } from "lucide-react"

interface MediaItem {
  id: string
  file_name: string
  file_type: string
  file_size: number
  url: string
  alt_text: string | null
  created_at: string
}

export default function MediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [altText, setAltText] = useState("")
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchMediaItems()
  }, [])

  const fetchMediaItems = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.from("media").select("*").order("created_at", { ascending: false })

      if (error) {
        throw error
      }

      setMediaItems(data || [])
    } catch (error: any) {
      toast({
        title: "Error fetching media",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Upload file to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, selectedFile)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = await supabase.storage.from("media").getPublicUrl(filePath)

      // Save media info to database
      const { error: dbError } = await supabase.from("media").insert({
        file_name: selectedFile.name,
        file_type: selectedFile.type,
        file_size: selectedFile.size,
        url: urlData.publicUrl,
        alt_text: altText || null,
      })

      if (dbError) {
        throw dbError
      }

      toast({
        title: "Upload successful",
        description: "Your file has been uploaded successfully",
      })

      // Reset form and refresh media list
      setSelectedFile(null)
      setAltText("")
      fetchMediaItems()
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (item: MediaItem) => {
    if (!confirm(`Are you sure you want to delete "${item.file_name}"?`)) {
      return
    }

    try {
      // Extract file path from URL
      const url = new URL(item.url)
      const filePath = url.pathname.split("/").slice(-2).join("/")

      // Delete from storage
      const { error: storageError } = await supabase.storage.from("media").remove([filePath])

      if (storageError) {
        throw storageError
      }

      // Delete from database
      const { error: dbError } = await supabase.from("media").delete().eq("id", item.id)

      if (dbError) {
        throw dbError
      }

      setMediaItems(mediaItems.filter((m) => m.id !== item.id))

      toast({
        title: "Media deleted",
        description: "The file has been deleted successfully",
      })
    } catch (error: any) {
      toast({
        title: "Error deleting media",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast({
      title: "URL copied",
      description: "The URL has been copied to your clipboard",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Media Library</h2>
      </div>

      <div className="bg-card p-6 rounded-lg border mb-8">
        <h3 className="text-lg font-medium mb-4">Upload New Media</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file">Select File</Label>
            <Input id="file" type="file" onChange={handleFileChange} className="mt-1" />
          </div>
          <div>
            <Label htmlFor="alt_text">Alt Text</Label>
            <Input
              id="alt_text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Descriptive text for the image"
              className="mt-1"
            />
          </div>
          <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading media...</p>
        </div>
      ) : mediaItems.length === 0 ? (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No media items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mediaItems.map((item) => (
            <div key={item.id} className="bg-card rounded-lg border overflow-hidden">
              {item.file_type.startsWith("image/") ? (
                <div className="aspect-video bg-muted relative">
                  <img
                    src={item.url || "/placeholder.svg"}
                    alt={item.alt_text || item.file_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <div className="text-4xl text-muted-foreground">
                    {item.file_type.split("/")[1]?.toUpperCase() || "FILE"}
                  </div>
                </div>
              )}
              <div className="p-4">
                <h4 className="font-medium truncate" title={item.file_name}>
                  {item.file_name}
                </h4>
                <p className="text-sm text-muted-foreground">{formatFileSize(item.file_size)}</p>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(item.url)}>
                    Copy URL
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(item)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
