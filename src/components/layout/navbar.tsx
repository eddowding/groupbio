"use client"

import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Users, User, Settings, LogOut, Lightbulb, FileText, Map, Eye } from "lucide-react"
import { getGroupById } from "@/lib/dummy-data"

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Groups", href: "/groups" },
  { name: "Profile", href: "/profile" },
  { name: "Ideas", href: "/ideas" },
]

export function Navbar() {
  const pathname = usePathname()
  const params = useParams()
  const isPublic = pathname === "/" || pathname === "/join" || pathname === "/auth"
  
  // Check if we're on a group-specific page
  const isGroupPage = pathname.startsWith('/groups/') && params?.id
  const groupId = params?.id as string
  const group = isGroupPage ? getGroupById(groupId) : null

  if (isPublic) {
    return (
      <nav className="border-b bg-header-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <Users className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold">GroupBio</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/ideas">
                <Button variant="ghost" size="sm">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Ideas
                </Button>
              </Link>
              <Link href="/join">
                <Button variant="outline">Join Group</Button>
              </Link>
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }


  return (
    <nav className="border-b bg-header-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/dashboard" className="flex items-center">
              <Users className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">GroupBio</span>
            </Link>
            
            {/* Show group context when on group pages */}
            {isGroupPage && group && (
              <div className="hidden md:flex md:ml-8 md:items-center">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">/</span>
                  <Badge variant="secondary" className="text-sm">
                    {group.name}
                  </Badge>
                </div>
              </div>
            )}
            
            {/* Regular navigation for non-group pages */}
            {!isGroupPage && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      pathname.startsWith(item.href)
                        ? "border-b-2 border-primary text-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Quick access to main sections when on group pages */}
            {isGroupPage && (
              <div className="hidden lg:flex items-center gap-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link href="/groups">
                  <Button variant="ghost" size="sm">All Groups</Button>
                </Link>
              </div>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile/preview">
                    <Eye className="mr-2 h-4 w-4" />
                    How Others See You
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}