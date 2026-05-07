import { useEffect, useRef } from 'react'

function GameModal({ game, isFav, onToggleFav, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!game || !game.id || !game.name) return null

  const favorited = isFav(String(game.id))
  const stars     = game.rating ? Math.min(5, Math.round(game.rating)) : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-game-title"
    >
      <div className="bg-card-bg border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* header with emoji */}
        <div
          className="w-full h-36 flex items-center justify-center rounded-t-2xl relative"
          style={{
            background: game.color
              ? `linear-gradient(135deg, ${game.color}, #0D1B2A)`
              : 'linear-gradient(135deg, #162338, #0D1B2A)',
          }}
        >
          <span className="text-7xl select-none" role="img" aria-label={game.name}>
            {game.emoji || '🎲'}
          </span>
          {game.rating && (
            <span className="absolute bottom-3 left-4 bg-navy/80 text-gold text-xs font-semibold px-2.5 py-1 rounded-full border border-gold/20">
              ★ {game.rating}/5
            </span>
          )}
          {game.year && (
            <span className="absolute bottom-3 right-4 text-white/50 text-xs">{game.year}</span>
          )}
        </div>

        {/* Header portion */}
        <div className="flex items-start justify-between px-6 pt-5 pb-0">
          <div className="flex-1 pr-4">
            <h2 id="modal-game-title" className="font-heading font-bold text-xl leading-tight">
              {game.name}
            </h2>
            {game.rating && (
              <div className="flex items-center gap-1 mt-1" aria-label={`Rating: ${game.rating} out of 5`}>
                <span className="text-gold text-xs">{'★'.repeat(stars)}{'☆'.repeat(5 - stars)}</span>
              </div>
            )}
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            className="text-muted hover:text-white transition-colors text-lg bg-transparent border-0 cursor-pointer p-1 rounded-lg hover:bg-white/8 flex-shrink-0"
            aria-label="Close game details"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          <p className="text-muted text-sm leading-relaxed mb-5">
            {game.description || 'No description available.'}
          </p>

          {/* Stats portion */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { val: game.duration || '?', lbl: 'Duration' },
              { val: game.players  || '?', lbl: 'Players' },
              { val: game.complexity || '?', lbl: 'Complexity' },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="bg-navy-light rounded-xl p-3 text-center">
                <p className="font-heading font-bold text-gold text-sm">{val}</p>
                <p className="text-xs text-muted mt-0.5">{lbl}</p>
              </div>
            ))}
          </div>

          {/* Categories array portion */}
          {Array.isArray(game.categories) && game.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {game.categories.map((cat) => (
                <span key={cat} className="px-3 py-1 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">
                  {cat}
                </span>
              ))}
            </div>
          )}

          {game.rank && (
            <p className="text-xs text-muted mb-5">
              🏆 Ranked <span className="text-gold font-semibold">#{game.rank}</span> on BoardGameGeek
            </p>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onToggleFav(String(game.id))}
              className={`flex-1 py-2.5 rounded-full text-sm font-semibold cursor-pointer border-0 transition-all duration-200 ${
                favorited
                  ? 'bg-navy-light text-white hover:bg-navy border border-white/15'
                  : 'bg-gold text-navy hover:bg-gold-hover'
              }`}
              aria-label={favorited ? `Remove ${game.name} from favorites` : `Save ${game.name} to favorites`}
              aria-pressed={favorited}
            >
              {favorited ? '💔 Remove from Favorites' : '❤️ Save to Favorites'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm border border-white/15 text-muted hover:text-white transition-colors bg-transparent cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameModal
