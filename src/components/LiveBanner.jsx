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
      } catch (err) {
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

export default function LiveBanner() {
  const { stream, loading } = useIsLive("elmariana")

  if (loading || !stream) return null

  return (
    <div
      className="border-y border-white/5 overflow-hidden justify-center items-center flex"
      style={{ background: "rgba(145,70,255,0.06)" }}
    >
      <a
        href="https://www.twitch.tv/elmariana"
        target="_blank"
        rel="noopener noreferrer"
        className="group max-w-5xl mx-auto px-6 py-5 flex items-center gap-5 hover:opacity-90 transition-opacity"
        style={{ display: "flex" }}
      >
        <div className="shrink-0 flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#9146FF" }}
            />
            <span
              className="relative inline-flex rounded-full h-3 w-3"
              style={{ background: "#9146FF" }}
            />
          </span>
          <span
            className="text-xs font-black uppercase tracking-widest"
            style={{
              color: "#9146FF",
              fontFamily: "Barlow Condensed, sans-serif",
            }}
          >
            En vivo
          </span>
        </div>

        <div className="shrink-0 w-px h-8 bg-white/10" />

        <div className="flex-1 min-w-0">
          <p
            className="text-white font-bold text-base truncate group-hover:text-purple-300 transition-colors"
            style={{ fontFamily: "Barlow Condensed, sans-serif" }}
          >
            {stream.title}
          </p>
          <p className="text-zinc-400 text-xs mt-0.5">
            {stream.game_name && (
              <span className="text-zinc-300">{stream.game_name} · </span>
            )}
            {formatViewers(stream.viewer_count)} espectadores ahora
          </p>
        </div>

        <div
          className="shrink-0 px-4 py-2 rounded-lg text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 group-hover:scale-105"
          style={{
            background: "#9146FF",
            fontFamily: "Barlow Condensed, sans-serif",
          }}
        >
          Ver stream →
        </div>
      </a>
    </div>
  )
}
