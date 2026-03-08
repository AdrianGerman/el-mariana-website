import ChannelSection from "./components/ChannelSection"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import StatsBar from "./components/StatsBar"
import { CHANNELS } from "./constants/data"

function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0A0A", fontFamily: "Barlow, sans-serif" }}
    >
      <Navbar />
      <Hero />
      <StatsBar />
      <main>
        {CHANNELS.map((channel, i) => (
          <ChannelSection key={channel.id} channel={channel} index={i} />
        ))}
      </main>
    </div>
  )
}

export default App
