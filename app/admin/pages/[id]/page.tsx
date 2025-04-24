import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { PageEditor } from "@/components/admin/page-editor"

export default async function AdminPagePage({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto py-10">
      <PageEditor pageId={params.id} />
    </div>
  )
}
