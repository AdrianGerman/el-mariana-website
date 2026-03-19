import { useChannelVideos } from "../hooks/useChannelVideos"
import { useTwitchData } from "../hooks/useTwitchData"
import VideoCard from "./VideoCard"

function LoadingDots() {
  return (
    <div className="flex gap-1 items-center">
      <span
        className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-1 h-1 bg-zinc-600 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </div>
  )
}

export default function ChannelSection({ channel, index }) {
  const isEven = index % 2 === 0
  const isTwitch = channel.platform === "twitch"

  const {
    videos: liveVideos,
    shorts,
    subscribers: liveSubscribers,
    loading: ytLoading,
  } = useChannelVideos(channel.platform === "youtube" ? channel.handle : null)

  const {
    videos: twitchVideos,
    clips,
    followers,
    loading: twitchLoading,
  } = useTwitchData(channel.platform === "twitch" ? channel.handle : null)

  const loading = channel.platform === "twitch" ? twitchLoading : ytLoading
  const videos =
    channel.platform === "twitch"
      ? twitchVideos
      : liveVideos.length > 0
        ? liveVideos
        : []
  const subscribers =
    channel.platform === "twitch"
      ? followers
      : (liveSubscribers ?? channel.subscribers ?? "")

  return (
    <section
      id={channel.id}
      className="relative py-16 px-6 border-t border-white/5 overflow-hidden"
    >
      <div
        className="absolute top-0 bottom-0 w-1 opacity-30"
        style={{
          background: `linear-gradient(to bottom, ${channel.color}, transparent)`,
          left: isEven ? 0 : "auto",
          right: isEven ? "auto" : 0,
        }}
      />

      <div
        className="absolute -top-32 opacity-5 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: channel.color,
          left: isEven ? "-5rem" : "auto",
          right: isEven ? "auto" : "-5rem",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
          <div
            className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center text-4xl"
            style={{
              background: channel.color + "22",
              border: `2px solid ${channel.color}44`,
            }}
          >
            {channel.logo ? (
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>{channel.icon}</span>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {channel.name}
              </h2>
              {isTwitch && (
                <span
                  className="text-xs font-bold px-2 py-1 rounded"
                  style={{
                    background: "#9146FF33",
                    color: "#9146FF",
                    border: "1px solid #9146FF44",
                  }}
                >
                  TWITCH
                </span>
              )}
            </div>
            <p className="text-zinc-400 text-sm mt-1 mb-2">{channel.handle}</p>
            <p className="text-zinc-300 text-base max-w-lg">
              {channel.description}
            </p>
            <p
              className="mt-2 text-sm font-bold"
              style={{ color: channel.accent }}
            >
              {loading && channel.platform === "youtube" ? (
                <LoadingDots />
              ) : (
                `${subscribers} seguidores`
              )}
            </p>
          </div>

          <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 text-white"
            style={{
              background: channel.color,
              fontFamily: "Bebas Neue, sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            {isTwitch ? "Ver Canal" : "Ir al Canal"} →
          </a>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              {isTwitch ? "Últimos streams destacados" : "Videos recientes"}
            </h3>
            {loading && channel.platform === "youtube" && <LoadingDots />}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading && channel.platform === "youtube"
              ? [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg overflow-hidden border border-white/5 animate-pulse"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div className="aspect-video bg-zinc-800" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-zinc-800 rounded w-3/4" />
                      <div className="h-3 bg-zinc-800 rounded w-1/3" />
                    </div>
                  </div>
                ))
              : videos.map((video, i) => (
                  <VideoCard
                    key={i}
                    video={video}
                    accentColor={channel.color}
                  />
                ))}
          </div>
        </div>

        {channel.platform === "twitch" && (clips.length > 0 || loading) && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                Clips más vistos
              </h3>
              {loading && <LoadingDots />}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading
                ? [0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="rounded-lg overflow-hidden border border-white/5 animate-pulse"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="aspect-video bg-zinc-800" />
                      <div className="p-3 space-y-2">
                        <div className="h-3 bg-zinc-800 rounded w-3/4" />
                        <div className="h-3 bg-zinc-800 rounded w-1/3" />
                      </div>
                    </div>
                  ))
                : clips.map((clip, i) => (
                    <VideoCard
                      key={i}
                      video={clip}
                      accentColor={channel.color}
                    />
                  ))}
            </div>
          </div>
        )}

        {channel.platform === "youtube" && (shorts.length > 0 || loading) && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                Shorts recientes
              </h3>
              {loading && <LoadingDots />}
            </div>

            {shorts.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {shorts.map((short, i) => (
                  <a
                    key={i}
                    href={`https://www.youtube.com/shorts/${short.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group shrink-0 w-36 rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <div
                      className="relative overflow-hidden"
                      style={{ aspectRatio: "9/16" }}
                    >
                      {short.thumb ? (
                        <img
                          src={short.thumb}
                          alt={short.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                          <span className="text-2xl opacity-40">▶</span>
                        </div>
                      )}
                      <div
                        className="absolute top-2 left-2 text-white text-xs font-bold px-1.5 py-0.5 rounded"
                        style={{ background: channel.color }}
                      >
                        SHORT
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-white text-xs font-semibold line-clamp-2 leading-snug group-hover:text-purple-400 transition-colors">
                        {short.title}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">
                        {short.views} vistas
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
