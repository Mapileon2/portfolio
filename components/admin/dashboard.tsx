"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import PagesList from "@/components/admin/pages-list"
import ProjectsList from "@/components/admin/projects-list"
import MediaLibrary from "@/components/admin/media-library"
import { signOut, logAuthEvent } from "@/lib/auth-utils"
import { AnimatedButton } from "@/contexts/animation-provider"

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("pages")
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        setLoading(true)
        logAuthEvent("Checking user in admin dashboard")

        const { data, error } = await supabase.auth.getUser()

        if (error) {
          logAuthEvent("Auth error in dashboard", { error: error.message })
          throw error
        }

        if (!data.user) {
          logAuthEvent("No user found in dashboard")
          // No user found, redirect to login
          router.push("/admin/login")
          return
        }

        // Check if user has admin role
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          logAuthEvent("Error fetching profile in dashboard", { error: profileError.message })
          console.warn("Error fetching profile:", profileError)
          // Continue anyway
        } else if (profileData?.role !== "admin") {
          logAuthEvent("Non-admin attempted to access dashboard", { userId: data.user.id })
          throw new Error("You don't have admin privileges")
        }

        setUser(data.user)
        logAuthEvent("User authenticated in dashboard", { userId: data.user.id })
      } catch (error: any) {
        console.error("Auth error:", error)
        setError(error.message || "Authentication error")

        toast({
          title: "Authentication error",
          description: error.message || "Please sign in again",
          variant: "destructive",
        })

        // Attempt to sign out and redirect
        await signOut()
        router.push("/admin/login")
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      logAuthEvent("Auth state changed", { event })

      if (event === "SIGNED_OUT") {
        router.push("/admin/login")
      } else if (event === "SIGNED_IN" && session) {
        setUser(session.user)
      }
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase, router, toast])

  const handleSignOut = async () => {
    try {
      setLoading(true)
      logAuthEvent("Sign out attempt from dashboard")

      const result = await signOut()

      if (!result.success) {
        throw new Error(result.error || "Failed to sign out")
      }

      toast({
        title: "Signed out successfully",
      })

      router.push("/admin/login")
    } catch (error: any) {
      console.error("Error signing out:", error)
      toast({
        title: "Error signing out",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[50vh]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          </motion.div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={() => router.push("/admin/login")}>
            Return to Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="container mx-auto py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          {user && (
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
          )}
          <AnimatedButton
            variant="outline"
            onClick={handleSignOut}
            className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
          >
            Sign Out
          </AnimatedButton>
        </div>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <TabsList className="mb-8">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="media">Media Library</TabsTrigger>
          </TabsList>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="pages">
              <PagesList />
            </TabsContent>

            <TabsContent value="projects">
              <ProjectsList />
            </TabsContent>

            <TabsContent value="media">
              <MediaLibrary />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  )
}
