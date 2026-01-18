'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'
import type { Area } from 'react-easy-crop'

interface ImageCropProps {
  imageSrc: string
  onCropComplete: (croppedImageBlob: Blob) => void
  onCancel: () => void
}

export function ImageCrop({ imageSrc, onCropComplete, onCancel }: ImageCropProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const onCropChange = useCallback((crop: { x: number; y: number }) => {
    setCrop(crop)
  }, [])

  const onZoomChange = useCallback((zoom: number) => {
    setZoom(zoom)
  }, [])

  const onCropAreaChange = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener('load', () => resolve(image))
      image.addEventListener('error', (error) => reject(error))
      image.src = url
    })

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<Blob> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('No 2d context')
    }

    // Set canvas size to match cropped area
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    // Draw cropped image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    )

    // Convert to blob (JPEG format, quality 0.9)
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Canvas is empty'))
            return
          }
          resolve(blob)
        },
        'image/jpeg',
        0.9
      )
    })
  }

  const handleCropComplete = async () => {
    if (!croppedAreaPixels) {
      return
    }

    setIsProcessing(true)
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      // Check file size (max 2MB)
      const maxSize = 2 * 1024 * 1024 // 2MB
      if (croppedBlob.size > maxSize) {
        alert(`Cropped image is too large (${(croppedBlob.size / 1024).toFixed(1)}KB). Please crop tighter or reduce quality.`)
        setIsProcessing(false)
        return
      }

      onCropComplete(croppedBlob)
    } catch (error) {
      console.error('Error cropping image:', error)
      alert('Failed to crop image. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex items-start gap-2 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-700 dark:text-yellow-300">
            <p className="font-semibold mb-1">Crop Required</p>
            <p>Please crop your image to show <strong>only the appointment calendar area</strong>. Remove any personal information, names, emails, confirmation numbers, or other identifiers.</p>
          </div>
        </div>
      </div>

      <div className="relative w-full" style={{ height: '400px', backgroundColor: '#000' }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={undefined} // Free aspect ratio
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropAreaChange={onCropAreaChange}
          cropShape="rect"
          showGrid={true}
        />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Zoom: {Math.round(zoom * 100)}%
          </label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleCropComplete}
          disabled={isProcessing || !croppedAreaPixels}
          className="flex-1"
        >
          {isProcessing ? 'Processing...' : 'Confirm Crop'}
        </Button>
      </div>
    </Card>
  )
}

