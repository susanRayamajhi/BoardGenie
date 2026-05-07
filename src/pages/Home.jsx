import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrending } from '../games'
import GameCard from '../components/GameCard'
import SkeletonCard from '../components/SkeletonCard'

function Home({ isFav, onToggleFav, onOpenModal }) {
  const navigate = useNavigate()
  const [trending, setTrending] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    fetchTrending()
      .then((data) => { setTrending(data); setLoading(false) })
      .catch((err)  => { console.error(err); setError('Could not load games.'); setLoading(false) })
  }, [])

  return (
    <main className="page-fade" id="main-content">

      {/* Hero section*/}
      <section
        className="max-w-6xl mx-auto px-5 md:px-10 pt-14 pb-12 grid md:grid-cols-2 gap-12 items-center"
        aria-labelledby="hero-heading"
      >
        <div>
          <span className="inline-block bg-gold/10 border border-gold/25 text-gold text-xs font-medium px-3 py-1.5 rounded-full mb-5">
            🎲 Board Game Recommendation Platform
          </span>

          <h1
            id="hero-heading"
            className="font-heading text-3xl md:text-4xl font-bold leading-snug tracking-tight mb-4"
          >
            Find Your <span className="text-gold">Perfect</span> Game,{' '}
            <br className="hidden md:block" />Every Time
          </h1>

          <p className="text-muted text-sm leading-relaxed mb-3 max-w-sm">
            Spend less time deciding and more time playing — BoardGenie finds the best board game for you and the group instantly.
          </p>

          <p className="text-muted text-xs mb-7 max-w-sm bg-white/3 border border-white/8 rounded-xl px-3 py-2">
            💡 Based on real survey data — 92% of people struggle to choose a game. Boardgenie fix that.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => navigate('/finder')}
              className="bg-gold text-navy px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gold-hover transition-colors cursor-pointer border-0"
              aria-label="Go to Game Finder"
            >
              🎲 Find a Game
            </button>
            <button
              onClick={() => navigate('/trending')}
              className="border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:border-gold hover:text-gold transition-colors bg-transparent cursor-pointer"
              aria-label="See trending games"
            >
              🔥 See Trending
            </button>
          </div>
        </div>

        {/* Feature cards section */}
        <div className="grid grid-cols-2 gap-3" aria-label="Key features">
          <div className="col-span-2 bg-card-bg border border-white/8 rounded-2xl p-5">
            <span className="text-2xl" aria-hidden="true">🎯</span>
            <h2 className="font-heading font-semibold text-sm mt-2 mb-1">Smart Search Filter</h2>
            <p className="text-muted text-xs leading-relaxed">Filter by players, duration, complexity and genre — based on your real preferences</p>
          </div>
          <div className="bg-card-bg border border-white/8 rounded-2xl p-5">
            <span className="text-2xl" aria-hidden="true">✨</span>
            <h2 className="font-heading font-semibold text-sm mt-2 mb-1">Surprise Me</h2>
            <p className="text-muted text-xs">Enjoy surprise recommendations</p>
          </div>
          <div className="bg-card-bg border border-white/8 rounded-2xl p-5">
            <span className="text-2xl" aria-hidden="true">❤️</span>
            <h2 className="font-heading font-semibold text-sm mt-2 mb-1">Add to Favorites</h2>
            <p className="text-muted text-xs">Save games for later</p>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 mb-12" aria-label="Platform statistics">
        <div className="grid grid-cols-3 gap-4 max-w-xl">
          {[
            { num: '20+',   label: 'Games Available' },
            { num: '92%',   label: 'Struggle to Choose' },
            { num: '30-60', label: 'Preferred Minutes' },
          ].map(({ num, label }) => (
            <div key={label} className="bg-card-bg border border-white/8 rounded-2xl p-4 text-center">
              <p className="font-heading text-xl font-bold text-gold">{num}</p>
              <p className="text-muted text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trending strip section */}
      <section className="max-w-6xl mx-auto px-5 md:px-10 pb-14" aria-labelledby="trending-heading">
        <div className="flex items-center justify-between mb-5">
          <h2 id="trending-heading" className="font-heading font-bold text-lg">
            🔥 <span className="text-gold">Trending</span> This Week
          </h2>
          <button
            onClick={() => navigate('/trending')}
            className="text-sm text-muted hover:text-gold transition-colors bg-transparent border-0 cursor-pointer"
            aria-label="See all trending games"
          >
            See all →
          </button>
        </div>

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" aria-busy="true" aria-label="Loading games">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {error && (
          <div className="bg-card-bg border border-red-500/20 rounded-xl p-4 text-center" role="alert">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trending.map((game) => (
              <GameCard key={game.id} game={game} isFav={isFav} onToggleFav={onToggleFav} onOpenModal={onOpenModal} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Home
