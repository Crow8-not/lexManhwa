import { useState, useRef, useEffect, useCallback } from 'react'
import { saveImage, getImageUrl, revokeImageUrl } from '../../lib/demo/images'
import Button from '../ui/Button'
import Card from '../ui/Card'

type ImageUploadProps = {
  value?: string
  onChange: (imageKey: string | undefined) => void
  keyPrefix: string
  label?: string
  accept?: string
  maxSizeMB?: number
}

export default function ImageUpload({
  value,
  onChange,
  keyPrefix,
  label = 'Imagen',
  accept = 'image/*',
  maxSizeMB = 5,
}: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const loadPreview = useCallback(async (imageKey: string) => {
    const url = await getImageUrl(imageKey)
    if (url) {
      objectUrlRef.current = url
      setPreviewUrl(url)
    }
  }, [])

  useEffect(() => {
    if (value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadPreview(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    if (!value) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewUrl(null)
      if (objectUrlRef.current) {
        revokeImageUrl(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }

    return () => {
      if (objectUrlRef.current) {
        revokeImageUrl(objectUrlRef.current)
        objectUrlRef.current = null
      }
    }
  }, [value])

  const handleFileSelect = async (file: File) => {
    setError('')

    if (!file.type.startsWith('image/')) {
      setError('El archivo debe ser una imagen')
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`La imagen no debe exceder ${maxSizeMB}MB`)
      return
    }

    setIsLoading(true)
    const imageKey = `${keyPrefix}-${Date.now()}-${file.name.replace(/[^a-z0-9.-]/gi, '_')}`
    const success = await saveImage(imageKey, file)

    if (success) {
      const url = await getImageUrl(imageKey)
      if (url) {
        if (objectUrlRef.current) {
          revokeImageUrl(objectUrlRef.current)
        }
        objectUrlRef.current = url
        setPreviewUrl(url)
        onChange(imageKey)
      }
    } else {
      setError('Error al guardar la imagen')
    }

    setIsLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    if (objectUrlRef.current) {
      revokeImageUrl(objectUrlRef.current)
      objectUrlRef.current = null
    }
    setPreviewUrl(null)
    onChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-200">{label}</label>

        <div
          className={`relative rounded-xl border-2 border-dashed transition-colors ${
            previewUrl
              ? 'border-primary-400/50 bg-primary-500/5'
              : 'border-line hover:border-primary-400/50'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="relative aspect-[3/4] min-h-[120px]">
              <img
                src={previewUrl}
                alt="Previsualización"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="danger" size="sm" onClick={handleRemove}>
                  Eliminar
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <svg
                className="w-10 h-10 text-slate-500 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-slate-400">Arrastra una imagen o haz clic para seleccionar</p>
              <p className="text-xs text-slate-500 mt-1">
                Formatos: JPG, PNG, WebP • Máx. {maxSizeMB}MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
              <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {error && <p className="text-sm text-rose-400">{error}</p>}
      </div>
    </Card>
  )
}