import { CHANNELS } from "../constants/data"
import ChannelCard from "./ChannelCard"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { GamingIcon } from "../icons/GamingIcon"
import { VodsIcon } from "../icons/VodsIcon"
import { TwitchIcon } from "../icons/TwitchIcon"

const CHANNEL_ICONS = {
  elmariana: <YoutubeIcon width={28} height={28} />,
  marianajuega: <GamingIcon width={28} height={28} />,
  elmarianavods: <VodsIcon width={28} height={28} />,
  twitch: <TwitchIcon width={28} height={28} />,
}

export default function Hero({ isLive = false }) {
  const scrollToChannel = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: isLive ? "32px" : "0" }}
    >
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
            fontFamily: "Lilita One, cursive",
            textShadow:
              "16px 20px 10px rgb(0,0,0), 6px 6px 0px rgb(0,0,0), 9px 9px 0px rgb(0,0,0)",
            letterSpacing: "-0.07em",
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
            <ChannelCard
              key={ch.id}
              channel={ch}
              icon={CHANNEL_ICONS[ch.id]}
              onClick={() => scrollToChannel(ch.id)}
            />
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
