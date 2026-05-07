import { useState, useEffect } from 'react'
import { fetchAllRanked } from '../games'
import GameCard from '../components/GameCard'
import SkeletonCard from '../components/SkeletonCard'

function Trending({ isFav, onToggleFav, onOpenModal }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllRanked()
      .then((data) => { setGames(data); setLoading(false) })
      .catch((err) => {
        console.error(err)
        setError('Could not load games.')
        setLoading(false)
      })
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 page-fade" id="main-content">
      <div className="mb-7">
        <h1 className="font-heading text-2xl font-extrabold">
          🔥 <span className="text-gold">Trending</span> Games
        </h1>
        <p className="text-muted text-sm mt-1">Top ranked games right now</p>
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-busy="true" aria-label="Loading games">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {error && (
        <div className="bg-card-bg border border-red-500/20 rounded-xl p-4 text-center" role="alert">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {games.map((game, index) => (
            <GameCard
              key={game.id}
              game={game}
              isFav={isFav}
              onToggleFav={onToggleFav}
              onOpenModal={onOpenModal}
              rank={index + 1}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Trending
