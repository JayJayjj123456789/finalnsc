// Travel Planning Types

export interface TravelPreferences {
  travel_mode: 'car' | 'bus' | 'train' | 'motorbike'
  eco_friendly: boolean
}

export interface ParsedIntent {
  duration: number
  budget: number
  travelers: number
  interests: string[]
  origin: string
  destination: string
  dietary: string[]
  raw_text: string
  confidence: number
}

export interface Location {
  lat: number
  lng: number
  address?: string
}

export interface Attraction {
  id: string
  name: string
  name_th: string
  category: 'nature' | 'culture' | 'food' | 'activity'
  description: string
  opening_hours?: string
  entry_fee: number
  duration_minutes: number
  location: Location
  image_url?: string
  community_owned: boolean
}

export interface Accommodation {
  id: string
  name: string
  name_th: string
  type: 'hotel' | 'homestay' | 'resort' | 'hostel'
  price_per_night: number
  rating: number
  location: Location
  amenities: string[]
  community_owned: boolean
}

export interface Restaurant {
  id: string
  name: string
  name_th: string
  cuisine: string
  price_range: string
  average_cost: number
  location: Location
  hours?: string
  community_owned: boolean
}

export interface DayPlan {
  day: number
  date?: string
  attractions: Attraction[]
  accommodation?: Accommodation
  restaurants: Restaurant[]
  transport_to_next?: {
    mode: string
    distance_km: number
    duration_minutes: number
  }
}

export interface RouteOption {
  id: string
  name: string
  description: string
  days: DayPlan[]
  cost_score: number
  time_score: number
  eco_score: number
  community_score: number
  total_score: number
  total_cost: number
  total_time_hours: number
  total_co2_kg: number
  community_percentage: number
  is_fallback: boolean
}

export interface CarbonBreakdown {
  transport_co2_kg: number
  accommodation_co2_kg: number
  activities_co2_kg: number
  total_co2_kg: number
}

export interface EcoComparison {
  your_footprint: number
  average_footprint: number
  savings_percent: number
  transport_mode_comparison: Record<string, number>
}

export interface EcoAssessment {
  carbon_breakdown: CarbonBreakdown
  eco_comparison: EcoComparison
  recommendations: string[]
}

export interface TravelPlanResponse {
  intent: ParsedIntent
  routes: RouteOption[]
  selected_route: RouteOption
  eco_assessment: EcoAssessment
  generated_at: string
  agent_version: string
  fallback_used: boolean
  fallback_sources: string[]
}
