import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <div className="mb-6 flex items-center justify-center">
          <img
            src="/mylightlogo.png"
            alt="MyLight 主 Logo"
            className="h-28 w-auto sm:h-32 md:h-40 object-contain select-none"
            draggable={false}
          />
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">高效 · 稳定 · 现代化的二维码工具平台</h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">生成高对比度可下载二维码，或使用摄像头/图片识别二维码内容。为课堂签到与学习场景优化。</p>
        <div className="mt-7 grid grid-cols-1 sm:inline-flex sm:items-center sm:justify-center gap-3">
          <Link className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-5 py-3 sm:py-2.5 text-base sm:text-base hover:bg-black w-full sm:w-auto" to="/generate">立即生成</Link>
          <Link className="inline-flex items-center justify-center rounded-md border px-5 py-3 sm:py-2.5 text-base sm:text-base hover:bg-gray-100 w-full sm:w-auto" to="/scan">开始扫码</Link>
        </div>
      </section>

      <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        <Card
          title="新站点入口"
          desc="访问全新域名 StudyQR.bosprimigenious.site，体验更快更稳定的服务。"
          to="https://StudyQR.bosprimigenious.site"
        />
        <Card
          title="生成二维码"
          desc="输入文本或链接，快速生成高对比度可下载的二维码。"
          to="/generate"
        />
        <Card
          title="扫码识别"
          desc="使用摄像头或图片上传，解析二维码内容。"
          to="/scan"
        />
      </section>
    </div>
  )
}

function Card({ title, desc, to }: { title: string; desc: string; to: string }) {
  return (
    <Link to={to} className="group rounded-2xl border p-6 hover:shadow-lg transition-all bg-white/80 backdrop-blur ring-1 ring-black/5">
      <h3 className="text-lg font-semibold mb-1 group-hover:text-gray-900 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-gray-900"></span>
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </Link>
  )
}


