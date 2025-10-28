import { useEffect, useRef, useState } from 'react'

export default function Scan() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let stream: MediaStream | null = null
    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
      } catch (e) {
        setError('无法访问摄像头，请检查浏览器权限')
      }
    }
    start()
    return () => {
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const onUpload = async (file: File) => {
    const bitmap = await createImageBitmap(file)
    const canvas = document.createElement('canvas')
    canvas.width = bitmap.width
    canvas.height = bitmap.height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(bitmap, 0, 0)
    // 使用浏览器原生 BarcodeDetector，如果可用
    if ('BarcodeDetector' in window) {
      // @ts-expect-error: BarcodeDetector experimental
      const detector = new window.BarcodeDetector({ formats: ['qr_code'] })
      const codes = await detector.detect(canvas)
      if (codes?.[0]?.rawValue) setContent(codes[0].rawValue)
      return
    }
    setError('当前浏览器不支持原生二维码识别，请更换 Chrome/Edge 最新版')
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border bg-black aspect-video overflow-hidden ring-1 ring-black/20">
        <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
      </div>
      <div className="grid gap-4 items-start bg-white/90 backdrop-blur p-5 rounded-2xl border ring-1 ring-black/5">
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">从图片文件识别</span>
          <input
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-900 file:text-white hover:file:bg-black"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && onUpload(e.target.files[0])}
          />
        </label>
        {content && (
          <div className="rounded-md border bg-white p-3">
            <div className="text-sm text-gray-600 mb-1">识别结果</div>
            <div className="break-all">{content}</div>
          </div>
        )}
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 text-red-700 p-3 text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}


