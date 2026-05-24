import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Wallet, 
  TreePine, 
  Building2, 
  Sparkles, 
  ArrowRight, 
  Compass,
  Leaf,
  Users
} from 'lucide-react'
import TravelForm from '../components/TravelForm'
import { api } from '../services/api'

// Example prompts
const examplePrompts = [
  {
    text: "ไปเที่ยวนครราชสีมา 3 วัน 5000 บาท กับแฟน ชอบธรรมชาติ",
    icon: TreePine,
    tag: "ธรรมชาติ"
  },
  {
    text: "วางแผนทริปเขาใหญ่ 2 วัน 3000 บาท เดียว",
    icon: Compass,
    tag: "ผจญภัย"
  },
  {
    text: "ไปเที่ยวครอบครัว 4 คน 4 วัน 10000 บาท",
    icon: Users,
    tag: "ครอบครัว"
  },
]

// Features
const features = [
  {
    icon: MapPin,
    title: "เส้นทางอัจฉริยะ",
    description: "วางแผน day-by-day itinerary ตามความสนใจของคุณ"
  },
  {
    icon: Wallet,
    title: "จัดการงบประมาณ",
    description: "คำนวณค่าใช้จ่ายทั้งหมด รวมที่พัก อาหาร และค่าเดินทาง"
  },
  {
    icon: Leaf,
    title: "คำนวณคาร์บอน",
    description: "ติดตามผลกระทบสิ่งแวดล้อม และเลือกทางเลือกที่ยั่งยืน"
  },
  {
    icon: Building2,
    title: "สนับสนุนชุมชน",
    description: "แนะนำร้านค้าและที่พักท้องถิ่น สร้างรายได้ให้ชุมชน"
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (input: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await api.createPlan(input)
      sessionStorage.setItem('travelPlan', JSON.stringify(response))
      navigate('/result')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        
        {/* Decorative circles */}
        <div className="absolute top-20 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative container-ethereal pt-12 pb-16 md:pt-20 md:pb-24">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-on-surface-variant">
                Multi-Agent AI Planning
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center mb-6 animate-fade-in-up animate-delay-100">
            <span className="text-display md:text-5xl font-bold text-on-surface block">
              Smart Travel Planner
            </span>
          </h1>
          
          <p className="text-center text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-4 animate-fade-in-up animate-delay-200">
            วางแผนท่องเที่ยวอัจฉริยะด้วย AI สำหรับจังหวัดนครราชสีมา
          </p>
          
          <p className="text-center text-label text-outline max-w-xl mx-auto mb-12 animate-fade-in-up animate-delay-300">
            ครบวงจร: เส้นทาง • งบประมาณ • คาร์บอน • ชุมชน
          </p>

          {/* Main Form Card */}
          <div className="max-w-3xl mx-auto animate-fade-in-up animate-delay-400">
            <div className="glass-strong rounded-xl p-6 md:p-8 shadow-soft-lg">
              <TravelForm onSubmit={handleSubmit} loading={loading} />
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="section-spacing bg-surface-container-low">
        <div className="container-ethereal">
          <div className="text-center mb-12">
            <span className="chip chip-teal mb-4">ฟีเจอร์</span>
            <h2 className="text-headline text-on-surface mb-4">
              ทำไมต้อง Smart Travel Planner?
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              ระบบวางแผนท่องเที่ยวอัจฉริยะที่ช่วยให้การเดินทางของคุณสมบูรณ์แบบ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-on-surface mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Prompts Section */}
      <section className="section-spacing">
        <div className="container-ethereal">
          <div className="text-center mb-12">
            <span className="chip chip-teal mb-4">ตัวอย่าง</span>
            <h2 className="text-headline text-on-surface mb-4">
              ลองใช้งานได้เลย
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">
              คลิกที่ตัวอย่างด้านล่างเพื่อเริ่มวางแผนทันที
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handleSubmit(prompt.text)}
                disabled={loading}
                className="w-full text-left p-5 glass-card hover:border-primary group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <prompt.icon className="w-5 h-5 text-primary group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-caption text-primary">{prompt.tag}</span>
                    </div>
                    <p className="text-on-surface leading-relaxed">
                      {prompt.text}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-outline group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-outline-variant bg-surface-container-low">
        <div className="container-ethereal">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-on-surface-variant">
              Smart Travel Planner — NSC 2025 Competition
            </p>
            <p className="text-sm text-outline">
              3 Agents: Intent • Route • Eco Assessment
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}