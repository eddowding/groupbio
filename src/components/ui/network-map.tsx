"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network } from "lucide-react"

interface Member {
  id: string
  name: string
  initials: string
  groups: string[]
  color: string
}

interface NetworkMapProps {
  members?: Member[]
  className?: string
}

export function NetworkMap({ members, className }: NetworkMapProps) {
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  // Sample data for demonstration
  const defaultMembers: Member[] = [
    { id: "1", name: "Alex Chen", initials: "AC", groups: ["Soccer Team", "Book Club", "Work Friends"], color: "#3B82F6" },
    { id: "2", name: "Sarah Johnson", initials: "SJ", groups: ["Book Club", "Yoga Group", "Neighbors"], color: "#10B981" },
    { id: "3", name: "Mike Rodriguez", initials: "MR", groups: ["Soccer Team", "Work Friends"], color: "#F59E0B" },
    { id: "4", name: "Emma Wilson", initials: "EW", groups: ["Yoga Group", "Book Club"], color: "#EF4444" },
    { id: "5", name: "David Kim", initials: "DK", groups: ["Work Friends", "Neighbors"], color: "#8B5CF6" },
    { id: "6", name: "Lisa Thompson", initials: "LT", groups: ["Neighbors", "Soccer Team"], color: "#EC4899" },
  ]

  const activeMembers = members || defaultMembers

  // Calculate positions for members in a circle
  const positions = useMemo(() => {
    const centerX = 200
    const centerY = 200
    const radius = 120

    return activeMembers.map((member, index) => {
      const angle = (index / activeMembers.length) * 2 * Math.PI - Math.PI / 2
      return {
        id: member.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })
  }, [activeMembers])

  // Calculate connections based on common groups
  const connections = useMemo(() => {
    const conns: Array<{ from: string; to: string; commonGroups: string[] }> = []
    
    for (let i = 0; i < activeMembers.length; i++) {
      for (let j = i + 1; j < activeMembers.length; j++) {
        const member1 = activeMembers[i]
        const member2 = activeMembers[j]
        const commonGroups = member1.groups.filter(group => member2.groups.includes(group))
        
        if (commonGroups.length > 0) {
          conns.push({
            from: member1.id,
            to: member2.id,
            commonGroups,
          })
        }
      }
    }
    
    return conns
  }, [activeMembers])

  const getPosition = (memberId: string) => {
    return positions.find(p => p.id === memberId) || { x: 0, y: 0 }
  }

  const getMember = (memberId: string) => {
    return activeMembers.find(m => m.id === memberId)
  }

  const getConnectionOpacity = (connection: { commonGroups: string[] }) => {
    if (selectedMember) {
      return connection.from === selectedMember || connection.to === selectedMember ? 1 : 0.1
    }
    return Math.min(0.3 + connection.commonGroups.length * 0.2, 1)
  }

  const getMemberOpacity = (memberId: string) => {
    if (!selectedMember) return 1
    if (memberId === selectedMember) return 1
    
    // Check if this member is connected to the selected member
    const isConnected = connections.some(conn => 
      (conn.from === selectedMember && conn.to === memberId) ||
      (conn.to === selectedMember && conn.from === memberId)
    )
    
    return isConnected ? 1 : 0.3
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Network className="h-5 w-5 text-primary" />
          <CardTitle>Group Network Map</CardTitle>
        </div>
        <CardDescription>
          Visualizing connections between group members based on shared groups
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <svg width="400" height="400" className="border rounded-lg bg-gray-50">
              {/* Render connections first (behind nodes) */}
              {connections.map((connection, index) => {
                const fromPos = getPosition(connection.from)
                const toPos = getPosition(connection.to)
                
                return (
                  <line
                    key={index}
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke="#6B7280"
                    strokeWidth={Math.max(1, connection.commonGroups.length)}
                    opacity={getConnectionOpacity(connection)}
                    className="transition-opacity duration-200"
                  />
                )
              })}
              
              {/* Render member nodes */}
              {activeMembers.map((member) => {
                const pos = getPosition(member.id)
                
                return (
                  <g key={member.id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="20"
                      fill={member.color}
                      opacity={getMemberOpacity(member.id)}
                      className="cursor-pointer transition-opacity duration-200 hover:opacity-100"
                      onClick={() => setSelectedMember(selectedMember === member.id ? null : member.id)}
                    />
                    <text
                      x={pos.x}
                      y={pos.y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {member.initials}
                    </text>
                  </g>
                )
              })}
            </svg>
            
            {/* Legend */}
            <div className="absolute top-2 right-2 bg-white p-2 rounded border text-xs">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-3 h-0.5 bg-gray-400"></div>
                <span>Common groups</span>
              </div>
              <div className="text-gray-500">Click member to highlight</div>
            </div>
          </div>

          {/* Selected member info */}
          {selectedMember && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: getMember(selectedMember)?.color }}
                >
                  {getMember(selectedMember)?.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{getMember(selectedMember)?.name}</h4>
                  <p className="text-sm text-gray-600">{getMember(selectedMember)?.groups.length} groups</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Member of:</h5>
                <div className="flex flex-wrap gap-1">
                  {getMember(selectedMember)?.groups.map((group, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {group}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Show connections */}
              <div className="mt-3 pt-3 border-t border-blue-200">
                <h5 className="text-sm font-medium mb-2">Connected to:</h5>
                <div className="space-y-1">
                  {connections
                    .filter(conn => conn.from === selectedMember || conn.to === selectedMember)
                    .map((conn, index) => {
                      const connectedMemberId = conn.from === selectedMember ? conn.to : conn.from
                      const connectedMember = getMember(connectedMemberId)
                      
                      return (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="font-medium">{connectedMember?.name}</span>
                          <div className="flex gap-1">
                            {conn.commonGroups.map((group, gIndex) => (
                              <Badge key={gIndex} variant="outline" className="text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{activeMembers.length}</div>
              <div className="text-sm text-gray-600">Members</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{connections.length}</div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {Math.round((connections.length / (activeMembers.length * (activeMembers.length - 1) / 2)) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Density</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}