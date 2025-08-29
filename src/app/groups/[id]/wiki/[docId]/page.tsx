"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/navbar"
import { 
  ArrowLeft,
  Clock,
  User,
  Edit,
  FileText,
  BookOpen,
  AlertCircle,
  HelpCircle,
  Settings
} from "lucide-react"
import { getGroupById, getWikiDocs } from "@/lib/dummy-data"

export default function WikiDocument() {
  const params = useParams()
  const groupId = params.id as string
  const docId = params.docId as string
  const group = getGroupById(groupId)
  const wikiDocs = getWikiDocs(groupId)
  const doc = wikiDocs.find(d => d.id === docId)

  if (!group || !doc) {
    return <div>Document not found</div>
  }

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

  const renderMarkdownContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className="text-3xl font-bold mb-4 mt-8 first:mt-0 text-foreground">
            {line.substring(2)}
          </h1>
        )
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl font-semibold mb-3 mt-6 text-foreground">
            {line.substring(3)}
          </h2>
        )
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl font-medium mb-2 mt-4 text-foreground">
            {line.substring(4)}
          </h3>
        )
      }

      // Lists
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <div key={index} className="ml-6 mb-1 flex items-start">
            <span className="text-primary mr-2 mt-2 text-xs">•</span>
            <span>{line.substring(2)}</span>
          </div>
        )
      }

      // Bold text (simple **text** format)
      if (line.includes('**')) {
        const parts = line.split('**')
        return (
          <p key={index} className="mb-3 text-muted-foreground leading-relaxed">
            {parts.map((part, i) => 
              i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : part
            )}
          </p>
        )
      }

      // Empty lines
      if (line.trim() === '') {
        return <div key={index} className="h-2" />
      }

      // Regular paragraphs
      return (
        <p key={index} className="mb-3 text-muted-foreground leading-relaxed">
          {line}
        </p>
      )
    })
  }

  const CategoryIcon = getCategoryIcon(doc.category)

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
          <span className="text-foreground">{doc.title}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/groups/${group.id}/wiki`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Wiki
            </Button>
          </Link>
        </div>

        {/* Document Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CategoryIcon className="h-6 w-6 text-muted-foreground" />
                  <CardTitle className="text-2xl">{doc.title}</CardTitle>
                  <Badge className={`${getCategoryColor(doc.category)}`}>
                    {doc.category}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Last edited by {doc.lastModifiedBy}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(doc.lastModified).toLocaleDateString()}</span>
                  </div>
                  <div>
                    {doc.content.split(' ').length} words • {Math.ceil(doc.content.split(' ').length / 200)} min read
                  </div>
                </div>
              </div>
              
              <Link href={`/groups/${group.id}/wiki/${doc.id}/edit`}>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </Link>
            </div>
          </CardHeader>
        </Card>

        {/* Document Content */}
        <Card>
          <CardContent className="p-8">
            <div className="prose prose-neutral max-w-none">
              {renderMarkdownContent(doc.content)}
            </div>
          </CardContent>
        </Card>

        {/* Document Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            This document is part of the {group.name} wiki
          </div>
          
          <div className="flex gap-3">
            <Link href={`/groups/${group.id}/wiki/${doc.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit Document
              </Button>
            </Link>
            <Link href={`/groups/${group.id}/wiki`}>
              <Button variant="ghost">
                View All Documents
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Documents */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Other Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {wikiDocs
                .filter(d => d.id !== doc.id)
                .slice(0, 3)
                .map((relatedDoc) => {
                  const RelatedIcon = getCategoryIcon(relatedDoc.category)
                  return (
                    <Link
                      key={relatedDoc.id}
                      href={`/groups/${group.id}/wiki/${relatedDoc.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <RelatedIcon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="font-medium">{relatedDoc.title}</div>
                        <div className="text-sm text-muted-foreground">
                          Updated {new Date(relatedDoc.lastModified).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {relatedDoc.category}
                      </Badge>
                    </Link>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}