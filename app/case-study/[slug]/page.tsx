import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Fetch the project
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <Link href="/#projects">
          <Button variant="ghost" size="sm" className="mb-4">
            ← Back to Projects
          </Button>
        </Link>
        <h1 className="font-heading text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-muted-foreground text-lg mb-6">{project.description}</p>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{project.role}</div>
          <div className="flex">
            {Array.from({ length: project.rating || 0 }).map((_, i) => (
              <span key={i} className="text-yellow-500">
                ★
              </span>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">{project.result}</div>
        </div>
      </div>

      {project.image_url && (
        <div className="mb-10 rounded-lg overflow-hidden">
          <Image
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* Render the project content */}
        {project.content &&
          typeof project.content === "object" &&
          Object.entries(project.content).map(([key, section]: [string, any]) => (
            <div key={key} className="mb-10">
              {section.title && <h2 className="text-2xl font-bold mb-4">{section.title}</h2>}
              {section.content && <div>{section.content}</div>}
              {section.image && (
                <Image
                  src={section.image || "/placeholder.svg"}
                  alt={section.title || "Project image"}
                  width={800}
                  height={400}
                  className="rounded-lg my-6"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}
