import { useState, useEffect } from "react"
import { CHANNELS } from "../constants/data"

export default function Navbar({ isLive = false }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToChannel = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className="fixed left-0 right-0 z-50 transition-all duration-300 animate-fade-in-up"
      style={{
        top: isLive ? "32px" : "0px",
        background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <img
          src="/logo.avif"
          alt="ElMariana"
          className="h-8 w-8 object-contain cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <div className="hidden md:flex items-center gap-6">
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToChannel(ch.id)}
              className="text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors font-semibold cursor-pointer"
            >
              {ch.platform === "twitch"
                ? "Twitch"
                : ch.name
                    .replace("ElMariana", "")
                    .replace("Podcast de ", "Podcast")
                    .trim() || "Principal"}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
