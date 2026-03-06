import { STATS } from "../constants/data"

export default function StatsBar() {
  return (
    <div
      className="border-y border-white/5 py-8"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap justify-center md:justify-between gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl font-black"
                style={{
                  fontFamily: "Barlow Condensed, sans-serif",
                  color: i === 0 ? "#8B3FDB" : "white",
                }}
              >
                {stat.value}
              </div>
              <div className="text-zinc-500 text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
