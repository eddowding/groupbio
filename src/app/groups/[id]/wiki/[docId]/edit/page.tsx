"use client"

import Link from "next/link"
import { useState } from "react"
import { useParams } from "next/navigation"
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
  Eye,
  Trash2
} from "lucide-react"
import { getGroupById, getWikiDocs } from "@/lib/dummy-data"

export default function EditWikiDocument() {
  const params = useParams()
  const groupId = params.id as string
  const docId = params.docId as string
  const group = getGroupById(groupId)
  const wikiDocs = getWikiDocs(groupId)
  const doc = wikiDocs.find(d => d.id === docId)

  const [formData, setFormData] = useState({
    title: doc?.title || '',
    category: doc?.category || 'general',
    content: doc?.content || ''
  })

  if (!group || !doc) {
    return <div>Document not found</div>
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
    // In a real app, this would update the document in the database
    console.log('Updating document:', formData)
    // Redirect to the document page
    window.location.href = `/groups/${groupId}/wiki/${docId}`
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      // In a real app, this would delete the document
      console.log('Deleting document:', docId)
      window.location.href = `/groups/${groupId}/wiki`
    }
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
          <Link href={`/groups/${group.id}/wiki/${doc.id}`} className="hover:text-foreground">
            {doc.title}
          </Link>
          <span>/</span>
          <span className="text-foreground">Edit</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Link href={`/groups/${group.id}/wiki/${doc.id}`}>
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Document
            </Button>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Edit Document</h1>
              <p className="text-muted-foreground text-lg">
                Make changes to "{doc.title}"
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
                    Update the document information and content
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
                    <Label htmlFor="content">Content</Label>
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
                      Save Changes
                    </Button>
                    <Button type="button" variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      onClick={handleDelete}
                      className="ml-auto"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Document Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>
                      <div>{new Date(doc.lastModified).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last modified by:</span>
                      <div>{doc.lastModifiedBy}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Word count:</span>
                      <div>{formData.content.split(' ').length} words</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reading time:</span>
                      <div>{Math.ceil(formData.content.split(' ').length / 200)} min</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Preview */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Preview</CardTitle>
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

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href={`/groups/${group.id}/wiki/${doc.id}`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Eye className="h-4 w-4 mr-2" />
                      View Document
                    </Button>
                  </Link>
                  <Link href={`/groups/${group.id}/wiki`}>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Wiki
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}