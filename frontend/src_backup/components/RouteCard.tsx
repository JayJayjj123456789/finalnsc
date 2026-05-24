import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Coins,
  TreePine,
  Building2,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import type { RouteOption, DayPlan } from '../types'

interface Props {
  route: RouteOption
  isSelected: boolean
  onSelect: () => void
  rank?: number
}

// Score Bar Component
function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-on-surface-variant w-20">{label}</span>
      <div className="flex-1 h-1.5 bg-surface-container rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <span className="text-sm font-semibold text-on-surface w-12 text-right">
        {(value * 100).toFixed(0)}%
      </span>
    </div>
  )
}

// Day Accordion Component
function DayAccordion({ day, dayIndex }: { day: DayPlan; dayIndex: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-surface-container-low hover:bg-surface-container transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-primary text-white rounded-lg flex items-center justify-center font-semibold text-sm">
            {dayIndex + 1}
          </div>
          <div className="text-left">
            <div className="font-medium text-on-surface">วันที่ {dayIndex + 1}</div>
            <div className="text-sm text-on-surface-variant">
              {day.attractions.length} สถานที่ · {day.restaurants.length} ร้านอาหาร
              {day.accommodation ? ' · ที่พัก 1 แห่ง' : ''}
            </div>
          </div>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-outline" />
        ) : (
          <ChevronDown className="w-5 h-5 text-outline" />
        )}
      </button>

      {open && (
        <div className="p-4 space-y-3 bg-surface-container-lowest">
          {/* Attractions */}
          {day.attractions.map((attraction) => (
            <div key={attraction.id} className="flex items-start gap-3 p-3 bg-green-50/50 rounded-lg border border-green-100">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-on-surface">{attraction.name_th}</div>
                <div className="text-sm text-on-surface-variant mt-0.5">{attraction.description}</div>
                <div className="flex items-center gap-3 mt-2 text-xs text-outline">
                  <span>ค่าเข้าชม: ฿{attraction.entry_fee}</span>
                  <span>•</span>
                  <span>{attraction.duration_minutes} นาที</span>
                </div>
              </div>
            </div>
          ))}

          {/* Restaurants */}
          {day.restaurants.map((restaurant) => (
            <div key={restaurant.id} className="flex items-start gap-3 p-3 bg-orange-50/50 rounded-lg border border-orange-100">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-on-surface">{restaurant.name_th}</div>
                <div className="text-sm text-on-surface-variant mt-0.5">
                  {restaurant.cuisine} · {restaurant.price_range}
                </div>
                <div className="text-xs text-outline mt-2">
                  เฉลี่ย: ฿{restaurant.average_cost}/คน
                </div>
              </div>
            </div>
          ))}

          {/* Accommodation */}
          {day.accommodation && (
            <div className="flex items-start gap-3 p-3 bg-purple-50/50 rounded-lg border border-purple-100">
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-on-surface">{day.accommodation.name_th}</div>
                <div className="text-sm text-on-surface-variant mt-0.5">
                  {day.accommodation.type} · ⭐ {day.accommodation.rating}
                </div>
                <div className="text-xs text-outline mt-2">
                  ฿{day.accommodation.price_per_night}/คืน
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Main RouteCard Component
export default function RouteCard({ route, isSelected, onSelect, rank }: Props) {
  const rankColors = [
    'bg-yellow-400 text-yellow-900',
    'bg-gray-300 text-gray-700',
    'bg-amber-500 text-amber-900',
  ]

  return (
    <div
      className={`glass-card overflow-hidden cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-primary border-primary' : ''
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="p-5 border-b border-outline-variant bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            {rank !== undefined && (
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${rankColors[rank] || 'bg-surface-container text-on-surface'}`}>
                #{rank + 1}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-on-surface">{route.name}</h3>
              <p className="text-sm text-on-surface-variant mt-0.5">{route.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {route.is_fallback && (
              <span className="chip bg-yellow-100 text-yellow-700 text-xs">
                Fallback
              </span>
            )}
            {isSelected && (
              <div className="flex items-center gap-1.5 text-primary font-medium text-sm">
                <CheckCircle2 className="w-4 h-4" />
                เลือกแล้ว
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
            <Coins className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-xs text-outline">ค่าใช้จ่ายรวม</div>
            <div className="font-semibold text-on-surface">฿{route.total_cost.toLocaleString()}</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-xs text-outline">เวลาทั้งหมด</div>
            <div className="font-semibold text-on-surface">{route.total_time_hours}h</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TreePine className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-xs text-outline">CO₂</div>
            <div className="font-semibold text-on-surface">{route.total_co2_kg.toFixed(1)} kg</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-xs text-outline">ชุมชน</div>
            <div className="font-semibold text-on-surface">{route.community_percentage}%</div>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div className="px-5 pb-5 space-y-3">
        <div className="text-label text-on-surface-variant mb-2">คะแนนตามน้ำหนัก</div>
        <ScoreBar label="ค่าใช้จ่าย (0.4)" value={route.cost_score} color="bg-primary" />
        <ScoreBar label="เวลา (0.3)" value={route.time_score} color="bg-blue-500" />
        <ScoreBar label="สิ่งแวดล้อม (0.2)" value={route.eco_score} color="bg-emerald-500" />
        <ScoreBar label="ชุมชน (0.1)" value={route.community_score} color="bg-purple-500" />

        <div className="pt-3 border-t border-outline-variant mt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-on-surface">คะแนนรวม</span>
            <span className="text-2xl font-bold text-primary">{(route.total_score * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>

      {/* Day Plans */}
      <div className="border-t border-outline-variant">
        <div className="p-5">
          <div className="text-label text-on-surface-variant mb-3">รายละเอียดแต่ละวัน</div>
          <div className="space-y-2">
            {route.days.map((day, index) => (
              <DayAccordion key={index} day={day} dayIndex={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
