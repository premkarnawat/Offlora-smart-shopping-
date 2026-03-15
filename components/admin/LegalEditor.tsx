'use client'

import { useState } from 'react'
import { updateLegalPage } from '@/lib/actions'
import { ChevronDown, ChevronUp, Save } from 'lucide-react'

interface Props {
  type: string
  label: string
  initialTitle: string
  initialContent: string
}

export default function LegalEditor({ type, label, initialTitle, initialContent }: Props) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateLegalPage(type, title, content)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    } catch {
      alert('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white border border-cream-300">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-serif text-xl text-bark-900" style={{ fontFamily: 'Cormorant, serif' }}>{label}</span>
        {open ? <ChevronUp size={16} strokeWidth={1.5} className="text-bark-400" /> : <ChevronDown size={16} strokeWidth={1.5} className="text-bark-400" />}
      </button>

      {open && (
        <div className="px-6 pb-6 space-y-4 border-t border-cream-200 pt-5">
          <div>
            <label className="block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2">Page Title</label>
            <input
              className="w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-3 py-2.5 text-sm font-sans text-bark-900 transition-colors"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-bark-500 font-sans mb-2">Content (HTML supported)</label>
            <textarea
              className="w-full bg-transparent border border-cream-300 focus:border-bark-500 outline-none px-3 py-2.5 text-sm font-sans font-mono text-bark-900 transition-colors min-h-[400px] resize-y"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-bark-900 text-cream-100 px-5 py-2.5 text-xs tracking-widest uppercase font-sans hover:bg-bark-800 transition-colors disabled:opacity-60"
            >
              <Save size={12} strokeWidth={1.5} />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            {saved && <span className="text-xs text-sage-600 font-sans">✓ Saved successfully</span>}
          </div>
        </div>
      )}
    </div>
  )
}
