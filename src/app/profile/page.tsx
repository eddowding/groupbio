"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Navbar } from "@/components/layout/navbar"
import { 
  User, 
  Briefcase, 
  Heart, 
  Shield, 
  MapPin,
  Phone,
  Mail,
  Globe,
  Linkedin,
  Twitter,
  Save
} from "lucide-react"
import { dummyUsers, getUserGroups } from "@/lib/dummy-data"

// Simulate logged in user (John Doe - id: "1")
const currentUserId = "1"
const currentUser = dummyUsers.find(u => u.id === currentUserId)!
const userGroups = getUserGroups(currentUserId)

export default function Profile() {
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || "",
    bio: currentUser.bio || "",
    linkedin: currentUser.linkedin || "",
    twitter: currentUser.twitter || "",
    website: currentUser.website || "",
    location: currentUser.location?.address || "",
    interests: currentUser.interests?.join(", ") || ""
  })

  const [privacySettings, setPrivacySettings] = useState<Record<string, boolean>>({
    name: true,
    email: true,
    phone: true,
    bio: true,
    linkedin: true,
    twitter: false,
    website: true,
    location: true,
    interests: true
  })

  const [groupPrivacy, setGroupPrivacy] = useState<Record<string, Record<string, boolean>>>(
    userGroups.reduce((acc, group) => {
      acc[group.id] = {
        name: group.membership.sharedFields.includes("name"),
        email: group.membership.sharedFields.includes("email"),
        phone: group.membership.sharedFields.includes("phone"),
        bio: group.membership.sharedFields.includes("bio"),
        linkedin: group.membership.sharedFields.includes("linkedin"),
        twitter: group.membership.sharedFields.includes("twitter"),
        website: group.membership.sharedFields.includes("website"),
        location: group.membership.sharedFields.includes("location"),
        interests: group.membership.sharedFields.includes("interests")
      }
      return acc
    }, {} as Record<string, Record<string, boolean>>)
  )

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Simulate save
    console.log("Saving profile:", formData)
    // Show success toast or redirect
  }

  const fieldIcons = {
    name: User,
    email: Mail,
    phone: Phone,
    bio: User,
    linkedin: Linkedin,
    twitter: Twitter,
    website: Globe,
    location: MapPin,
    interests: Heart
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your information and privacy settings
          </p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-2xl">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>
                      Your core profile information visible to group members
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
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

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    className="min-h-20"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Work-related details for professional networking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/yourname"
                      value={formData.linkedin}
                      onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      placeholder="https://yourwebsite.com"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Personal details and interests for social connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="twitter">Twitter/X Handle</Label>
                  <Input
                    id="twitter"
                    placeholder="@yourusername"
                    value={formData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="interests">Interests & Hobbies</Label>
                  <Textarea
                    id="interests"
                    placeholder="Cooking, Photography, Hiking..."
                    value={formData.interests}
                    onChange={(e) => handleInputChange("interests", e.target.value)}
                    className="min-h-20"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate multiple interests with commas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                  <CardDescription>
                    Control what information is shared with each group
                  </CardDescription>
                </CardHeader>
              </Card>

              {userGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </div>
                      <Badge variant={group.membership.role === "admin" ? "default" : "secondary"}>
                        {group.membership.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Choose which fields to share with this group:
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(fieldIcons).map(([field, Icon]) => (
                          <div key={field} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              <Label htmlFor={`${group.id}-${field}`} className="capitalize">
                                {field === "bio" ? "Bio" : field}
                              </Label>
                              {group.settings.requiredFields.includes(field) && (
                                <Badge variant="outline" className="text-xs">Required</Badge>
                              )}
                            </div>
                            <Switch
                              id={`${group.id}-${field}`}
                              checked={groupPrivacy[group.id]?.[field] || false}
                              onCheckedChange={(checked) => {
                                if (group.settings.requiredFields.includes(field)) return
                                setGroupPrivacy(prev => ({
                                  ...prev,
                                  [group.id]: {
                                    ...prev[group.id],
                                    [field]: checked
                                  }
                                }))
                              }}
                              disabled={group.settings.requiredFields.includes(field)}
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          <strong>Shared:</strong> {Object.values(groupPrivacy[group.id] || {}).filter(Boolean).length} fields • 
                          <strong> Required:</strong> {group.settings.requiredFields.length} fields
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}