"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { 
  ArrowLeft,
  FileText,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Settings,
  Save,
  Eye
} from "lucide-react"
import { getGroupById } from "@/lib/dummy-data"

function NewWikiDocumentContent() {
  const params = useParams()
  const searchParams = useSearchParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const preselectedCategory = searchParams.get('category') || 'general'

  const [formData, setFormData] = useState({
    title: '',
    category: preselectedCategory,
    content: ''
  })

  if (!group) {
    return <div>Group not found</div>
  }

  const categories = [
    { id: "general", label: "General", icon: BookOpen, color: "bg-blue-100 text-blue-800 border-blue-200" },
    { id: "rules", label: "Rules", icon: AlertCircle, color: "bg-red-100 text-red-800 border-red-200" },
    { id: "faq", label: "FAQ", icon: HelpCircle, color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    { id: "resources", label: "Resources", icon: Settings, color: "bg-green-100 text-green-800 border-green-200" },
  ]

  const selectedCategory = categories.find(c => c.id === formData.category)
  const CategoryIcon = selectedCategory?.icon || FileText

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to the database
    console.log('Saving document:', formData)
    // Redirect to the wiki page
    window.location.href = `/groups/${groupId}/wiki`
  }

  const sampleContent = {
    general: `# Welcome to ${group.name}

This document contains general information about our group.

## About Us
Add information about your group's purpose and mission here.

## Getting Started
- Step 1: Complete your profile
- Step 2: Review group guidelines
- Step 3: Introduce yourself to other members

## Contact Information
Include relevant contact details or meeting information.`,

    rules: `# Group Rules and Guidelines

Please read and follow these important guidelines for ${group.name}.

## Code of Conduct
- **Be respectful** - Treat all members with courtesy and respect
- **Stay on topic** - Keep discussions relevant to the group's purpose
- **No spam** - Avoid excessive posting or promotional content

## Communication Guidelines
- Use clear and concise language
- Be mindful of different time zones
- Respect privacy settings of other members

## Consequences
Violations of these rules may result in warnings or removal from the group.`,

    faq: `# Frequently Asked Questions

Common questions and answers for ${group.name} members.

## General Questions

**Q: How do I update my profile information?**
A: Go to your Profile page and click "Edit Profile" to update your information.

**Q: How do I control what information is visible to the group?**
A: Visit the Privacy Settings page from the group menu to adjust your sharing preferences.

**Q: Can I join multiple groups?**
A: Yes, you can be a member of multiple groups with different privacy settings for each.

## Technical Questions

**Q: How do I report a problem?**
A: Contact the group administrators through the contact information provided.`,

    resources: `# Resources and Links

Useful resources for ${group.name} members.

## Important Links
- [Group Website](#) - Main website (if applicable)
- [Calendar](#) - Upcoming events and meetings
- [Contact Form](#) - Get in touch with organizers

## Documents
- Meeting schedules
- Reference materials
- Shared files and documents

## Tools and Services
List any tools, services, or platforms the group uses for communication and collaboration.`
  }

  const loadSample = () => {
    setFormData(prev => ({
      ...prev,
      content: sampleContent[formData.category as keyof typeof sampleContent] || sampleContent.general
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href={`/groups/${group.id}`} className="hover:text-foreground">
            {group.name}
          </Link>
          <span>/</span>
          <Link href={`/groups/${group.id}/wiki`} className="hover:text-foreground">
            Wiki
          </Link>
          <span>/</span>
          <span className="text-foreground">New Document</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Link href={`/groups/${group.id}/wiki`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wiki
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Create New Document</h1>
              <p className="text-muted-foreground text-lg">
                Add a new document to the {group.name} wiki
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CategoryIcon className="h-5 w-5" />
                    Document Details
                  </CardTitle>
                  <CardDescription>
                    Fill in the basic information for your new document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Welcome Guide, Group Rules, FAQ"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => {
                          const Icon = category.icon
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="content">Content</Label>
                      <Button type="button" variant="outline" size="sm" onClick={loadSample}>
                        Load Sample Content
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      placeholder="Write your document content here. You can use Markdown formatting."
                      className="min-h-[400px] font-mono text-sm"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports Markdown formatting: **bold**, *italic*, # headers, - bullet points
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Document
                    </Button>
                    <Button type="button" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Category Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Category Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{formData.title || "Untitled Document"}</div>
                      <Badge className={`text-xs ${selectedCategory?.color}`}>
                        {selectedCategory?.label}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Writing Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-blue-800 space-y-2 text-sm">
                    <p>• Use clear, concise language</p>
                    <p>• Organize content with headers</p>
                    <p>• Include relevant links and resources</p>
                    <p>• Review before publishing</p>
                    <p>• Keep content up to date</p>
                  </div>
                </CardContent>
              </Card>

              {/* Markdown Help */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Markdown Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm font-mono">
                    <div><strong># Heading 1</strong></div>
                    <div><strong>## Heading 2</strong></div>
                    <div><strong>**Bold text**</strong></div>
                    <div><strong>*Italic text*</strong></div>
                    <div><strong>- Bullet point</strong></div>
                    <div><strong>[Link text](url)</strong></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewWikiDocument() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewWikiDocumentContent />
    </Suspense>
  )
}