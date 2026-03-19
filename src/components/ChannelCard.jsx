export default function ChannelCard({ channel, icon, onClick }) {
  const label =
    channel.platform === "twitch"
      ? "Twitch"
      : channel.name.replace("ElMariana", "").trim() || "Principal"

  return (
    <button
      onClick={onClick}
      className="group relative rounded-xl p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:scale-105 overflow-hidden cursor-pointer"
      style={{
        background: channel.color + "11",
        border: `1px solid ${channel.color}33`,
      }}
    >
      {channel.logo && (
        <img
          src={channel.logo}
          alt=""
          aria-hidden
          className="absolute -bottom-4 -right-4 w-30 h-30 rounded-xl object-cover opacity-40 group-hover:opacity-25 group-hover:-rotate-10 transition-all duration-300 pointer-events-none"
          style={{ transform: "rotate(-15deg)" }}
        />
      )}

      <div className="relative z-10">
        <div className="mb-2">{icon}</div>
        <div
          className="text-white text-md font-bold leading-tight"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {label}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-60"
        style={{ background: channel.color }}
      />
    </button>
  )
}
