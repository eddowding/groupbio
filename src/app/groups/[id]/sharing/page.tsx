"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/layout/navbar"
import { GroupHeader } from "@/components/layout/group-header"
import { 
  ArrowLeft,
  Shield,
  Eye,
  EyeOff,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Globe,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react"
import { getGroupById, getCurrentUser, getGroupMembers } from "@/lib/dummy-data"

export default function GroupSharingSettings() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const currentUser = getCurrentUser()
  const members = getGroupMembers(groupId)
  const currentMembership = members.find(m => m.id === currentUser?.id)?.membership

  // Mock current sharing settings - in real app this would come from API
  const [sharingSettings, setSharingSettings] = useState({
    name: true, // Always required
    email: true,
    phone: false,
    location: true,
    bio: false,
    company: false,
    website: false,
  })

  if (!group || !currentUser) {
    return <div>Group not found</div>
  }

  const profileFields = [
    { 
      key: "name", 
      label: "Full Name", 
      description: "Your display name in this group",
      icon: User,
      required: true,
      sensitive: false
    },
    { 
      key: "email", 
      label: "Email Address", 
      description: "Allow members to contact you via email",
      icon: Mail,
      required: false,
      sensitive: true
    },
    { 
      key: "phone", 
      label: "Phone Number", 
      description: "Share your phone for direct contact",
      icon: Phone,
      required: false,
      sensitive: true
    },
    { 
      key: "location", 
      label: "Location", 
      description: "Show your location on group map",
      icon: MapPin,
      required: false,
      sensitive: true
    },
    { 
      key: "bio", 
      label: "Bio", 
      description: "Personal description and interests",
      icon: User,
      required: false,
      sensitive: false
    },
    { 
      key: "company", 
      label: "Company", 
      description: "Where you work",
      icon: Briefcase,
      required: false,
      sensitive: false
    },
    { 
      key: "website", 
      label: "Website", 
      description: "Personal or professional website",
      icon: Globe,
      required: false,
      sensitive: false
    },
  ]

  const handleToggle = (fieldKey: string) => {
    if (fieldKey === "name") return // Name is always required
    
    setSharingSettings(prev => ({
      ...prev,
      [fieldKey]: !prev[fieldKey]
    }))
  }

  const sharedFieldsCount = Object.values(sharingSettings).filter(Boolean).length
  const totalFields = profileFields.length

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <GroupHeader group={group} currentMembership={currentMembership} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Privacy Settings</h1>
              <p className="text-muted-foreground text-lg">
                Control what information you share with {group.name}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Privacy Settings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Field Visibility</span>
                  <Badge variant="outline">
                    {sharedFieldsCount} of {totalFields} shared
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Choose which profile fields are visible to other members of {group.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {profileFields.map((field) => {
                  const Icon = field.icon
                  const isShared = sharingSettings[field.key as keyof typeof sharingSettings]
                  
                  return (
                    <div key={field.key} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{field.label}</span>
                            {field.required && (
                              <Badge variant="secondary" className="text-xs">
                                Required
                              </Badge>
                            )}
                            {field.sensitive && (
                              <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                                Sensitive
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {field.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {isShared ? (
                          <Eye className="h-4 w-4 text-green-600" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        )}
                        <Switch
                          checked={isShared}
                          onCheckedChange={() => handleToggle(field.key)}
                          disabled={field.required}
                        />
                      </div>
                    </div>
                  )
                })}

                <div className="flex gap-3 pt-4 border-t">
                  <Button>
                    Save Changes
                  </Button>
                  <Link href={`/profile/preview`}>
                    <Button variant="outline">
                      Preview Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Privacy Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Privacy Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-blue-800">
                  <div className="flex items-center justify-between text-sm">
                    <span>Visible fields:</span>
                    <Badge variant="secondary">
                      {sharedFieldsCount}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Hidden fields:</span>
                    <Badge variant="outline">
                      {totalFields - sharedFieldsCount}
                    </Badge>
                  </div>
                  
                  {sharingSettings.location && (
                    <div className="pt-2 border-t border-blue-200">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4" />
                        <span>Location visible on group map</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Group Rules */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Group Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Name is always required and visible</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>You can change these settings anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span>Only group members can see shared information</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/profile/preview`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview Your Profile
                  </Button>
                </Link>
                <Link href={`/profile`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile Info
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}