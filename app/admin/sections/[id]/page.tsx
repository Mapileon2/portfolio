import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { SectionEditor } from "@/components/admin/section-editor"

export default async function AdminSectionPage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  // If this is a new section, get the page ID from the query params
  let pageId = ""

  if (params.id === "new") {
    const url = new URL(cookies().get("next-url")?.value || "")
    pageId = url.searchParams.get("pageId") || ""

    if (!pageId) {
      redirect("/admin")
    }
  } else {
    // Get the page ID for this section
    const { data } = await supabase.from("sections").select("page_id").eq("id", params.id).single()

    if (!data) {
      redirect("/admin")
    }

    pageId = data.page_id
  }

  return (
    <div className="container mx-auto py-10">
      {params.id === "new" ? (
        <SectionEditor pageId={pageId} />
      ) : (
        <SectionEditor sectionId={params.id} pageId={pageId} />
      )}
    </div>
  )
}
