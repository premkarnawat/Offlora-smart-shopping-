'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteBlog } from '@/lib/actions'
import { useRouter } from 'next/navigation'

interface Props {
  blogId: string
  blogTitle: string
}

export default function DeleteBlogButton({ blogId, blogTitle }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteBlog(blogId)
      router.refresh()
    } catch {
      alert('Failed to delete article')
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button onClick={handleDelete} disabled={loading} className="text-xs text-red-600 hover:text-red-800 font-sans disabled:opacity-50">
          {loading ? 'Deleting…' : 'Confirm'}
        </button>
        <button onClick={() => setConfirming(false)} className="text-xs text-bark-400 hover:text-bark-700 font-sans">
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-bark-300 hover:text-red-500 transition-colors" title={`Delete ${blogTitle}`}>
      <Trash2 size={14} strokeWidth={1.5} />
    </button>
  )
}
