import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const isLegacyHost = typeof window !== 'undefined' && /github\.io$/i.test(window.location.hostname)

  return (
    <div className="min-h-screen bg-[radial-gradient(40%_60%_at_10%_0%,#eef2ff_0%,#ffffff_50%),radial-gradient(40%_60%_at_90%_0%,#fef3c7_0%,transparent_50%)] text-gray-900">
      {isLegacyHost && (
        <div className="w-full bg-yellow-50 border-b border-yellow-200 text-yellow-900">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-2 text-sm flex items-center gap-3 justify-between">
            <div>
              您正在访问旧站点（用于引流）。推荐前往新站：
              <a className="underline font-medium" href="https://StudyQR.bosprimigenious.site">StudyQR.bosprimigenious.site</a>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-3 py-1.5 text-xs hover:bg-black"
              href="https://StudyQR.bosprimigenious.site"
            >
              立即前往
            </a>
          </div>
        </div>
      )}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
            <img src="/logo.png" alt="StudyQR" className="h-8 w-8 rounded-md object-contain" />
            <img src="/mylightlogo.png" alt="bosprimigenious" className="hidden sm:block h-8 md:h-9 w-auto object-contain" />
            <div className="flex items-baseline gap-2 overflow-hidden">
              <span className="font-semibold text-lg md:text-xl truncate">StudyQR</span>
              <span className="hidden sm:block text-xs md:text-sm text-gray-500 truncate">更快更稳的二维码生成与识别</span>
              <span className="hidden md:inline text-[11px] text-gray-500 whitespace-nowrap">bosprimigenious 出品</span>
            </div>
          </Link>
          <nav className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 overflow-x-auto -mx-1 sm:mx-0 px-1 sm:px-0">
            <Link className={navClass(location.pathname === '/')} to="/">首页</Link>
            <Link className={navClass(location.pathname.startsWith('/generate'))} to="/generate">生成</Link>
            <Link className={navClass(location.pathname.startsWith('/scan'))} to="/scan">扫码</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-7xl px-4 sm:px-6 py-10 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <span>© {new Date().getFullYear()} StudyQR</span>
            <span className="text-gray-400">·</span>
            <a className="underline hover:text-gray-700" href="https://StudyQR.bosprimigenious.site">新站</a>
          </div>
          <div className="text-xs text-gray-400">Made for 学习与课堂场景</div>
        </div>
      </footer>
    </div>
  )
}

function navClass(active: boolean) {
  return (
    'px-3 py-1.5 rounded-md text-sm transition-colors ' +
    (active ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100')
  )
}


