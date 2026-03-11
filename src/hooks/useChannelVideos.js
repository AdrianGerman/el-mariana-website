import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

function parseDuration(iso) {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const h = parseInt(match[1] || 0)
  const m = parseInt(match[2] || 0)
  const s = parseInt(match[3] || 0)
  return h * 3600 + m * 60 + s
}

function formatViews(count) {
  const n = parseInt(count, 10)
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

function formatSubs(count) {
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

function buildVideoObject(item) {
  return {
    title: item.snippet.title,
    thumb: item.snippet.thumbnails?.medium?.url || "",
    views: formatViews(item.statistics?.viewCount || 0),
    date: formatDate(item.snippet.publishedAt),
    url: `https://www.youtube.com/watch?v=${item.id}`,
    videoId: item.id,
    durationSeconds: parseDuration(item.contentDetails?.duration || "PT0S"),
  }
}

export function useChannelVideos(handle, maxVideos = 3, maxShorts = 3) {
  const [videos, setVideos] = useState([])
  const [shorts, setShorts] = useState([])
  const [subscribers, setSubscribers] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!handle || !API_KEY) return

    const fetchAll = async () => {
      setLoading(true)
      setError(null)

      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,statistics&forHandle=${handle.replace("@", "")}&key=${API_KEY}`,
        )
        const channelData = await channelRes.json()
        if (!channelData.items?.length) throw new Error("Canal no encontrado")

        const ch = channelData.items[0]
        const uploadsPlaylistId = ch.contentDetails.relatedPlaylists.uploads
        setSubscribers(formatSubs(ch.statistics.subscriberCount))

        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
        )
        const playlistData = await playlistRes.json()
        if (!playlistData.items?.length) throw new Error("Sin videos")

        const videoIds = playlistData.items
          .map((item) => item.snippet.resourceId.videoId)
          .join(",")

        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoIds}&key=${API_KEY}`,
        )
        const statsData = await statsRes.json()

        const allItems = statsData.items.map(buildVideoObject)

        setVideos(
          allItems.filter((v) => v.durationSeconds > 180).slice(0, maxVideos),
        )
        setShorts(
          allItems
            .filter((v) => v.durationSeconds > 0 && v.durationSeconds <= 180)
            .slice(0, maxShorts),
        )
      } catch (err) {
        console.error("Error fetching YouTube channel:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAll()
  }, [handle, maxVideos, maxShorts])

  return { videos, shorts, subscribers, loading, error }
}
