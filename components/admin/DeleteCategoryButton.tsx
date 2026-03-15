'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Props {
  categoryId: string
  categoryName: string
  productCount: number
}

export default function DeleteCategoryButton({ categoryId, categoryName, productCount }: Props) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/admin/categories?id=${categoryId}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        alert(data.error || 'Failed to delete category')
        return
      }
      router.refresh()
    } catch {
      alert('Failed to delete category')
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-xs text-red-600 hover:text-red-800 font-sans disabled:opacity-50 min-h-0"
        >
          {loading ? 'Deleting…' : 'Confirm'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-bark-400 hover:text-bark-700 font-sans min-h-0"
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => {
        if (productCount > 0) {
          alert(`Cannot delete "${categoryName}" — it has ${productCount} product(s). Delete or reassign those products first.`)
          return
        }
        setConfirming(true)
      }}
      className="text-bark-300 hover:text-red-500 transition-colors p-1 min-h-0"
      title={`Delete ${categoryName}`}
    >
      <Trash2 size={13} strokeWidth={1.5} />
    </button>
  )
}
