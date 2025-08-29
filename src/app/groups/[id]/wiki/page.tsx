"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/navbar"
import { GroupHeader } from "@/components/layout/group-header"
import { 
  FileText, 
  Plus, 
  Search, 
  Clock, 
  User,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Settings,
  ArrowLeft
} from "lucide-react"
import { getGroupById, getWikiDocs } from "@/lib/dummy-data"

export default function GroupWiki() {
  const params = useParams()
  const groupId = params.id as string
  const group = getGroupById(groupId)
  const wikiDocs = getWikiDocs(groupId)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  if (!group) {
    return <div>Group not found</div>
  }

  // Mock current membership for header
  const currentMembership = { role: "member" }

  const categories = [
    { id: "all", label: "All Documents", icon: BookOpen, count: wikiDocs.length },
    { id: "general", label: "General", icon: FileText, count: wikiDocs.filter(d => d.category === "general").length },
    { id: "rules", label: "Rules", icon: AlertCircle, count: wikiDocs.filter(d => d.category === "rules").length },
    { id: "faq", label: "FAQ", icon: HelpCircle, count: wikiDocs.filter(d => d.category === "faq").length },
    { id: "resources", label: "Resources", icon: Settings, count: wikiDocs.filter(d => d.category === "resources").length },
  ]

  const filteredDocs = wikiDocs.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general": return BookOpen
      case "rules": return AlertCircle  
      case "faq": return HelpCircle
      case "resources": return Settings
      default: return FileText
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "general": return "bg-blue-100 text-blue-800 border-blue-200"
      case "rules": return "bg-red-100 text-red-800 border-red-200"
      case "faq": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resources": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <GroupHeader group={group} currentMembership={currentMembership} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Documents</h1>
                  <p className="text-muted-foreground">
                    Collaborative documentation for your group
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Link href={`/groups/${group.id}/wiki/new`}>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Document
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-muted transition-colors ${
                          selectedCategory === category.id ? 'bg-muted' : ''
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span>{category.label}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/groups/${group.id}/wiki/new?category=general`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add General Info
                  </Button>
                </Link>
                <Link href={`/groups/${group.id}/wiki/new?category=rules`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Rules
                  </Button>
                </Link>
                <Link href={`/groups/${group.id}/wiki/new?category=faq`}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Add FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <div className="mb-6">
              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-3 text-base bg-white w-full border-2 focus:border-primary"
                />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {filteredDocs.length} document{filteredDocs.length !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Documents Grid */}
            <div className="grid gap-6">
              {filteredDocs.length > 0 ? (
                filteredDocs.map((doc) => {
                  const CategoryIcon = getCategoryIcon(doc.category)
                  return (
                    <Card key={doc.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                              <CardTitle className="text-xl">{doc.title}</CardTitle>
                              <Badge className={`text-xs ${getCategoryColor(doc.category)}`}>
                                {doc.category}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                <span>Last edited by {doc.lastModifiedBy}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{new Date(doc.lastModified).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Content Preview */}
                          <div className="text-muted-foreground">
                            {doc.content.split('\n').slice(0, 3).map((line, idx) => {
                              if (line.startsWith('#')) {
                                return (
                                  <h4 key={idx} className="font-medium text-foreground mb-1">
                                    {line.replace(/^#+\s/, '')}
                                  </h4>
                                )
                              }
                              if (line.startsWith('•') || line.startsWith('-')) {
                                return (
                                  <div key={idx} className="ml-4 text-sm">
                                    {line.replace(/^[•-]\s/, '• ')}
                                  </div>
                                )
                              }
                              return line ? (
                                <p key={idx} className="text-sm">
                                  {line.length > 120 ? `${line.substring(0, 120)}...` : line}
                                </p>
                              ) : null
                            })}
                          </div>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="text-sm text-muted-foreground">
                              {doc.content.split(' ').length} words • {Math.ceil(doc.content.split(' ').length / 200)} min read
                            </div>
                            <div className="flex gap-2">
                              <Link href={`/groups/${group.id}/wiki/${doc.id}`}>
                                <Button size="sm">Read</Button>
                              </Link>
                              <Link href={`/groups/${group.id}/wiki/${doc.id}/edit`}>
                                <Button variant="outline" size="sm">Edit</Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No documents found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery 
                        ? `No documents match "${searchQuery}"`
                        : "This group doesn't have any wiki documents yet."
                      }
                    </p>
                    <Link href={`/groups/${group.id}/wiki/new`}>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create First Document
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Getting Started */}
        {wikiDocs.length === 0 && (
          <Card className="mt-8 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Getting Started with Your Wiki</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4 text-blue-800">
                <div>
                  <h4 className="font-medium mb-2">📝 Welcome Message</h4>
                  <p className="text-sm">Create a welcome document with group guidelines and introductions.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📋 Rules & Guidelines</h4>
                  <p className="text-sm">Document important rules, expectations, and group policies.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">📚 Resources</h4>
                  <p className="text-sm">Share useful links, schedules, and reference materials.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}