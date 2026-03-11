import { useState, useEffect } from "react"

const CLIENT_ID = import.meta.env.VITE_TWITCH_CLIENT_ID
const TOKEN = import.meta.env.VITE_TWITCH_TOKEN

const headers = {
  "Client-ID": CLIENT_ID,
  Authorization: `Bearer ${TOKEN}`,
}

function formatFollowers(count) {
  const n = parseInt(count, 10)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

function formatDate(isoString) {
  const diff = Date.now() - new Date(isoString).getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days === 0) return "hoy"
  if (days === 1) return "ayer"
  if (days < 7) return `hace ${days} días`
  if (days < 14) return "hace 1 semana"
  if (days < 30) return `hace ${Math.floor(days / 7)} semanas`
  if (days < 60) return "hace 1 mes"
  return `hace ${Math.floor(days / 30)} meses`
}

function formatViews(count) {
  const n = parseInt(count, 10)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

export function useTwitchData(username) {
  const [videos, setVideos] = useState([])
  const [clips, setClips] = useState([])
  const [followers, setFollowers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username || !CLIENT_ID || !TOKEN) return

    const fetchAll = async () => {
      setLoading(true)
      setError(null)

      try {
        const userRes = await fetch(
          `https://api.twitch.tv/helix/users?login=${username}`,
          { headers },
        )
        const userData = await userRes.json()
        if (!userData.data?.length) throw new Error("Usuario no encontrado")

        const userId = userData.data[0].id

        const followersRes = await fetch(
          `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}&first=1`,
          { headers },
        )
        const followersData = await followersRes.json()
        setFollowers(formatFollowers(followersData.total))

        const videosRes = await fetch(
          `https://api.twitch.tv/helix/videos?user_id=${userId}&first=3&type=archive`,
          { headers },
        )
        const videosData = await videosRes.json()
        const formattedVideos = (videosData.data || []).map((v) => ({
          title: v.title,
          thumb: v.thumbnail_url
            .replace("%{width}", "480")
            .replace("%{height}", "270"),
          views: formatViews(v.view_count),
          date: formatDate(v.created_at),
          url: `https://www.twitch.tv/videos/${v.id}`,
          duration: v.duration,
        }))
        setVideos(formattedVideos)

        const clipsRes = await fetch(
          `https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=3`,
          { headers },
        )
        const clipsData = await clipsRes.json()
        const formattedClips = (clipsData.data || []).map((c) => ({
          title: c.title,
          thumb: c.thumbnail_url,
          views: formatViews(c.view_count),
          date: formatDate(c.created_at),
          url: c.url,
        }))
        setClips(formattedClips)
      } catch (err) {
        console.error("Error fetching Twitch data:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [username])

  return { videos, clips, followers, loading, error }
}
