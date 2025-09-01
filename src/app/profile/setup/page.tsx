"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/layout/navbar"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Heart,
  Briefcase,
  Globe,
  CheckCircle
} from "lucide-react"
import { getGroupById } from "@/lib/dummy-data"

function ProfileSetupContent() {
  const searchParams = useSearchParams()
  const groupId = searchParams.get("groupId")
  const group = groupId ? getGroupById(groupId) : null

  const [currentStep, setCurrentStep] = useState(1)
  const [isComplete, setIsComplete] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    interests: "",
    linkedin: "",
    website: ""
  })

  const [privacySettings, setPrivacySettings] = useState<Record<string, boolean>>({
    name: true,
    email: group?.settings.requiredFields.includes("email") || false,
    phone: group?.settings.requiredFields.includes("phone") || false,
    location: false,
    bio: false,
    interests: true,
    linkedin: false,
    website: false
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handlePrivacyChange = (field: string, value: boolean) => {
    if (group?.settings.requiredFields.includes(field)) return
    setPrivacySettings(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleComplete = () => {
    // Simulate profile creation
    console.log("Creating profile:", { formData, privacySettings, groupId })
    setIsComplete(true)
    
    // Redirect to group dashboard after 3 seconds
    setTimeout(() => {
      window.location.href = `/groups/${groupId}`
    }, 3000)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Basic Information"
      case 2: return "Personal Details" 
      case 3: return "Privacy Settings"
      default: return "Setup Complete"
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Let's start with the essentials"
      case 2: return "Help others connect with you"
      case 3: return `Choose what to share with ${group?.name}`
      default: return ""
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() && formData.email.trim() && 
               (!group?.settings.requiredFields.includes("phone") || formData.phone.trim())
      case 2:
        return true // Optional step
      case 3:
        return true // Privacy is always valid
      default:
        return false
    }
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Group Not Found</h2>
            <p className="text-muted-foreground mb-4">
              The group you're trying to join doesn't exist or the link is invalid.
            </p>
            <Button asChild>
              <a href="/join">Find a Group</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Welcome to {group.name}!</CardTitle>
              <CardDescription className="text-lg">
                Your profile has been created successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground">
                <p>You're now a member of {group.name}.</p>
                <p>Redirecting to your group dashboard...</p>
              </div>
              
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              
              <Button className="w-full" asChild>
                <a href={`/groups/${group.id}`}>
                  Go to Group Dashboard
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
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Join {group.name}</h1>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of 3
            </div>
          </div>
          
          <div className="flex gap-2 mb-4">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex-1 h-2 rounded-full ${
                  step <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
            <p className="text-muted-foreground">{getStepDescription()}</p>
          </div>
        </div>

        {/* Group Info Card */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-primary">{group.name}</h3>
                <p className="text-sm text-muted-foreground">{group.description}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {group.memberCount} members
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {currentStep === 1 && <User className="h-5 w-5" />}
              {currentStep === 2 && <Heart className="h-5 w-5" />}
              {currentStep === 3 && <div className="h-5 w-5 rounded bg-primary/20" />}
              {getStepTitle()}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">
                    Phone Number {group.settings.requiredFields.includes("phone") && "*"}
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                  {group.settings.requiredFields.includes("phone") && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Required by this group for communication
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">About You</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell the group a bit about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-24"
                  />
                </div>

                <div>
                  <Label htmlFor="interests">Interests & Hobbies</Label>
                  <Input
                    id="interests"
                    placeholder="Photography, Cooking, Hiking..."
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                  />
                </div>

                {(group.type === "professional" || group.type === "parent") && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn (Optional)</Label>
                      <Input
                        id="linkedin"
                        placeholder="linkedin.com/in/yourname"
                        value={formData.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website (Optional)</Label>
                      <Input
                        id="website"
                        placeholder="yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm">
                    Choose which information you'd like to share with other members of <strong>{group.name}</strong>.
                    You can change these settings anytime in your profile.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { key: "name", label: "Full Name", icon: User },
                    { key: "email", label: "Email Address", icon: Mail },
                    { key: "phone", label: "Phone Number", icon: Phone },
                    { key: "location", label: "Location", icon: MapPin },
                    { key: "bio", label: "Bio", icon: User },
                    { key: "interests", label: "Interests", icon: Heart },
                    { key: "linkedin", label: "LinkedIn", icon: Briefcase },
                    { key: "website", label: "Website", icon: Globe }
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <Label className="font-medium">{label}</Label>
                          {formData[key as keyof typeof formData] && (
                            <p className="text-xs text-muted-foreground truncate max-w-48">
                              {formData[key as keyof typeof formData]}
                            </p>
                          )}
                        </div>
                        {group.settings.requiredFields.includes(key) && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                      </div>
                      <Switch
                        checked={privacySettings[key]}
                        onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
                        disabled={group.settings.requiredFields.includes(key)}
                      />
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Sharing:</strong> {Object.values(privacySettings).filter(Boolean).length} fields • 
                    <strong> Required:</strong> {group.settings.requiredFields.length} fields
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : null}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === 3 ? "Complete Setup" : "Continue"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function ProfileSetup() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileSetupContent />
    </Suspense>
  )
}