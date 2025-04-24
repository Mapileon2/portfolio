import { redirect } from "next/navigation"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import AdminDashboard from "@/components/admin/dashboard"

export default async function AdminPage() {
  const supabase = createServerComponentClient({ cookies })

  // Check if user is authenticated
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    console.error("Error getting session:", error)
    redirect("/admin/login?error=session-error")
  }

  if (!session) {
    redirect("/admin/login")
  }

  // Optionally check if user has admin role
  // This would need to be customized based on your actual role implementation
  try {
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (!profile || profile.role !== "admin") {
      redirect("/admin/login?error=unauthorized")
    }
  } catch (error) {
    console.error("Error checking admin status:", error)
    // Continue anyway, as the user is authenticated
  }

  return <AdminDashboard />
}
