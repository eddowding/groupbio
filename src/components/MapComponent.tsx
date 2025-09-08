"use client"

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapComponentProps {
  lat?: number
  lng?: number
  zoom?: number
  markerText?: string
  height?: string
}

export default function MapComponent({ 
  lat = 37.7749, 
  lng = -122.4194, 
  zoom = 13,
  markerText = "San Francisco",
  height = "200px"
}: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div style={{ height }} className="bg-gray-100 rounded-lg animate-pulse" />
    )
  }

  return (
    <MapContainer 
      center={[lat, lng]} 
      zoom={zoom} 
      style={{ height, width: '100%' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>{markerText}</Popup>
      </Marker>
    </MapContainer>
  )
}