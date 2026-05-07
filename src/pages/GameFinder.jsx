import { useState, useEffect } from 'react'
import {
  fetchGames, fetchRandomGame, searchGames,
  fetchGameBooks,
  DURATION_TO_PLAYTIME, PLAYERS_TO_RANGE,
} from '../games'
import GameCard from '../components/GameCard'
import SkeletonCard from '../components/SkeletonCard'

function GameFinder({ isFav, onToggleFav, onOpenModal, onSurpriseMe }) {
  const [search, setSearch]             = useState('')
  const [players, setPlayers]           = useState('')
  const [duration, setDuration]         = useState('30-60')
  const [complexity, setComplexity]     = useState('Medium')
  const [games, setGames]               = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [surpriseLoading, setSurprise]  = useState(false)
  const [bookQuery, setBookQuery]       = useState('')
  const [books, setBooks]               = useState([])
  const [booksLoading, setBooksLoading] = useState(true)
  const [booksError, setBooksError]     = useState(null)

  // this function load games whenever inputs is changed
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true); setError(null)
      try {
        let results
        if (search.trim().length > 1) {
          results = await searchGames(search.trim())
          if (complexity) results = results.filter((g) => g.complexity === complexity)
          if (duration)   results = results.filter((g) => g.duration   === duration)
        } else {
          const filters = { complexity, duration }
          if (players) {
            const r = PLAYERS_TO_RANGE[players]
            if (r) { filters.minPlayers = r.min; filters.maxPlayers = r.max }
          }
          results = await fetchGames(filters)
        }
        setGames(results || [])
      } catch (err) {
        console.error(err); setError('Could not load games.')
      } finally { setLoading(false) }
    }, 400)
    return () => clearTimeout(timeout)
  }, [search, players, duration, complexity])

  // loading books on mount
  useEffect(() => { loadBooks('board games strategy') }, [])

  async function loadBooks(query) {
    setBooksLoading(true); setBooksError(null)
    try {
      const data = await fetchGameBooks(query)
      setBooks(data || [])
    } catch { setBooksError('Could not load books.') }
    finally { setBooksLoading(false) }
  }

  const handleBookSearch = (e) => {
    e.preventDefault()
    if (bookQuery.trim().length < 2) return
    loadBooks(bookQuery.trim())
  }

  const handleReset = () => {
    setSearch(''); setPlayers(''); setDuration(''); setComplexity('')
  }

  const handleSurprise = async () => {
    setSurprise(true)
    try {
      const filters = {}
      if (duration) { const r = DURATION_TO_PLAYTIME[duration]; filters.minPlaytime = r.min; filters.maxPlaytime = r.max }
      if (players)  { const r = PLAYERS_TO_RANGE[players]; if (r) filters.minPlayers = r.min }
      const game = await fetchRandomGame(filters)
      if (game && game.id && game.name) onSurpriseMe(game)
    } catch (err) { console.error(err) }
    finally { setSurprise(false) }
  }

  const selectClass = "w-full px-4 py-2.5 rounded-xl bg-navy border border-white/10 text-sm text-white outline-none focus:border-gold transition-colors cursor-pointer appearance-none"

  return (
    <main className="max-w-6xl mx-auto px-5 md:px-8 py-8 page-fade" id="main-content">

      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold">
          🎲 <span className="text-gold">Game</span> Finder
        </h1>
        <p className="text-muted text-sm mt-1">
          Use the search and dropdowns to browse games — or hit{' '}
          <span className="text-gold font-medium">Surprise Me</span> for a random pick
        </p>
      </div>

      {/* search and dropdown */}
      <div className="bg-card-bg border border-white/8 rounded-2xl p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">

          {/* Search */}
          <div className="lg:col-span-2">
            <label htmlFor="game-search" className="block text-xs text-gold font-semibold uppercase tracking-wider mb-1.5">
              Search
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none" aria-hidden="true">🔍</span>
              <input
                id="game-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or category..."
                aria-label="Search board games"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-navy border border-white/10 text-sm text-white outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          {/* Players portion */}
          <div>
            <label htmlFor="players-select" className="block text-xs text-gold font-semibold uppercase tracking-wider mb-1.5">
              Players
            </label>
            <div className="relative">
              <select
                id="players-select"
                value={players}
                onChange={(e) => setPlayers(e.target.value)}
                className={selectClass}
                aria-label="Filter by number of players"
              >
                <option value="">Any</option>
                <option value="2">2 players</option>
                <option value="3-4">3–4 players</option>
                <option value="5+">5+ players</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none">▼</span>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration-select" className="block text-xs text-gold font-semibold uppercase tracking-wider mb-1.5">
              Duration
            </label>
            <div className="relative">
              <select
                id="duration-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={selectClass}
                aria-label="Filter by game duration"
              >
                <option value="">Any</option>
                <option value="<30">Under 30 min</option>
                <option value="30-60">30–60 min</option>
                <option value="60-90">60–90 min</option>
                <option value="90+">90+ min</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none">▼</span>
            </div>
          </div>

          {/* Complexity */}
          <div>
            <label htmlFor="complexity-select" className="block text-xs text-gold font-semibold uppercase tracking-wider mb-1.5">
              Complexity
            </label>
            <div className="relative">
              <select
                id="complexity-select"
                value={complexity}
                onChange={(e) => setComplexity(e.target.value)}
                className={selectClass}
                aria-label="Filter by complexity level"
              >
                <option value="">Any</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-xs pointer-events-none">▼</span>
            </div>
          </div>
        </div>

        {/*surprise me and reset buttons row */}
        <div className="flex items-center gap-3 mt-4 flex-wrap">
          <button
            onClick={handleSurprise}
            disabled={surpriseLoading}
            className="pulse-gold px-5 py-2.5 rounded-full text-sm font-bold bg-gold text-navy hover:bg-gold-hover transition-colors border-0 cursor-pointer disabled:opacity-70 flex items-center gap-2"
            aria-label="Get a surprise game recommendation"
            aria-busy={surpriseLoading}
          >
            {surpriseLoading ? '⏳ Finding...' : '✨ Surprise Me!'}
          </button>
          <button
            onClick={handleReset}
            className="px-5 py-2.5 rounded-full text-sm text-muted border border-white/10 bg-transparent hover:text-white hover:border-white/30 transition-colors cursor-pointer"
            aria-label="Reset all filters"
          >
            ↩ Reset
          </button>
          <p className="ml-auto text-muted text-sm" aria-live="polite" aria-atomic="true">
            {loading ? 'Loading...' : `${games.length} game${games.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Games grid */}
      <section aria-label="Game results">
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" aria-busy="true">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {error && (
          <div className="bg-card-bg border border-red-500/20 rounded-xl p-6 text-center" role="alert">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
        {!loading && !error && games.length === 0 && (
          <div className="text-center py-16 text-muted">
            <p className="text-4xl mb-3" aria-hidden="true">🎲</p>
            <p className="font-heading font-bold text-white mb-1">No games found</p>
            <p className="text-sm">Try a different search or change the dropdowns</p>
          </div>
        )}
        {!loading && !error && games.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <GameCard key={game.id} game={game} isFav={isFav} onToggleFav={onToggleFav} onOpenModal={onOpenModal} />
            ))}
          </div>
        )}
      </section>

      {/*  Open Library API for game guide books section*/}
      <section className="mt-12" aria-labelledby="books-heading">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h2 id="books-heading" className="font-heading font-bold text-xl">
            📚 <span className="text-gold">Game Guides</span>
          </h2>
          <span className="inline-flex items-center gap-1.5 text-xs text-gold px-2.5 py-1 bg-gold/10 rounded-full border border-gold/20 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse inline-block" />
             Read and Enjoy 
          </span>
        </div>
        <p className="text-muted text-sm mb-5">
          Search books about board games from{' '}
          <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            Open Library
          </a>
        </p>

        {/* Book search form */}
        <form onSubmit={handleBookSearch} className="flex gap-3 mb-4 flex-wrap" aria-label="Search board game books">
          <div className="relative flex-1 max-w-sm">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm pointer-events-none" aria-hidden="true">📖</span>
            <input
              type="search"
              value={bookQuery}
              onChange={(e) => setBookQuery(e.target.value)}
              placeholder='e.g. "Catan", "strategy games", "game design"'
              aria-label="Search for board game books on Open Library"
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-card-bg border border-white/10 text-sm text-white outline-none focus:border-gold transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={booksLoading || bookQuery.trim().length < 2}
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gold text-navy hover:bg-gold-hover transition-colors border-0 cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            {booksLoading ? '⏳ Searching...' : '🔍 Search Books'}
          </button>
        </form>

    
        <div className="flex flex-wrap gap-2 mb-6" role="group" aria-label="Quick book searches">
          {['board games', 'game design', 'strategy games', 'Catan', 'Dungeons Dragons', 'chess'].map((q) => (
            <button key={q} onClick={() => { setBookQuery(q); loadBooks(q) }}
              className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-muted hover:border-gold hover:text-gold transition-all cursor-pointer bg-transparent">
              {q}
            </button>
          ))}
        </div>

        {booksLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-busy="true">
            {[...Array(6)].map((_, i) => <div key={i} className="bg-card-bg border border-white/8 rounded-xl h-28 skeleton" />)}
          </div>
        )}
        {booksError && !booksLoading && (
          <div className="bg-card-bg border border-red-500/20 rounded-xl p-4 text-center" role="alert">
            <p className="text-red-400 text-sm">{booksError}</p>
          </div>
        )}
        {!booksLoading && !booksError && books.length === 0 && (
          <div className="text-center py-10 text-muted">
            <p className="text-3xl mb-2">📭</p>
            <p className="text-sm">No books found — please try a different search</p>
          </div>
        )}
        {!booksLoading && !booksError && books.length > 0 && (
          <>
            <p className="text-muted text-xs mb-4" aria-live="polite">
              Showing <span className="text-white font-medium">{books.length} books</span> 
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {books.map((book) => (
                <a key={book.key} href={book.url} target="_blank" rel="noopener noreferrer"
                  className="bg-card-bg border border-white/8 rounded-xl p-4 hover:border-gold/40 transition-all duration-200 hover:-translate-y-1 group"
                  aria-label={`${book.title} by ${book.author} — opens in new tab`}>
                  <div className="flex gap-3">
                    {book.cover ? (
                      <img src={book.cover} alt={`Cover of ${book.title}`}
                        className="w-12 h-16 object-cover rounded-md flex-shrink-0 shadow-md"
                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                    ) : null}
                    <div className="w-12 h-16 bg-navy-light rounded-md items-center justify-center flex-shrink-0 text-xl"
                      style={{ display: book.cover ? 'none' : 'flex' }} aria-hidden="true">📖</div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <h3 className="font-heading font-bold text-xs leading-tight group-hover:text-gold transition-colors line-clamp-2 mb-1">{book.title}</h3>
                      <p className="text-muted text-xs truncate">{book.author}</p>
                      {book.year && <p className="text-muted text-xs mt-0.5">{book.year}</p>}
                      <span className="text-gold text-xs mt-1.5 group-hover:underline">View on Open Library →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default GameFinder
