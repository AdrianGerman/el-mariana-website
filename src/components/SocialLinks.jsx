import { SOCIAL_LINKS } from "../constants/data"

export default function SocialLinks() {
  return (
    <section className="py-20 px-6 border-t border-white/5">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3 font-semibold">
          Encuéntralo también en
        </p>
        <h2
          className="text-4xl font-black text-white uppercase mb-10"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          Redes Sociales
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-200">
                {s.icon}
              </span>
              <div className="text-left">
                <div className="text-white text-sm font-semibold">{s.name}</div>
                <div className="text-zinc-500 text-xs">{s.handle}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
