import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import LiveBanner from "./components/LiveBanner"
import ChannelSection from "./components/ChannelSection"
import SocialLinks from "./components/SocialLinks"
import Footer from "./components/Footer"
import { CHANNELS } from "./constants/data"
import { useIsLive } from "./hooks/useIsLive"

export default function App() {
  const { isLive } = useIsLive("elmariana")

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0A0A", fontFamily: "Barlow, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {isLive && <LiveBanner />}
      <Navbar isLive={isLive} />
      <Hero isLive={isLive} />

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
