"use client"

import { useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Navbar } from "@/components/layout/navbar"
import { Mail, ArrowRight, Github, Chrome } from "lucide-react"
import { getGroupById } from "@/lib/dummy-data"

function AuthContent() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const searchParams = useSearchParams()
  const groupId = searchParams.get("groupId")
  const group = groupId ? getGroupById(groupId) : null

  const handleEmailLogin = async () => {
    if (!email) return
    
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1500)
  }

  const handleSocialLogin = (provider: string) => {
    // Simulate authentication and redirect to appropriate page
    setTimeout(() => {
      if (group) {
        // Redirect to profile setup for new group members
        window.location.href = `/profile/setup?groupId=${group.id}`
      } else {
        // Redirect to dashboard for regular login
        window.location.href = "/dashboard"
      }
    }, 1000)
  }

  if (emailSent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We've sent a magic link to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground space-y-2">
                <p>Click the link in your email to sign in instantly.</p>
                <p>The link will expire in 15 minutes.</p>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setEmailSent(false)}
                >
                  Try a different email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {group ? "Join Group" : "Welcome to GroupBio"}
          </h1>
          <p className="text-muted-foreground">
            {group 
              ? `Sign in to join ${group.name}`
              : "Sign in to your account or create a new one"
            }
          </p>
        </div>

        {group && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="font-medium text-primary">{group.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {group.description}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  {group.memberCount} members • Code: {group.code}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              We'll send you a magic link for secure, password-free access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEmailLogin()}
              />
            </div>

            <Button 
              onClick={handleEmailLogin} 
              className="w-full" 
              size="lg"
              disabled={!email || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Sending magic link...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Magic Link
                </>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => handleSocialLogin("google")}
              >
                <Chrome className="mr-2 h-4 w-4" />
                Continue with Google
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleSocialLogin("github")}
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
            </div>

            {group && (
              <div className="pt-4 border-t">
                <p className="text-xs text-muted-foreground text-center mb-4">
                  By joining this group, you agree to the{" "}
                  <Link href="/terms" className="underline">Terms of Service</Link>
                  {group.settings.terms && " and group guidelines"}
                </p>
                
                <Link href={`/profile/setup?groupId=${group.id}`}>
                  <Button className="w-full" size="lg">
                    Continue to Profile Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            New to GroupBio?{" "}
            <Link href="/" className="text-primary hover:underline">
              Learn more about how it works
            </Link>
          </p>
        </div>

        {/* Demo shortcut */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 text-center mb-3">
            <strong>Demo Mode:</strong> Skip authentication and explore the app
          </p>
          <Link href={group ? `/profile/setup?groupId=${group.id}` : "/dashboard"}>
            <Button variant="outline" className="w-full">
              {group ? `Enter Demo Profile Setup` : "Enter as Demo User (John Doe)"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Auth() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}