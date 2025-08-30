"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Eye,
  EyeOff,
  Locate,
  Phone,
  Mail
} from "lucide-react"

// Fix for default markers in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Member {
  id: string
  name: string
  email: string
  phone?: string
  location: {
    lat: number
    lng: number
    address: string
  }
  membership: {
    sharedFields: string[]
  }
}

interface MapComponentProps {
  members: Member[]
  userLocation: {lat: number, lng: number} | null
  centerLat: number
  centerLng: number
  selectedMember: Member | null
  setSelectedMember: (member: Member | null) => void
  showLabels: boolean
  setShowLabels: (show: boolean) => void
}

export default function MapComponent({ 
  members, 
  userLocation, 
  centerLat, 
  centerLng, 
  selectedMember, 
  setSelectedMember, 
  showLabels, 
  setShowLabels 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const userMarkerRef = useRef<L.Marker | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Create map instance
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [centerLat, centerLng],
      zoom: 13,
      zoomControl: true,
    })

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current)

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update map center when location changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([centerLat, centerLng], 13)
    }
  }, [centerLat, centerLng])

  // Add user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return

    // Remove existing user marker
    if (userMarkerRef.current) {
      mapInstanceRef.current.removeLayer(userMarkerRef.current)
    }

    // Create custom red icon for user location
    const userIcon = L.divIcon({
      html: `
        <div class="relative">
          <div class="w-6 h-6 bg-red-500 rounded-full border-4 border-white shadow-lg animate-pulse flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      `,
      className: 'custom-user-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    })

    // Add user marker
    userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(`
        <div class="p-2">
          <div class="font-semibold text-red-600 mb-1">Your Location</div>
          <div class="text-sm text-gray-600">Current position</div>
        </div>
      `)

  }, [userLocation])

  // Add member markers
  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Add member markers
    members.forEach(member => {
      // Create custom blue icon for members
      const memberIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            ${showLabels ? `
              <div class="absolute top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                ${member.name}
              </div>
            ` : ''}
          </div>
        `,
        className: 'custom-member-marker group',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })

      // Create popup content
      const popupContent = `
        <div class="p-3 min-w-64">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              ${member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <div class="font-medium">${member.name}</div>
              <div class="text-sm text-gray-600">${member.location.address}</div>
            </div>
          </div>
          
          <div class="space-y-2">
            ${member.membership.sharedFields.includes("phone") && member.phone ? `
              <div class="flex items-center gap-2 text-sm">
                <div class="w-4 h-4 text-gray-500">📞</div>
                <a href="tel:${member.phone}" class="text-blue-600 hover:underline">
                  ${member.phone}
                </a>
              </div>
            ` : ''}
            ${member.membership.sharedFields.includes("email") ? `
              <div class="flex items-center gap-2 text-sm">
                <div class="w-4 h-4 text-gray-500">📧</div>
                <a href="mailto:${member.email}" class="text-blue-600 hover:underline">
                  ${member.email}
                </a>
              </div>
            ` : ''}
          </div>
        </div>
      `

      const marker = L.marker([member.location.lat, member.location.lng], { icon: memberIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(popupContent)

      // Handle marker click
      marker.on('click', () => {
        setSelectedMember(selectedMember?.id === member.id ? null : member)
      })

      markersRef.current.push(marker)
    })

  }, [members, showLabels, selectedMember, setSelectedMember])

  const handleLocateUser = () => {
    if (mapInstanceRef.current && userLocation) {
      mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 15)
    }
  }

  return (
    <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLabels(!showLabels)}
          className="bg-white shadow-md"
        >
          {showLabels ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
        {userLocation && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLocateUser}
            className="bg-white shadow-md"
          >
            <Locate className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
        <div className="text-sm font-medium mb-2">Legend</div>
        <div className="space-y-1">
          {userLocation && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
              <span>Your Location</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <span>Group Members ({members.length})</span>
          </div>
        </div>
      </div>
    </div>
  )
}