export default function VideoCard({ video, accentColor }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      <div className="aspect-video bg-zinc-900 relative overflow-hidden">
        {video.thumb ? (
          <img
            src={video.thumb}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              style={{
                background: accentColor + "33",
                border: `2px solid ${accentColor}55`,
              }}
            >
              ▶
            </div>
          </div>
        )}

        {video.thumb && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl opacity-0 group-hover:opacity-90 scale-75 group-hover:scale-100 transition-all duration-300"
              style={{ background: accentColor + "cc" }}
            >
              ▶
            </div>
          </div>
        )}

        {video.date === "Live" && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block" />
            EN VIVO
          </div>
        )}

        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.views}
        </div>
      </div>

      <div className="p-3">
        <p
          className="text-white text-sm font-semibold leading-snug group-hover:text-purple-400 transition-colors line-clamp-2"
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {video.title}
        </p>
        <p className="text-zinc-500 text-xs mt-1">{video.date}</p>
      </div>
    </a>
  )
}
