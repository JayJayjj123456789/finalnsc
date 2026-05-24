import { useEffect, useRef, useState } from 'react'
import type { RouteOption } from '../types'

interface Props {
  route: RouteOption
  className?: string
}

export default function Map({ route, className = '' }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [L, setL] = useState<any>(null)

  useEffect(() => {
    // Dynamic import for leaflet
    import('leaflet').then((leaflet) => {
      import('react-dom/client').then(() => {
        setL(leaflet.default || leaflet)
      })
    })
  }, [])

  useEffect(() => {
    if (!L || !mapRef.current) return

    const map = L.map(mapRef.current).setView([14.97, 102.1], 10)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map)

    // Collect all locations from the route
    const allLocations: { lat: number; lng: number; name: string; type: string }[] = []

    route.days.forEach((day) => {
      day.attractions.forEach((a) => {
        allLocations.push({
          lat: a.location.lat,
          lng: a.location.lng,
          name: a.name_th,
          type: 'attraction',
        })
      })
      day.restaurants.forEach((r) => {
        allLocations.push({
          lat: r.location.lat,
          lng: r.location.lng,
          name: r.name_th,
          type: 'restaurant',
        })
      })
      if (day.accommodation) {
        allLocations.push({
          lat: day.accommodation.location.lat,
          lng: day.accommodation.location.lng,
          name: day.accommodation.name_th,
          type: 'accommodation',
        })
      }
    })

    // Add markers
    const iconColors: Record<string, string> = {
      attraction: '#22c55e', // green
      restaurant: '#f97316', // orange
      accommodation: '#3b82f6', // blue
    }

    allLocations.forEach((loc) => {
      const color = iconColors[loc.type] || '#6b7280'

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br/>${loc.type}`)
    })

    // Fit bounds to show all markers
    if (allLocations.length > 0) {
      const bounds = L.latLngBounds(
        allLocations.map((l) => [l.lat, l.lng] as [number, number])
      )
      map.fitBounds(bounds, { padding: [50, 50] })
    }

    return () => {
      map.remove()
    }
  }, [L, route])

  return <div ref={mapRef} className={`h-96 w-full rounded-xl ${className}`} />
}