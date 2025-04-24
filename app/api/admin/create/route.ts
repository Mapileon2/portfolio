import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Validate inputs
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Password validation
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    // Initialize Supabase client with admin privileges
    const supabase = createRouteHandlerClient({ cookies })

    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email)
      .limit(1)

    if (checkError) {
      console.error("Error checking existing user:", checkError)
    } else if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create the user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: "Admin User",
        role: "admin",
      },
    })

    if (error) {
      console.error("Error creating admin user:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Ensure profile is created with admin role
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: "Admin User",
        role: "admin",
        needs_password_change: false,
        email: email, // Store email in profiles for easier queries
      })

      if (profileError) {
        console.error("Error creating admin profile:", profileError)
        // Continue anyway, the auth user is created
      }
    }

    return NextResponse.json({ success: true, userId: data.user.id })
  } catch (error: any) {
    console.error("Unexpected error creating admin:", error)
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 })
  }
}
