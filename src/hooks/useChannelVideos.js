import { useState, useEffect } from "react"

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY

export function useChannelVideos(handle, maxResults = 3) {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!handle || !API_KEY) return

    const fetchVideos = async () => {
      setLoading(true)
      setError(null)

      try {
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails,snippet&forHandle=${handle.replace("@", "")}&key=${API_KEY}`,
        )
        const channelData = await channelRes.json()

        if (!channelData.items?.length) throw new Error("Canal no encontrado")

        const uploadsPlaylistId =
          channelData.items[0].contentDetails.relatedPlaylists.uploads

        const videosRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${API_KEY}`,
        )
        const videosData = await videosRes.json()

        if (!videosData.items?.length) throw new Error("Sin videos")

        const videoIds = videosData.items
          .map((item) => item.snippet.resourceId.videoId)
          .join(",")

        const statsRes = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`,
        )
        const statsData = await statsRes.json()

        const formatted = statsData.items.map((item) => ({
          title: item.snippet.title,
          thumb: item.snippet.thumbnails?.medium?.url || "",
          views: formatViews(item.statistics.viewCount),
          date: formatDate(item.snippet.publishedAt),
          url: `https://www.youtube.com/watch?v=${item.id}`,
          videoId: item.id,
        }))

        setVideos(formatted)
      } catch (err) {
        console.error("Error fetching YouTube videos:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchVideos()
  }, [handle, maxResults])

  return { videos, loading, error }
}

function formatViews(count) {
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
