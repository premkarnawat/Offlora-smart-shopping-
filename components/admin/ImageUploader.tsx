'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Star, Loader2, ImagePlus, AlertCircle } from 'lucide-react'

export interface UploadedImageRecord {
  id: string           // ProductImage or UploadedImage DB id
  url: string          // /api/images/<id>
  alt: string
  isPrimary: boolean
  filename?: string
  size?: number
  isExisting?: boolean // true = already a ProductImage row (edit mode)
}

interface Props {
  images: UploadedImageRecord[]
  onChange: (images: UploadedImageRecord[]) => void
  maxImages?: number
}

const MAX_SIZE_MB = 4
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImageUploader({ images, onChange, maxImages = 8 }: Props) {
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const uploadFile = async (file: File): Promise<UploadedImageRecord | null> => {
    // Client-side validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrors((e) => [...e, `"${file.name}" — invalid type. Use JPEG, PNG, WebP, or GIF.`])
      return null
    }
    if (file.size > MAX_SIZE_BYTES) {
      setErrors((e) => [...e, `"${file.name}" — too large (${formatBytes(file.size)}). Max ${MAX_SIZE_MB}MB.`])
      return null
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('alt', file.name.replace(/\.[^.]+$/, ''))

    const res = await fetch('/api/images/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Upload failed' }))
      setErrors((e) => [...e, `"${file.name}" — ${err.error}`])
      return null
    }

    const data = await res.json()
    return {
      id: data.id,
      url: data.url,
      alt: file.name.replace(/\.[^.]+$/, ''),
      isPrimary: images.length === 0, // first image is primary by default
      filename: data.filename,
      size: data.size,
    }
  }

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      setErrors([])
      const fileArr = Array.from(files)
      const remaining = maxImages - images.length
      if (remaining <= 0) {
        setErrors([`Maximum ${maxImages} images allowed.`])
        return
      }

      const toUpload = fileArr.slice(0, remaining)
      setUploading(true)

      const results = await Promise.all(toUpload.map(uploadFile))
      const successful = results.filter(Boolean) as UploadedImageRecord[]

      if (successful.length > 0) {
        // Ensure exactly one primary
        const newImages = [...images, ...successful]
        if (!newImages.some((img) => img.isPrimary)) {
          newImages[0].isPrimary = true
        }
        onChange(newImages)
      }

      setUploading(false)
    },
    [images, maxImages, onChange]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles]
  )

  const setPrimary = (index: number) => {
    onChange(images.map((img, i) => ({ ...img, isPrimary: i === index })))
  }

  const updateAlt = (index: number, alt: string) => {
    onChange(images.map((img, i) => (i === index ? { ...img, alt } : img)))
  }

  const remove = async (index: number) => {
    const img = images[index]
    // Optionally delete from DB — fire and forget
    fetch(`/api/images/product?id=${img.id}`, { method: 'DELETE' }).catch(() => {})

    const newImages = images.filter((_, i) => i !== index)
    // Re-assign primary if removed image was primary
    if (img.isPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true
    }
    onChange(newImages)
  }

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      {images.length < maxImages && (
        <div
          onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-sm cursor-pointer transition-all duration-200 ${
            dragging
              ? 'border-bark-500 bg-bark-50/50'
              : 'border-cream-300 hover:border-bark-400 bg-cream-50 hover:bg-cream-100/50'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ALLOWED_TYPES.join(',')}
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            {uploading ? (
              <>
                <Loader2 size={28} strokeWidth={1.5} className="text-bark-400 animate-spin mb-3" />
                <p className="text-sm text-bark-500 font-sans">Uploading to database…</p>
              </>
            ) : (
              <>
                <ImagePlus size={28} strokeWidth={1.5} className={`mb-3 transition-colors ${dragging ? 'text-bark-600' : 'text-bark-300'}`} />
                <p className="text-sm font-sans text-bark-700 font-medium mb-1">
                  {dragging ? 'Drop to upload' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-xs font-sans text-bark-400">
                  JPEG, PNG, WebP, GIF · Max {MAX_SIZE_MB}MB per image · Up to {maxImages} images
                </p>
                <p className="text-xs font-sans text-bark-400 mt-1">
                  Images are stored directly in your Neon PostgreSQL database
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-3 space-y-1">
          {errors.map((err, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-red-600 font-sans">
              <AlertCircle size={12} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
              {err}
            </div>
          ))}
        </div>
      )}

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`relative group border-2 transition-all duration-200 ${
                img.isPrimary ? 'border-bark-700' : 'border-cream-200 hover:border-bark-300'
              }`}
            >
              {/* Preview */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || 'Product image'}
                className="w-full aspect-square object-cover"
              />

              {/* Primary badge */}
              {img.isPrimary && (
                <div className="absolute top-1.5 left-1.5 bg-bark-900 text-cream-100 text-xs px-1.5 py-0.5 font-sans flex items-center gap-1">
                  <Star size={9} strokeWidth={1.5} className="fill-cream-100" />
                  Primary
                </div>
              )}

              {/* Actions overlay */}
              <div className="absolute inset-0 bg-bark-900/0 group-hover:bg-bark-900/40 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                {!img.isPrimary && (
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    title="Set as primary"
                    className="bg-cream-100 text-bark-800 p-1.5 hover:bg-white transition-colors"
                  >
                    <Star size={12} strokeWidth={1.5} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  title="Remove image"
                  className="bg-red-500 text-white p-1.5 hover:bg-red-600 transition-colors"
                >
                  <X size={12} strokeWidth={1.5} />
                </button>
              </div>

              {/* Alt text input */}
              <div className="border-t border-cream-200 px-2 py-1.5">
                <input
                  type="text"
                  value={img.alt}
                  onChange={(e) => updateAlt(i, e.target.value)}
                  placeholder="Alt text"
                  className="w-full text-xs font-sans text-bark-700 placeholder:text-bark-300 bg-transparent outline-none"
                />
              </div>

              {/* File info */}
              {img.size && (
                <p className="px-2 pb-1.5 text-xs text-bark-400 font-sans">{formatBytes(img.size)}</p>
              )}
            </div>
          ))}

          {/* Add more slot */}
          {images.length < maxImages && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="border-2 border-dashed border-cream-300 hover:border-bark-400 aspect-square flex flex-col items-center justify-center gap-2 text-bark-300 hover:text-bark-500 transition-colors"
            >
              <Upload size={20} strokeWidth={1.5} />
              <span className="text-xs font-sans">Add more</span>
            </button>
          )}
        </div>
      )}

      <p className="text-xs text-bark-400 font-sans">
        {images.length}/{maxImages} images · Star icon = set as primary (shown in product cards)
      </p>
    </div>
  )
}
