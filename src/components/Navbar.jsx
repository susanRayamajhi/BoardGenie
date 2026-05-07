import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar({ favCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-gold bg-navy-light' : 'text-muted hover:text-white hover:bg-navy-light'
    }`

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy/92 backdrop-blur-sm border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between h-16" aria-label="Main navigation">

        <NavLink to="/" className="font-heading text-xl font-bold text-white" aria-label="BoardGenie home">
          Board<span className="text-gold">Genie</span>
        </NavLink>

        {/* navbar for desktop*/}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/"       end className={linkClass}>Home</NavLink>
          <NavLink to="/finder"     className={linkClass}>Game Finder</NavLink>
          <NavLink to="/form"       className={linkClass}>Preference Form</NavLink>
          <NavLink to="/trending"   className={linkClass}>Trending</NavLink>
          <NavLink to="/favorites"  className={linkClass}>
            Favorites
            {favCount > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center bg-gold text-navy text-xs font-bold rounded-full w-4 h-4" aria-label={`${favCount} saved games`}>
                {favCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>

        {/* applying hamburger toggle */}
        <button
          className="md:hidden p-2 text-white bg-transparent border-0 cursor-pointer rounded-lg hover:bg-navy-light transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'rotate(45deg) translate(2px, 6px)' : 'none' }} />
          <span className="block w-5 h-0.5 bg-white mb-1 transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-white transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'rotate(-45deg) translate(2px, -6px)' : 'none' }} />
        </button>
      </nav>

      {/* responsiveness for mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="md:hidden bg-card-bg border-t border-white/5 px-5 py-4 flex flex-col gap-1" role="menu">
          <NavLink to="/"       end className={linkClass} onClick={closeMenu}>Home</NavLink>
          <NavLink to="/finder"     className={linkClass} onClick={closeMenu}>Game Finder</NavLink>
          <NavLink to="/form"       className={linkClass} onClick={closeMenu}>Preference Form</NavLink>
          <NavLink to="/trending"   className={linkClass} onClick={closeMenu}>Trending</NavLink>
          <NavLink to="/favorites"  className={linkClass} onClick={closeMenu}>Favorites {favCount > 0 && `(${favCount})`}</NavLink>
          <NavLink to="/about"      className={linkClass} onClick={closeMenu}>About</NavLink>
        </div>
      )}
    </header>
  )
}

export default Navbar
