"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/layout/navbar"
import { CheckCircle, Users, ArrowRight } from "lucide-react"

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    groupName: "",
    groupType: "",
    customGroupType: "",
    memberCount: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const groupTypes = [
    { value: "parent", label: "Parent Group", emoji: "👨‍👩‍👧‍👦" },
    { value: "sports", label: "Sports Team", emoji: "⚽" },
    { value: "professional", label: "Professional", emoji: "💼" },
    { value: "social", label: "Social Group", emoji: "🎉" },
    { value: "other", label: "Other", emoji: "📝" }
  ]

  const memberCounts = [
    { value: "1-10", label: "1-10 members" },
    { value: "11-50", label: "11-50 members" },
    { value: "51-150", label: "51-150 members" },
    { value: "151-500", label: "151-500 members" },
    { value: "500+", label: "500+ members" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.phone || !formData.groupName || !formData.groupType || !formData.memberCount) {
      return
    }

    if (formData.groupType === "other" && !formData.customGroupType) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          finalGroupType: formData.groupType === "other" ? formData.customGroupType : formData.groupType
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Thanks for signing up!</CardTitle>
              <CardDescription className="text-lg">
                We'll be in touch shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground">
                <p>We're excited to help you build your group community.</p>
                <p>Keep an eye on your inbox for updates!</p>
              </div>
              
              <Button className="w-full" asChild>
                <a href="/">
                  Back to Home
                </a>
              </Button>
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
          <h1 className="text-3xl font-bold mb-2">Create Your Group</h1>
          <p className="text-muted-foreground">
            Tell us about your group and we'll get you set up
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Group Information
            </CardTitle>
            <CardDescription>
              Help us understand what you're building
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="groupName">Group Name *</Label>
                  <Input
                    id="groupName"
                    placeholder="e.g., Sunshine Nursery Parents"
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="groupType">Group Type *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, groupType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your group type" />
                    </SelectTrigger>
                    <SelectContent>
                      {groupTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <span>{type.emoji}</span>
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.groupType === "other" && (
                  <div>
                    <Label htmlFor="customGroupType">Specify Group Type *</Label>
                    <Input
                      id="customGroupType"
                      placeholder="e.g., Book Club, Photography Group"
                      value={formData.customGroupType}
                      onChange={(e) => setFormData({ ...formData, customGroupType: e.target.value })}
                      required
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="memberCount">Estimated Number of Members *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, memberCount: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="How many people in your group?" />
                    </SelectTrigger>
                    <SelectContent>
                      {memberCounts.map((count) => (
                        <SelectItem key={count.value} value={count.value}>
                          {count.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isSubmitting || !formData.email || !formData.phone || !formData.groupName || !formData.groupType || !formData.memberCount || (formData.groupType === "other" && !formData.customGroupType)}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    Create Group
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a href="/auth" className="text-primary hover:underline">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  )
}