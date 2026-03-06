import { CHANNELS } from "../constants/data"

export default function Hero() {
  const scrollToChannel = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,63,219,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,63,219,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(139,63,219,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute left-0 top-1/2 w-1/4 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(139,63,219,0.4))",
        }}
      />
      <div
        className="absolute right-0 top-1/2 w-1/4 h-px"
        style={{
          background:
            "linear-gradient(to left, transparent, rgba(139,63,219,0.4))",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse inline-block" />
          <span className="text-purple-400 text-xs font-semibold tracking-widest uppercase">
            Creador de Contenido Mexicano
          </span>
        </div>

        <h1
          className="text-[clamp(4rem,14vw,11rem)] font-black leading-none uppercase text-white mb-4"
          style={{
            fontFamily: "Barlow Condensed, sans-serif",
            letterSpacing: "-0.02em",
          }}
        >
          El<span style={{ color: "#8B3FDB" }}>Mariana</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light">
          30M+ seguidores. 4 canales. Un solo objetivo:
          <br />
          <span className="text-white font-semibold">no aburrirte jamás.</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mb-12">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToChannel(ch.id)}
              className="group relative rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              style={{
                background: ch.color + "11",
                border: `1px solid ${ch.color}33`,
              }}
            >
              <div className="text-2xl mb-2">{ch.icon}</div>
              <div
                className="text-white text-xs font-bold leading-tight"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                {ch.platform === "twitch"
                  ? "Twitch"
                  : ch.name.replace("ElMariana", "").trim() || "Principal"}
              </div>
              <div className="text-zinc-500 text-xs mt-0.5">
                {ch.subscribers}
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-60"
                style={{ background: ch.color }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollToChannel(CHANNELS[0].id)}
          className="text-zinc-500 text-sm hover:text-zinc-300 transition-colors animate-bounce inline-block"
        >
          ↓ Explorar canales
        </button>
      </div>
    </header>
  )
}
