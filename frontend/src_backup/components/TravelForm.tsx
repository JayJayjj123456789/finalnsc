import { useState } from 'react'
import { Loader2, Sparkles } from 'lucide-react'

interface Props {
  onSubmit: (input: string) => void
  loading: boolean
}

export default function TravelForm({ onSubmit, loading }: Props) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !loading) {
      onSubmit(input.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-label text-on-surface mb-2">
          บอกเราว่าคุณอยากไปเที่ยวอย่างไร
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="เช่น: ไปเที่ยวนครราชสีมา 3 วัน 5000 บาท กับแฟน ชอบธรรมชาติ"
          className="textarea-ethereal"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={!input.trim() || loading}
        className="btn-primary w-full py-4 text-base"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            กำลังวางแผนด้วย AI...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            วางแผนทันที
          </>
        )}
      </button>

      <p className="text-center text-sm text-outline">
        💡 พิมพ์เป็นภาษาไทยได้เลย — AI จะเข้าใจความต้องการของคุณ
      </p>
    </form>
  )
}