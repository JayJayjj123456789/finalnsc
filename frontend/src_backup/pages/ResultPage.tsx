import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Share2,
  TreePine,
  AlertTriangle,
  BarChart3,
  Map as MapIcon,
  Leaf,
  Check,
} from 'lucide-react'
import type { TravelPlanResponse } from '../types'
import RouteCard from '../components/RouteCard'
import Map from '../components/Map'

export default function ResultPage() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState<TravelPlanResponse | null>(null)
  const [selectedRouteId, setSelectedRouteId] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'routes' | 'eco' | 'map'>('routes')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('travelPlan')
    if (stored) {
      try {
        const parsed: TravelPlanResponse = JSON.parse(stored)
        setPlan(parsed)
        setSelectedRouteId(parsed.selected_route?.id || parsed.routes?.[0]?.id || '')
      } catch (e) {
        setError('Failed to load travel plan')
      }
    } else {
      setError('No travel plan found. Please create one first.')
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-on-surface mb-2">{error}</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary mt-4"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    )
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant">กำลังโหลดแผนการเดินทาง...</p>
        </div>
      </div>
    )
  }

  const selectedRoute = plan.routes.find((r) => r.id === selectedRouteId) || plan.selected_route || plan.routes[0]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-20 glass-strong border-b border-outline-variant">
        <div className="container-ethereal">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 rounded-lg hover:bg-surface-container transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-on-surface" />
              </button>
              <div>
                <h1 className="font-semibold text-on-surface">ผลการวางแผน</h1>
                <p className="text-sm text-on-surface-variant">
                  {plan.intent.travelers} คน · {plan.intent.duration} วัน · ฿{plan.intent.budget.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {plan.fallback_used && (
                <span className="chip bg-yellow-100 text-yellow-700">
                  <AlertTriangle className="w-3 h-3" />
                  Fallback
                </span>
              )}
              <button className="p-2 rounded-lg hover:bg-surface-container transition-colors">
                <Share2 className="w-5 h-5 text-on-surface-variant" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 -mb-px">
            {[
              { id: 'routes', label: 'เส้นทาง', icon: BarChart3 },
              { id: 'eco', label: 'คาร์บอน', icon: TreePine },
              { id: 'map', label: 'แผนที่', icon: MapIcon },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-label font-medium border-b-2 transition-colors ${
                  activeTab === id
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container-ethereal py-8">
        {activeTab === 'routes' && (
          <div className="space-y-8">
            {/* Intent Summary Card */}
            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg text-on-surface mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                สรุปความต้องการของคุณ
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                <div>
                  <div className="text-caption text-outline mb-1">ระยะเวลา</div>
                  <div className="font-semibold text-on-surface">{plan.intent.duration} วัน</div>
                </div>
                <div>
                  <div className="text-caption text-outline mb-1">งบประมาณ</div>
                  <div className="font-semibold text-on-surface">฿{plan.intent.budget.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-caption text-outline mb-1">จำนวนผู้เดินทาง</div>
                  <div className="font-semibold text-on-surface">{plan.intent.travelers} คน</div>
                </div>
                <div>
                  <div className="text-caption text-outline mb-1">ความสนใจ</div>
                  <div className="font-semibold text-on-surface">{plan.intent.interests.join(', ') || '-'}</div>
                </div>
              </div>
              <div className="p-4 bg-surface-container rounded-lg">
                <p className="text-on-surface-variant italic">"{plan.intent.raw_text}"</p>
              </div>
              <div className="mt-3 text-xs text-outline">
                Confidence: {(plan.intent.confidence * 100).toFixed(0)}% · Version: {plan.agent_version}
              </div>
            </div>

            {/* Route Cards */}
            <div>
              <h2 className="font-semibold text-lg text-on-surface mb-6">
                {plan.routes.length} เส้นทางที่แนะนำ
              </h2>
              <div className="space-y-4">
                {plan.routes.map((route, index) => (
                  <RouteCard
                    key={route.id}
                    route={route}
                    isSelected={route.id === selectedRouteId}
                    onSelect={() => setSelectedRouteId(route.id)}
                    rank={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eco' && plan.eco_assessment && (
          <div className="space-y-6">
            {/* Carbon Breakdown */}
            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg text-on-surface mb-6 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                การปล่อยก๊าซคาร์บอน
              </h2>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-5 bg-surface-container rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {plan.eco_assessment.carbon_breakdown.transport_co2_kg.toFixed(1)}
                  </div>
                  <div className="text-sm text-on-surface-variant">การเดินทาง (kg)</div>
                </div>
                <div className="text-center p-5 bg-surface-container rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {plan.eco_assessment.carbon_breakdown.accommodation_co2_kg.toFixed(1)}
                  </div>
                  <div className="text-sm text-on-surface-variant">ที่พัก (kg)</div>
                </div>
                <div className="text-center p-5 bg-surface-container rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {plan.eco_assessment.carbon_breakdown.activities_co2_kg.toFixed(1)}
                  </div>
                  <div className="text-sm text-on-surface-variant">กิจกรรม (kg)</div>
                </div>
              </div>

              <div className="p-6 bg-primary/5 rounded-xl text-center border border-primary/20">
                <div className="text-4xl font-bold text-primary mb-1">
                  {plan.eco_assessment.carbon_breakdown.total_co2_kg.toFixed(1)}
                </div>
                <div className="text-on-surface-variant">รวม CO₂ (kg)</div>
              </div>
            </div>

            {/* Comparison */}
            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg text-on-surface mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                เปรียบเทียบกับค่าเฉลี่ย
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant">รอยเท้าของคุณ</span>
                  <span className="font-semibold text-on-surface">
                    {plan.eco_assessment.eco_comparison.your_footprint.toFixed(1)} kg CO₂
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-surface-container rounded-lg">
                  <span className="text-on-surface-variant">ค่าเฉลี่ยทั่วไป</span>
                  <span className="font-semibold text-on-surface">
                    {plan.eco_assessment.eco_comparison.average_footprint.toFixed(1)} kg CO₂
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-on-surface font-medium">คุณประหยัดได้</span>
                  <span className="font-bold text-primary text-lg">
                    {plan.eco_assessment.eco_comparison.savings_percent.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="glass-card p-6">
              <h2 className="font-semibold text-lg text-on-surface mb-6 flex items-center gap-2">
                <Check className="w-5 h-5 text-primary" />
                คำแนะนำเพื่อลดคาร์บอน
              </h2>
              <ul className="space-y-3">
                {plan.eco_assessment.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 bg-surface-container rounded-lg">
                    <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-on-surface">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'map' && selectedRoute && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg text-on-surface">
                แผนที่: {selectedRoute.name}
              </h2>
              <select
                value={selectedRouteId}
                onChange={(e) => setSelectedRouteId(e.target.value)}
                className="input-ethereal py-2 px-4 w-auto"
              >
                {plan.routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="glass-card p-4">
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-on-surface-variant">สถานที่ท่องเที่ยว</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-on-surface-variant">ร้านอาหาร</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-on-surface-variant">ที่พัก</span>
                </div>
              </div>
              <Map route={selectedRoute} className="h-[500px] rounded-lg" />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-outline-variant text-center text-sm text-outline">
          สร้างเมื่อ {new Date(plan.generated_at).toLocaleString('th-TH')} · Smart Travel Planner v{plan.agent_version}
        </div>
      </div>
    </div>
  )
}
