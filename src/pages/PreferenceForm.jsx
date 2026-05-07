import { useState } from 'react'
import { fetchGames } from '../games'
import GameCard from '../components/GameCard'
import SkeletonCard from '../components/SkeletonCard'


const INITIAL = {
  name:       '',
  groupSize:  '',
  duration:   '',
  complexity: '',
  genre:      '',
}

const ERRORS_INITIAL = {
  name:       '',
  groupSize:  '',
  duration:   '',
  complexity: '',
}

function PreferenceForm({ isFav, onToggleFav, onOpenModal }) {
  const [form, setForm]         = useState(INITIAL)
  const [errors, setErrors]     = useState(ERRORS_INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults]   = useState([])
  const [loading, setLoading]   = useState(false)

  // validation 
  function validate() {
    const newErrors = { ...ERRORS_INITIAL }
    let valid = true

    if (!form.name.trim()) {
      newErrors.name = 'Please enter your name'
      valid = false
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
      valid = false
    }

    if (!form.groupSize) {
      newErrors.groupSize = 'Please select your group size'
      valid = false
    }

    if (!form.duration) {
      newErrors.duration = 'Please select your preferred game duration'
      valid = false
    }

    if (!form.complexity) {
      newErrors.complexity = 'Please select a complexity level'
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setSubmitted(false)

    // map group size to player filter
    const playerMap = { '1': '2', '2-3': '3-4', '4+': '5+' }
    const filters = {
      duration:   form.duration,
      complexity: form.complexity,
    }
    if (form.groupSize) {
      const range = playerMap[form.groupSize]
      if (range === '2')   { filters.minPlayers = 2; filters.maxPlayers = 2 }
      if (range === '3-4') { filters.minPlayers = 3; filters.maxPlayers = 4 }
      if (range === '5+')  { filters.minPlayers = 5; filters.maxPlayers = 10 }
    }

    const games = await fetchGames(filters)
    setResults(games)
    setSubmitted(true)
    setLoading(false)
  }

  const handleReset = () => {
    setForm(INITIAL)
    setErrors(ERRORS_INITIAL)
    setSubmitted(false)
    setResults([])
  }

  // ── field components 
  const Field = ({ label, name, required, children }) => (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white mb-1.5"
      >
        {label}
        {required && <span className="text-gold ml-1" aria-hidden="true">*</span>}
      </label>
      {children}
      {errors[name] && (
        <p
          className="mt-1.5 text-xs text-red-400 flex items-center gap-1"
          role="alert"
          aria-live="polite"
        >
          ⚠ {errors[name]}
        </p>
      )}
    </div>
  )

  const inputClass = (name) =>
    `w-full px-4 py-2.5 rounded-xl bg-navy-light border text-sm text-white outline-none transition-colors ${
      errors[name]
        ? 'border-red-500 focus:border-red-400'
        : 'border-white/10 focus:border-gold'
    }`

  return (
    <main className="max-w-4xl mx-auto px-5 md:px-8 py-8 page-fade" id="main-content">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold">
          🎯 Find Your <span className="text-gold">Perfect Game</span>
        </h1>
        <p className="text-muted text-sm mt-1">
          Fill in your preferences and we will find the best games for your group
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-8">

        {/* form  */}
        <section aria-labelledby="form-heading">
          <h2 id="form-heading" className="sr-only">Game Preference Form</h2>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-card-bg border border-white/8 rounded-2xl p-6"
            aria-label="Game preference form"
          >
            {/* Name */}
            <Field label="Your Name" name="name" required>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Susan"
                className={inputClass('name')}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
                autoComplete="given-name"
              />
            </Field>

            {/* Group Size section */}
            <Field label="Group Size" name="groupSize" required>
              <select
                id="groupSize"
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                className={inputClass('groupSize')}
                aria-required="true"
                aria-invalid={!!errors.groupSize}
              >
                <option value="">Select group size...</option>
                <option value="1">Just me (Solo)</option>
                <option value="2-3">2–3 players</option>
                <option value="4+">4 or more players</option>
              </select>
            </Field>

            {/* Duration section*/}
            <Field label="How long do you want to play?" name="duration" required>
              <select
                id="duration"
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className={inputClass('duration')}
                aria-required="true"
                aria-invalid={!!errors.duration}
              >
                <option value="">Select duration...</option>
                <option value="<30">Quick game — under 30 minutes</option>
                <option value="30-60">Medium — 30 to 60 minutes ⭐ Most popular</option>
                <option value="60-90">Long — 60 to 90 minutes</option>
                <option value="90+">Epic — 90+ minutes</option>
              </select>
            </Field>

            {/* Complexity section */}
            <Field label="Complexity Level" name="complexity" required>
              <div
                className="flex gap-3 flex-wrap"
                role="group"
                aria-label="Select complexity level"
              >
                {[
                  { val: 'Easy',   emoji: '😊', desc: 'Simple rules' },
                  { val: 'Medium', emoji: '🧠', desc: 'Some strategy' },
                  { val: 'Hard',   emoji: '🔥', desc: 'Deep tactics' },
                ].map(({ val, emoji, desc }) => (
                  <label
                    key={val}
                    className={`flex-1 min-w-[80px] flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                      form.complexity === val
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-white/10 text-muted hover:border-gold/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="complexity"
                      value={val}
                      checked={form.complexity === val}
                      onChange={handleChange}
                      className="sr-only"
                      aria-label={`${val} complexity — ${desc}`}
                    />
                    <span className="text-2xl mb-1">{emoji}</span>
                    <span className="text-xs font-semibold">{val}</span>
                    <span className="text-xs opacity-70">{desc}</span>
                  </label>
                ))}
              </div>
              {errors.complexity && (
                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1" role="alert">
                  ⚠ {errors.complexity}
                </p>
              )}
            </Field>

            {/* Genre section */}
            <Field label="Favourite Genre (optional)" name="genre">
              <select
                id="genre"
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className={inputClass('genre')}
              >
                <option value="">No preference</option>
                <option value="Strategy">Strategy</option>
                <option value="Cooperative">Cooperative</option>
                <option value="Party">Party / Word</option>
                <option value="Adventure">Adventure</option>
                <option value="Economic">Economic</option>
              </select>
            </Field>

            {/* required fields note */}
            <p className="text-muted text-xs mb-5">
              <span className="text-gold">*</span> Required fields
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gold text-navy py-3 rounded-full text-sm font-bold hover:bg-gold-hover transition-colors border-0 cursor-pointer disabled:opacity-60"
                aria-busy={loading}
              >
                {loading ? '⏳ Finding games...' : '🎲 Find My Games'}
              </button>
              {submitted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3 rounded-full text-sm border border-white/15 text-muted hover:text-white transition-colors bg-transparent cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Results section*/}
        <section aria-labelledby="results-heading" aria-live="polite">
          <h2 id="results-heading" className="sr-only">Recommended Games</h2>

          {!submitted && !loading && (
            <div className="bg-card-bg border border-white/8 border-dashed rounded-2xl p-8 text-center text-muted h-full flex flex-col items-center justify-center">
              <p className="text-4xl mb-3" aria-hidden="true">🎲</p>
              <p className="font-heading font-bold text-white mb-1">Your results will appear here</p>
              <p className="text-sm">Fill in the form and hit Find My Games</p>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 gap-4" aria-busy="true">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {submitted && !loading && (
            <div>
              {results.length > 0 ? (
                <>
                  <p className="text-sm text-muted mb-4">
                    Found <span className="text-gold font-semibold">{results.length} games</span> matching your preferences
                    {form.name && `, ${form.name}`}!
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {results.slice(0, 6).map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        isFav={isFav}
                        onToggleFav={onToggleFav}
                        onOpenModal={onOpenModal}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="bg-card-bg border border-white/8 rounded-2xl p-8 text-center text-muted">
                  <p className="text-4xl mb-3" aria-hidden="true">😕</p>
                  <p className="font-heading font-bold text-white mb-1">No exact matches</p>
                  <p className="text-sm">Try selecting a different complexity or duration</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default PreferenceForm
