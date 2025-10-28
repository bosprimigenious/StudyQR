import { useMemo, useState } from 'react'

export default function Generate() {
  const [text, setText] = useState('https://example.com')
  const [size, setSize] = useState(256)
  const [margin, setMargin] = useState(1)

  const qrUrl = useMemo(() => {
    const url = new URL('https://api.qrserver.com/v1/create-qr-code/')
    url.searchParams.set('data', text)
    url.searchParams.set('size', `${size}x${size}`)
    url.searchParams.set('margin', String(margin))
    return url.toString()
  }, [text, size, margin])

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,auto] items-start">
      <form className="grid gap-4 bg-white/90 backdrop-blur p-5 rounded-2xl border ring-1 ring-black/5">
        <label className="grid gap-1">
          <span className="text-sm text-gray-600">文本或链接</span>
          <input
            className="rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入要编码的内容"
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="grid gap-1">
            <span className="text-sm text-gray-600">尺寸(px)</span>
            <input
              type="number"
              className="rounded-md border px-3 py-2"
              value={size}
              min={128}
              max={1024}
              step={32}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-gray-600">边距</span>
            <input
              type="number"
              className="rounded-md border px-3 py-2"
              value={margin}
              min={0}
              max={10}
              onChange={(e) => setMargin(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="flex items-center gap-3">
          <a
            className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm hover:bg-black"
            href={qrUrl}
            download
          >
            下载 PNG
          </a>
          <span className="text-xs text-gray-500">高对比度 · 适合打印</span>
        </div>
      </form>

      <div className="rounded-2xl border p-4 bg-white/90 backdrop-blur ring-1 ring-black/5">
        <img src={qrUrl} width={size} height={size} alt="QR" className="rounded-md" />
      </div>
    </div>
  )
}


