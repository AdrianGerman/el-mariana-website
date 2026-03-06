/* eslint-disable no-unused-vars */
import VideoCard from "./VideoCard"

export default function ChannelSection({ channel, index }) {
  const isTwitch = channel.platform === "twitch"

  return (
    <section
      className="relative py-16 px-6 border-t border-white/5 overflow-hidden"
      id={channel.id}
    >
      <div
        className="absolute top-0 bottom-0 w-1 opacity-30"
        style={{
          background: `linear-gradient(to bottom, ${channel.color}, transparent)`,
          left: 0,
        }}
      />

      <div
        className="absolute -top-32 opacity-5 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{
          background: channel.color,
          left: "-5rem",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10">
          <div
            className="shrink-0 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
            style={{
              background: channel.color + "22",
              border: `2px solid ${channel.color}44`,
            }}
          >
            {channel.icon}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h2
                className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
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
              {channel.subscribers} seguidores
            </p>
          </div>

          <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 active:scale-95 text-white"
            style={{
              background: channel.color,
              fontFamily: "Barlow Condensed, sans-serif",
              letterSpacing: "0.12em",
            }}
          >
            {isTwitch ? "Ver Canal" : "Ir al Canal"} →
          </a>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-semibold">
            {isTwitch ? "Últimos streams destacados" : "Videos recientes"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {channel.videos.map((video, i) => (
              <VideoCard key={i} video={video} accentColor={channel.color} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
