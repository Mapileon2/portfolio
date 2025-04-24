import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Log authentication events for debugging
export const logAuthEvent = (event: string, details?: any) => {
  console.log(`[Auth] ${event}`, details || "")
}

// Authenticate an admin user
export const authenticateAdmin = async (email: string, password: string) => {
  try {
    const supabase = createClientComponentClient()

    // Attempt to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      logAuthEvent("Authentication error", { email, error: error.message })
      return { success: false, error: error.message }
    }

    if (!data.user) {
      return { success: false, error: "No user returned after authentication" }
    }

    // Check if user has admin role
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    if (profileError) {
      logAuthEvent("Profile fetch error", { userId: data.user.id, error: profileError.message })
      // Continue anyway, we'll check on the server side too
    } else if (profileData?.role !== "admin") {
      return { success: false, error: "You don't have admin privileges" }
    }

    return { success: true, user: data.user }
  } catch (error: any) {
    logAuthEvent("Unexpected authentication error", { email, error: error.message })
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

// Create a new admin account
export const createAdminAccount = async (email: string, password: string) => {
  try {
    const supabase = createClientComponentClient()

    // First check if the user already exists
    const {
      data: { users },
      error: getUserError,
    } = await supabase.auth.admin.listUsers()

    if (getUserError) {
      // If we can't check existing users, try direct sign-up
      logAuthEvent("Could not check existing users", { error: getUserError.message })
    } else {
      // Check if user exists
      const userExists = users?.some((user) => user.email?.toLowerCase() === email.toLowerCase())

      if (userExists) {
        logAuthEvent("Admin user already exists, updating password")

        // Try to sign in with the email first
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: "Admin123!", // Try with the default password
        })

        if (signInError) {
          // If sign-in fails, we'll need admin privileges to reset the password
          // For now, we'll return an error suggesting to use the API route
          return {
            success: false,
            error: "Cannot update existing admin password. Please contact support.",
          }
        }

        // Update password if sign-in succeeded
        const { error: updateError } = await supabase.auth.updateUser({
          password,
        })

        if (updateError) {
          return { success: false, error: updateError.message }
        }

        return { success: true }
      }
    }

    // If user doesn't exist or we couldn't check, try to create a new user
    // We'll use the API route for this since client-side signup might not have admin privileges
    const response = await fetch("/api/admin/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return { success: false, error: result.error || "Failed to create admin account" }
    }

    return { success: true }
  } catch (error: any) {
    logAuthEvent("Admin account creation error", { email, error: error.message })
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}

export async function signOut() {
  try {
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      logAuthEvent("Sign out error", { error: error.message })
      return { success: false, error: error.message }
    }

    logAuthEvent("Sign out successful")
    return { success: true }
  } catch (error: any) {
    logAuthEvent("Unexpected sign out error", { error: error.message })
    return { success: false, error: error.message || "An unexpected error occurred" }
  }
}
