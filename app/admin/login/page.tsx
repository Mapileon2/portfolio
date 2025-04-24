"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2, Info, Check, X, AlertTriangle, Key } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// TEMPORARY HARDCODED ADMIN CREDENTIALS - CHANGE IMMEDIATELY AFTER FIRST LOGIN
// This is not secure for production and should only be used for initial setup
const TEMP_ADMIN_EMAIL = "admin@example.com"
const TEMP_ADMIN_PASSWORD = "Admin123!"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordValid, setPasswordValid] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(false)
  const [showPasswordChange, setShowPasswordChange] = useState(false)
  const [usingTempCredentials, setUsingTempCredentials] = useState(false)
  const [loginAttempts, setLoginAttempts] = useState(0)

  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  // Check for error or message in URL params
  useEffect(() => {
    const errorParam = searchParams.get("error")
    const messageParam = searchParams.get("message")

    if (errorParam) {
      setError(decodeURIComponent(errorParam))
    }

    if (messageParam) {
      setMessage(decodeURIComponent(messageParam))
    }
  }, [searchParams])

  // Validate password on change
  useEffect(() => {
    setPasswordValid(newPassword.length >= 8)
    setPasswordsMatch(newPassword === confirmPassword && newPassword !== "")
  }, [newPassword, confirmPassword])

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          console.error("Session check error:", error)
          return
        }

        if (data.session) {
          // We have a session, redirect to admin
          router.push("/admin")
        }
      } catch (error) {
        console.error("Unexpected error checking session:", error)
      }
    }

    checkSession()
  }, [router, supabase.auth])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setMessage(null)
    setLoginAttempts((prev) => prev + 1)

    try {
      // Check if fields are empty
      if (!email.trim() || !password.trim()) {
        throw new Error("Email and password are required")
      }

      // Check if using temporary admin credentials
      if (email.toLowerCase() === TEMP_ADMIN_EMAIL.toLowerCase() && password === TEMP_ADMIN_PASSWORD) {
        console.log("Using temporary admin credentials")
        setUsingTempCredentials(true)
        setShowPasswordChange(true)
        toast({
          title: "Temporary login successful",
          description: "Please set a permanent password now",
        })
        return
      }

      // Not temporary credentials, try normal login
      console.log("Attempting normal login with:", email)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        console.error("Supabase auth error:", signInError)
        throw signInError
      }

      if (!data.user) {
        throw new Error("Login failed. Please check your credentials.")
      }

      // Check if user has admin role in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single()

      if (profileError) {
        console.warn("Could not verify admin role:", profileError)
        // Continue anyway, we'll check on the server side too
      } else if (profileData?.role !== "admin") {
        throw new Error("You don't have admin privileges")
      }

      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard",
      })

      // Force a refresh to update the auth state
      router.refresh()

      // Redirect to admin dashboard
      router.push("/admin")
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "An error occurred during login")
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive",
      })

      // If multiple failed attempts, show helpful message
      if (loginAttempts >= 3) {
        setMessage("Having trouble? Try using the default admin credentials shown below.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordValid || !passwordsMatch) {
      setError("Please ensure your password meets all requirements")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      if (usingTempCredentials) {
        // Use the API route to create the admin account
        const response = await fetch("/api/admin/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: TEMP_ADMIN_EMAIL,
            password: newPassword,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "Failed to create admin account")
        }

        // Now sign in with the new credentials
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: TEMP_ADMIN_EMAIL,
          password: newPassword,
        })

        if (signInError) {
          throw signInError
        }

        toast({
          title: "Admin account setup complete",
          description: "You can now log in with your new password",
        })

        // Redirect to admin dashboard
        router.refresh()
        router.push("/admin")
      } else {
        // Regular password change for existing user
        const { error } = await supabase.auth.updateUser({
          password: newPassword,
        })

        if (error) {
          throw error
        }

        toast({
          title: "Password updated",
          description: "Your password has been updated successfully",
        })

        // Redirect to admin dashboard
        router.refresh()
        router.push("/admin")
      }
    } catch (error: any) {
      console.error("Password change error:", error)
      setError(error.message || "An error occurred while changing your password")
      toast({
        title: "Password change failed",
        description: error.message || "An error occurred while changing your password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // If showing password change form
  if (showPasswordChange) {
    return (
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Set Admin Password</CardTitle>
            <CardDescription>Create a secure password for your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert className="mb-4">
              <Key className="h-4 w-4" />
              <AlertDescription>
                You are setting up the admin account with email: <strong>{TEMP_ADMIN_EMAIL}</strong>
              </AlertDescription>
            </Alert>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="newPassword">New Password</Label>
                  <span className={`text-xs ${passwordValid ? "text-green-500" : "text-red-500"}`}>
                    {passwordValid ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Valid
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <X className="h-3 w-3 mr-1" />
                        Min 8 characters
                      </span>
                    )}
                  </span>
                </div>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className={newPassword && !passwordValid ? "border-red-500" : ""}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  {confirmPassword && (
                    <span className={`text-xs ${passwordsMatch ? "text-green-500" : "text-red-500"}`}>
                      {passwordsMatch ? (
                        <span className="flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          Matching
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          Not matching
                        </span>
                      )}
                    </span>
                  )}
                </div>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className={confirmPassword && !passwordsMatch ? "border-red-500" : ""}
                />
              </div>

              <div className="text-sm space-y-2 p-3 bg-muted rounded-md">
                <p className="font-medium">Password requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li className={passwordValid ? "text-green-500" : ""}>At least 8 characters long</li>
                  <li className={passwordsMatch ? "text-green-500" : ""}>Passwords must match</li>
                </ul>
              </div>

              <Button className="w-full" type="submit" disabled={isLoading || !passwordValid || !passwordsMatch}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up admin account...
                  </>
                ) : (
                  "Create Admin Account"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Regular login form
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
          <CardDescription>Access the portfolio management dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert className="mb-4">
              <Info className="h-4 w-4" />
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <AlertDescription>
              <strong>Temporary Admin Credentials:</strong>
              <br />
              Email: admin@example.com
              <br />
              Password: Admin123!
              <br />
              <span className="text-red-500 font-bold">Change these credentials immediately after first login!</span>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Return to{" "}
            <a href="/" className="text-primary hover:underline">
              Portfolio
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
