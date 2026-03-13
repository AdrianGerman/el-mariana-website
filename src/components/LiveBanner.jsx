import { useState, useEffect } from "react"

const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID
const TOKEN = import.meta.env.VITE_TWITCH_TOKEN

function useIsLive(username) {
  const [stream, setStream] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!username || !CLIENT_ID || !TOKEN) return

    const check = async () => {
      try {
        const res = await fetch(
          `https://api.twitch.tv/helix/streams?user_login=${username}`,
          {
            headers: {
              "Client-ID": CLIENT_ID,
              Authorization: `Bearer ${TOKEN}`,
            },
          },
        )
        const data = await res.json()
        setStream(data.data?.[0] || null)
      } catch {
        setStream(null)
      } finally {
        setLoading(false)
      }
    }

    check()
    const interval = setInterval(check, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [username])

  return { stream, loading }
}

function formatViewers(n) {
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return `${n}`
}

function RecDot({ size = "sm" }) {
  const dim = size === "lg" ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
  return (
    <span className={`relative flex ${dim} shrink-0`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75`}
      />
      <span className={`relative inline-flex rounded-full ${dim} bg-red-500`} />
    </span>
  )
}

function LiveTopBar({ stream }) {
  return (
    <a
      href="https://www.twitch.tv/elmariana"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-0 left-0 right-0 z-60 flex items-center justify-center gap-4 px-6 py-1.5 group"
      style={{
        background: "linear-gradient(90deg, #3b1d8a, #6d28d9, #3b1d8a)",
        borderBottom: "1px solid rgba(145,70,255,0.25)",
      }}
    >
      <RecDot />

      <span
        className="text-xs font-black tracking-widest px-2 py-0.5 rounded"
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          background: "rgba(239,68,68,0.15)",
          color: "#ef4444",
          border: "1px solid rgba(239,68,68,0.3)",
          letterSpacing: "0.15em",
        }}
      >
        EN VIVO
      </span>

      <span className="text-zinc-700 hidden sm:inline">·</span>

      <span
        className="text-zinc-300 text-xs hidden sm:inline truncate max-w-sm group-hover:text-white transition-colors"
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          letterSpacing: "0.03em",
        }}
      >
        {stream.title}
      </span>

      {stream.viewer_count > 0 && (
        <>
          <span className="text-zinc-700 hidden sm:inline">·</span>
          <span className="text-zinc-400 text-xs hidden sm:inline">
            <span className="text-zinc-300 font-semibold">
              {formatViewers(stream.viewer_count)}
            </span>{" "}
            espectadores
          </span>
        </>
      )}

      <span
        className="ml-2 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg shrink-0 transition-all duration-200 group-hover:scale-105"
        style={{
          fontFamily: "Barlow Condensed, sans-serif",
          background: "#9146FF",
          color: "white",
          letterSpacing: "0.1em",
        }}
      >
        Ver →
      </span>
    </a>
  )
}

function LiveToast({ stream, onDismiss }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 400)
    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 500)
    }, 8000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [])

  const dismiss = (e) => {
    e?.preventDefault()
    setVisible(false)
    setTimeout(onDismiss, 500)
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-60 w-80 rounded-xl overflow-hidden shadow-2xl"
      style={{
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(100%) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition:
          "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
        background: "#111",
        border: "1px solid rgba(145,70,255,0.3)",
        boxShadow:
          "0 0 40px rgba(145,70,255,0.15), 0 20px 40px rgba(0,0,0,0.6)",
      }}
    >
      <div
        className="h-0.5 w-full"
        style={{ background: "linear-gradient(90deg, #ef4444, #9146FF)" }}
      />

      <div className="flex items-center gap-3 px-4 pt-3 pb-2">
        <RecDot size="lg" />
        <span
          className="text-white font-black text-sm uppercase tracking-widest flex-1"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          ElMariana · En vivo
        </span>
        <button
          onClick={dismiss}
          className="text-zinc-600 hover:text-zinc-300 transition-colors text-xl leading-none pb-0.5"
        >
          ×
        </button>
      </div>

      <div className="px-4 pb-4">
        <p
          className="text-zinc-200 text-sm font-semibold leading-snug mb-3"
          style={{ fontFamily: "Barlow Condensed, sans-serif" }}
        >
          {stream.title}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            {stream.game_name && (
              <span className="text-zinc-400 font-medium">
                {stream.game_name} ·{" "}
              </span>
            )}
            {formatViewers(stream.viewer_count)} viendo ahora
          </div>
          <a
            href="https://www.twitch.tv/elmariana"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-black px-3 py-1.5 rounded-lg text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "#9146FF",
              fontFamily: "Barlow Condensed, sans-serif",
              letterSpacing: "0.08em",
            }}
          >
            VER STREAM →
          </a>
        </div>
      </div>

      <div className="h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
        <div
          className="h-full"
          style={{
            background: "linear-gradient(90deg, #ef4444, #9146FF)",
            animation: "shrink 8s linear forwards",
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export default function LiveBanner() {
  const { stream, loading } = useIsLive("elmariana")
  const [toastDismissed, setToastDismissed] = useState(false)

  if (loading || !stream) return null

  return (
    <>
      <LiveTopBar stream={stream} />
      {!toastDismissed && (
        <LiveToast stream={stream} onDismiss={() => setToastDismissed(true)} />
      )}
    </>
  )
}
