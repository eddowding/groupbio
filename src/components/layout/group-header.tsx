"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Users, 
  MapPin, 
  Calendar, 
  Settings,
  FileText,
  Crown
} from "lucide-react"

interface GroupHeaderProps {
  group: {
    id: string
    name: string
    description: string
    type: string
    memberCount: number
    createdAt: string
    code: string
    settings: {
      allowMap: boolean
    }
  }
  currentMembership?: {
    role: string
  }
}

export function GroupHeader({ group, currentMembership }: GroupHeaderProps) {
  const pathname = usePathname()
  const isAdmin = currentMembership?.role === "admin"
  
  return (
    <div className="sticky top-16 z-40 bg-background border-b">
      {/* Group Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-6 border-b">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="text-4xl">
                {group.type === "parent" ? "👨‍👩‍👧‍👦" : 
                 group.type === "sports" ? "⚽" : 
                 group.type === "professional" ? "💼" : "👥"}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{group.name}</h1>
                <p className="text-muted-foreground text-lg">{group.description}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{group.memberCount} members</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Created {new Date(group.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary">{group.code}</Badge>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {isAdmin && (
              <Link href={`/admin/groups/${group.id}`}>
                <Button>
                  <Settings className="mr-2 h-4 w-4" />
                  Manage
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-1">
          <Link 
            href={`/groups/${group.id}`}
            className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              pathname === `/groups/${group.id}` 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <Users className="h-4 w-4" />
            Members
          </Link>
          
          <Link 
            href={`/groups/${group.id}/wiki`}
            className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              pathname.startsWith(`/groups/${group.id}/wiki`) 
                ? "border-primary text-primary" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            }`}
          >
            <FileText className="h-4 w-4" />
            Documents
          </Link>
          
          {group.settings.allowMap && (
            <Link 
              href={`/groups/${group.id}/map`}
              className={`inline-flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                pathname.startsWith(`/groups/${group.id}/map`) 
                  ? "border-primary text-primary" 
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <MapPin className="h-4 w-4" />
              Map
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}