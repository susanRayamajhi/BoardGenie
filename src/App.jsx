import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar         from './components/Navbar'
import GameModal      from './components/GameModal'
import Home           from './pages/Home'
import GameFinder     from './pages/GameFinder'
import Trending       from './pages/Trending'
import Favorites      from './pages/Favorites'
import About          from './pages/About'
import PreferenceForm from './pages/PreferenceForm'

function loadFavorites() {
  try {
    const raw = JSON.parse(localStorage.getItem('boardgenie_favs') || '[]')
    return raw.map((id) => String(id))
  } catch {
    return []
  }
}

function App() {
  const [favorites,    setFavorites]    = useState(loadFavorites)
  const [selectedGame, setSelectedGame] = useState(null)
  const [toast,        setToast]        = useState(null)

  const isFav = (id) => favorites.includes(String(id))

  const handleToggleFav = (id) => {
    const strId = String(id)
    setFavorites((prev) => {
      const isAdding = !prev.includes(strId)
      const updated  = isAdding ? [...prev, strId] : prev.filter((f) => f !== strId)
      localStorage.setItem('boardgenie_favs', JSON.stringify(updated))
      showToast(isAdding ? '❤️ Saved to favorites!' : '💔 Removed from favorites')
      return updated
    })
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2500)
  }

  // validating game object before setting it as selectedGame
  const handleOpenModal = (game) => {
    if (!game || !game.id || !game.name) {
      console.warn('Invalid game object passed to modal:', game)
      return
    }
    setSelectedGame(game)
  }

  const handleSurpriseMe = (game) => {
    if (!game || !game.id || !game.name) {
      console.warn('Invalid game from surprise me:', game)
      showToast('😕 Could not find a game, try again!')
      return
    }
    setSelectedGame(game)
    showToast('✨ Picked one for you!')
  }

  const sharedProps = {
    isFav,
    onToggleFav: handleToggleFav,
    onOpenModal:  handleOpenModal,
  }

  return (
    <div className="min-h-screen bg-navy">
      <Navbar favCount={favorites.length} />

      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-4 focus:z-50 focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm">
        Skip to main content
      </a>

      <div className="pt-16">
        <Routes>
          <Route path="/"          element={<Home           {...sharedProps} />} />
          <Route path="/finder"    element={<GameFinder     {...sharedProps} onSurpriseMe={handleSurpriseMe} />} />
          <Route path="/form"      element={<PreferenceForm {...sharedProps} />} />
          <Route path="/trending"  element={<Trending       {...sharedProps} />} />
          <Route path="/favorites" element={<Favorites      favorites={favorites} {...sharedProps} />} />
          <Route path="/about"     element={<About />} />
        </Routes>
      </div>

      {/* only render when selectedGame is a valid object */}
      {selectedGame && selectedGame.id && selectedGame.name && (
        <GameModal
          game={selectedGame}
          isFav={isFav}
          onToggleFav={handleToggleFav}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-navy-light border border-white/10 text-sm px-5 py-2.5 rounded-full shadow-lg transition-all duration-300 whitespace-nowrap z-50 ${
          toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {toast}
      </div>
    </div>
  )
}

export default App
