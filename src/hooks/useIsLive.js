import { useState, useEffect } from "react"

const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID
const TOKEN = import.meta.env.VITE_TWITCH_TOKEN

export function useIsLive(username) {
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

  return { stream, isLive: !loading && !!stream, loading }
}
