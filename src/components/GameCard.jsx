function GameCard({ game, isFav, onToggleFav, onOpenModal, rank }) {
  if (!game || !game.id || !game.name) return null

  const favorited = isFav(String(game.id))

  const handleCardClick = () => {
    if (game && game.id && game.name) onOpenModal(game)
  }

  const handleFavClick = (e) => {
    e.stopPropagation()
    onToggleFav(String(game.id))
  }

  return (
    <article
      className="bg-card-bg border border-white/8 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-gold/40 hover:shadow-xl group"
      onClick={handleCardClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick() }
      }}
      aria-label={`View details for ${game.name}`}
    >
      {/* Card image portion */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: '16/9',
          background: game.color
            ? `linear-gradient(135deg, ${game.color}, #0D1B2A)`
            : 'linear-gradient(135deg, #162338, #0D1B2A)',
        }}
      >
        {/* rank badge */}
        {rank && (
          <span className="absolute top-2 left-2 z-10 bg-gold text-navy text-xs font-bold px-2 py-0.5 rounded-lg">
            #{rank}
          </span>
        )}

        {/* complexity badge */}
        {!rank && (
          <span className="absolute top-2 left-2 z-10 bg-navy/80 text-gold text-xs font-medium px-2 py-0.5 rounded-md border border-gold/20">
            {game.complexity || 'Medium'}
          </span>
        )}

        {/* games emoji */}
        <span
          className="text-5xl select-none transition-transform duration-300 group-hover:scale-110"
          role="img"
          aria-label={game.name}
        >
          {game.emoji || '🎲'}
        </span>


        {game.rating && (
          <span className="absolute bottom-2 left-2 bg-navy/80 text-gold text-xs font-semibold px-2 py-0.5 rounded-md border border-gold/20">
            ★ {game.rating}
          </span>
        )}

        {/* year */}
        {game.year && (
          <span className="absolute bottom-2 right-10 text-white/40 text-xs">
            {game.year}
          </span>
        )}

        {/* Favorite button */}
        <button
          className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full border-0 flex items-center justify-center text-sm cursor-pointer transition-all duration-200 hover:scale-110 ${
            favorited ? 'bg-white/90' : 'bg-navy/80 hover:bg-navy/95'
          }`}
          onClick={handleFavClick}
          aria-label={favorited ? `Remove ${game.name} from favorites` : `Add ${game.name} to favorites`}
          aria-pressed={favorited}
        >
          {favorited ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Card body portion */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-sm mb-2 group-hover:text-gold transition-colors line-clamp-1">
          {game.name}
        </h3>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted mb-3">
          <span>⏱ {game.duration || '?'} min</span>
          <span>👥 {game.players || '?'}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {game.categories?.slice(0, 2).map((cat) => (
            <span key={cat} className="px-2 py-0.5 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default GameCard
