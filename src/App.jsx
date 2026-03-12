import ChannelSection from "./components/ChannelSection"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import SocialLinks from "./components/SocialLinks"
import StatsBar from "./components/StatsBar"
import LiveBanner from "./components/LiveBanner"
import { CHANNELS } from "./constants/data"

function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0A0A", fontFamily: "Barlow, sans-serif" }}
    >
      <Navbar />
      <Hero />
      {/* <StatsBar /> */}
      <LiveBanner />
      <main>
        {CHANNELS.map((channel, i) => (
          <ChannelSection key={channel.id} channel={channel} index={i} />
        ))}
      </main>

      <SocialLinks />
      <Footer />
    </div>
  )
}

export default App
