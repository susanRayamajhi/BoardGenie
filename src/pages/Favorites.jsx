import { useNavigate } from 'react-router-dom'
import games from '../games'
import GameCard from '../components/GameCard'

function Favorites({ favorites, isFav, onToggleFav, onOpenModal }) {
  const navigate = useNavigate()

  {/*converting everything to strings to avoid type mismatch*/}
  const favStrings = favorites.map((id) => String(id))
  const savedGames = games.filter((g) => favStrings.includes(String(g.id)))

  if (favStrings.length === 0 || savedGames.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 page-fade" id="main-content">
        <div className="mb-7">
          <h1 className="font-heading text-2xl font-extrabold">
            Your <span className="text-gold">Favorites</span>
          </h1>
        </div>
        <div className="text-center py-24 text-muted">
          <p className="text-5xl mb-4" aria-hidden="true">🤍</p>
          <p className="font-heading font-bold text-white text-lg mb-2">Nothing saved yet</p>
          <p className="text-sm mb-2">Browse games and tap the ❤️ heart to save them here</p>
          <p className="text-xs mb-6 opacity-60">Stored locally — no account needed</p>
          <button
            onClick={() => navigate('/finder')}
            className="bg-gold text-navy px-6 py-3 rounded-full text-sm font-bold hover:bg-gold-hover transition-colors border-0 cursor-pointer"
          >
            Find a Game
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 page-fade" id="main-content">
      <div className="mb-7">
        <h1 className="font-heading text-2xl font-extrabold">
          Your <span className="text-gold">Favorites</span>
        </h1>
        <p className="text-muted text-sm mt-1">
          {savedGames.length} game{savedGames.length !== 1 ? 's' : ''} saved · stored locally on your device
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedGames.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isFav={isFav}
            onToggleFav={onToggleFav}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </main>
  )
}

export default Favorites
