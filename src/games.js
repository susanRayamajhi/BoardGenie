// BoardGenie game data
// Using BGG image IDs with their working CDN format

const games = [
  {
    id: '174430',
    name: 'Gloomhaven',
    image: null,
    color: '#1a2744',
    emoji: '⚔️',
    description: 'A game of Euro-inspired tactical combat in a persistent world of shifting motives. Players take on the role of wandering adventurers with unique skills.',
    minPlayers: 1, maxPlayers: 4, players: '1–4',
    minPlaytime: 60, maxPlaytime: 120, duration: '60-90',
    rating: 8.5, rank: 1, year: '2017',
    categories: ['Adventure', 'Fantasy', 'Fighting'], complexity: 'Hard',
  },
  {
    id: '224517',
    name: 'Brass: Birmingham',
    image: null,
    color: '#2d1b0e',
    emoji: '🏭',
    description: 'An economic strategy game set during the industrial revolution. Build networks, grow industries and navigate market forces to dominate.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 60, maxPlaytime: 120, duration: '60-90',
    rating: 8.7, rank: 2, year: '2018',
    categories: ['Economic', 'Industry', 'Strategy'], complexity: 'Hard',
  },
  {
    id: '161936',
    name: 'Pandemic Legacy: Season 1',
    image: null,
    color: '#0e2a1a',
    emoji: '🧬',
    description: 'A co-operative campaign game where your team fights to keep four deadly diseases at bay across a full year of play.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 60, maxPlaytime: 75, duration: '60-90',
    rating: 8.6, rank: 3, year: '2015',
    categories: ['Cooperative', 'Medical', 'Strategy'], complexity: 'Medium',
  },
  {
    id: '167791',
    name: 'Terraforming Mars',
    image: null,
    color: '#2d1206',
    emoji: '🔴',
    description: 'Compete with rival corporations to terraform Mars by raising temperature, oxygen and placing ocean tiles to win.',
    minPlayers: 1, maxPlayers: 5, players: '1–5',
    minPlaytime: 120, maxPlaytime: 180, duration: '90+',
    rating: 8.4, rank: 4, year: '2016',
    categories: ['Economic', 'Science Fiction', 'Strategy'], complexity: 'Hard',
  },
  {
    id: '342942',
    name: 'Ark Nova',
    image: null,
    color: '#0a2416',
    emoji: '🦁',
    description: 'Plan and design a modern scientifically managed zoo. Build enclosures, accommodate animals and support conservation projects.',
    minPlayers: 1, maxPlayers: 4, players: '1–4',
    minPlaytime: 90, maxPlaytime: 150, duration: '90+',
    rating: 8.6, rank: 5, year: '2021',
    categories: ['Animals', 'Economic', 'Strategy'], complexity: 'Hard',
  },
  {
    id: '316554',
    name: 'Dune: Imperium',
    image: null,
    color: '#2a1e06',
    emoji: '🏜️',
    description: 'A game of conquest, betrayal and trade in the Dune universe. Use agents and build your deck to gain control of Arrakis.',
    minPlayers: 1, maxPlayers: 4, players: '1–4',
    minPlaytime: 60, maxPlaytime: 120, duration: '60-90',
    rating: 8.4, rank: 6, year: '2020',
    categories: ['Deckbuilding', 'Science Fiction', 'Strategy'], complexity: 'Medium',
  },
  {
    id: '284083',
    name: 'The Crew: Moon Mission',
    image: null,
    color: '#060e2a',
    emoji: '🚀',
    description: 'A cooperative trick-taking card game. Work as a team across 50 missions — communication is limited so every card counts.',
    minPlayers: 2, maxPlayers: 5, players: '2–5',
    minPlaytime: 20, maxPlaytime: 30, duration: '<30',
    rating: 8.1, rank: 7, year: '2019',
    categories: ['Card Game', 'Cooperative', 'Space'], complexity: 'Easy',
  },
  {
    id: '266192',
    name: 'Wingspan',
    image: null,
    color: '#0d2416',
    emoji: '🦅',
    description: 'Attract a diverse collection of birds to your wildlife preserves. Each bird extends a chain of powerful combinations in your habitats.',
    minPlayers: 1, maxPlayers: 5, players: '1–5',
    minPlaytime: 40, maxPlaytime: 70, duration: '30-60',
    rating: 8.1, rank: 8, year: '2019',
    categories: ['Animals', 'Card Game', 'Nature'], complexity: 'Medium',
  },
  {
    id: '230802',
    name: 'Azul',
    image: null,
    color: '#06162a',
    emoji: '🔷',
    description: 'Draft beautiful tiles to decorate the walls of the royal palace. Score points for completing patterns but lose points for waste.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 30, maxPlaytime: 45, duration: '30-60',
    rating: 7.8, rank: 9, year: '2017',
    categories: ['Abstract', 'Puzzle', 'Strategy'], complexity: 'Easy',
  },
  {
    id: '178900',
    name: 'Codenames',
    image: null,
    color: '#1a0e06',
    emoji: '🕵️',
    description: 'Two rival spymasters give one-word clues to help teammates identify their secret agents. A perfect party game for groups.',
    minPlayers: 2, maxPlayers: 8, players: '2–8',
    minPlaytime: 15, maxPlaytime: 30, duration: '<30',
    rating: 7.6, rank: 10, year: '2015',
    categories: ['Deduction', 'Party', 'Word Game'], complexity: 'Easy',
  },
  {
    id: '13',
    name: 'Catan',
    image: null,
    color: '#1a2206',
    emoji: '🏝️',
    description: 'Trade, build and settle the island of Catan. Collect resources and race to reach 10 victory points before your opponents.',
    minPlayers: 3, maxPlayers: 4, players: '3–4',
    minPlaytime: 60, maxPlaytime: 120, duration: '60-90',
    rating: 7.1, rank: 11, year: '1995',
    categories: ['Negotiation', 'Strategy', 'Trading'], complexity: 'Medium',
  },
  {
    id: '9209',
    name: 'Ticket to Ride',
    image: null,
    color: '#1a0606',
    emoji: '🚂',
    description: 'Collect train cards to claim railway routes connecting cities. Build the longest routes and complete destination tickets to win.',
    minPlayers: 2, maxPlayers: 5, players: '2–5',
    minPlaytime: 30, maxPlaytime: 60, duration: '30-60',
    rating: 7.4, rank: 12, year: '2004',
    categories: ['Card Game', 'Strategy', 'Travel'], complexity: 'Easy',
  },
  {
    id: '30549',
    name: 'Pandemic',
    image: null,
    color: '#060e1a',
    emoji: '🌍',
    description: 'Work together to stop four deadly diseases from spreading across the globe. Travel, treat infections and find cures before time runs out.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 45, maxPlaytime: 60, duration: '30-60',
    rating: 7.6, rank: 13, year: '2008',
    categories: ['Cooperative', 'Medical', 'Strategy'], complexity: 'Medium',
  },
  {
    id: '68448',
    name: '7 Wonders',
    image: null,
    color: '#1a1206',
    emoji: '🏛️',
    description: 'Draft cards to develop your ancient civilization across three ages. Build wonders, develop trade and build a military force.',
    minPlayers: 2, maxPlayers: 7, players: '2–7',
    minPlaytime: 30, maxPlaytime: 45, duration: '30-60',
    rating: 7.7, rank: 14, year: '2010',
    categories: ['Ancient', 'Card Drafting', 'Civilization'], complexity: 'Medium',
  },
  {
    id: '36218',
    name: 'Dominion',
    image: null,
    color: '#160e22',
    emoji: '👑',
    description: 'The original deck-building game. Start with a small deck and use cards to acquire more powerful ones to score victory points.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 30, maxPlaytime: 60, duration: '30-60',
    rating: 7.6, rank: 15, year: '2008',
    categories: ['Card Game', 'Deck Building', 'Medieval'], complexity: 'Medium',
  },
  {
    id: '31260',
    name: 'Agricola',
    image: null,
    color: '#0e1a06',
    emoji: '🌾',
    description: 'You are a farmer trying to grow crops and raise livestock while keeping your family fed. A classic worker placement game.',
    minPlayers: 1, maxPlayers: 5, players: '1–5',
    minPlaytime: 30, maxPlaytime: 150, duration: '60-90',
    rating: 7.9, rank: 16, year: '2007',
    categories: ['Animals', 'Farming', 'Strategy'], complexity: 'Medium',
  },
  {
    id: '170042',
    name: 'Blood Rage',
    image: null,
    color: '#220608',
    emoji: '🪓',
    description: 'Lead your Viking clan to glory before Ragnarok destroys the world. Draft cards, recruit warriors and fight with honour.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 60, maxPlaytime: 90, duration: '60-90',
    rating: 8.0, rank: 17, year: '2015',
    categories: ['Fantasy', 'Fighting', 'Mythology'], complexity: 'Medium',
  },
  {
    id: '110308',
    name: 'Betrayal at House on the Hill',
    image: null,
    color: '#0e0e0e',
    emoji: '👻',
    description: 'Explore a haunted mansion until the haunt begins — then one player becomes the traitor. 50 unique haunts make every game different.',
    minPlayers: 3, maxPlayers: 6, players: '3–6',
    minPlaytime: 60, maxPlaytime: 90, duration: '60-90',
    rating: 6.9, rank: 18, year: '2004',
    categories: ['Horror', 'Mystery', 'Exploration'], complexity: 'Medium',
  },
  {
    id: '220308',
    name: 'Gaia Project',
    image: null,
    color: '#060a22',
    emoji: '🌌',
    description: 'Fourteen factions use unique skills to terraform and colonize the galaxy. Develop technologies and build federations to win.',
    minPlayers: 1, maxPlayers: 4, players: '1–4',
    minPlaytime: 60, maxPlaytime: 150, duration: '60-90',
    rating: 8.5, rank: 19, year: '2017',
    categories: ['Science Fiction', 'Space', 'Strategy'], complexity: 'Hard',
  },
  {
    id: '182028',
    name: 'Through the Ages',
    image: null,
    color: '#1a1406',
    emoji: '🏺',
    description: 'Build the greatest civilization through the ages. Draft cards to develop from antiquity through to the modern age.',
    minPlayers: 2, maxPlayers: 4, players: '2–4',
    minPlaytime: 120, maxPlaytime: 240, duration: '90+',
    rating: 8.4, rank: 20, year: '2015',
    categories: ['Civilization', 'Economic', 'Strategy'], complexity: 'Hard',
  },
]

// ── Open Library API ──────────────────────────────────────────
export async function fetchGameBooks(query = 'board games strategy') {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6&fields=key,title,author_name,first_publish_year,cover_i`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch from Open Library')
  const data = await res.json()
  return data.docs
    .filter((book) => book.title && book.author_name)
    .slice(0, 6)
    .map((book) => ({
      key:    book.key,
      title:  book.title,
      author: book.author_name?.[0] || 'Unknown Author',
      year:   book.first_publish_year || null,
      cover:  book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : null,
      url: `https://openlibrary.org${book.key}`,
    }))
}

// ── Filter functions ──────────────────────────────────────────
export function fetchTrending() {
  return Promise.resolve([...games].sort((a, b) => b.rating - a.rating).slice(0, 8))
}

export function fetchAllRanked() {
  return Promise.resolve([...games].sort((a, b) => (a.rank || 999) - (b.rank || 999)))
}

export function searchGames(query) {
  const q = query.toLowerCase()
  return Promise.resolve(
    games.filter(
      (g) =>
        g.name.toLowerCase().includes(q) ||
        g.categories.some((c) => c.toLowerCase().includes(q)) ||
        g.description.toLowerCase().includes(q)
    )
  )
}

export function fetchGames(filters = {}) {
  let results = [...games]
  if (filters.complexity)  results = results.filter((g) => g.complexity  === filters.complexity)
  if (filters.duration)    results = results.filter((g) => g.duration    === filters.duration)
  if (filters.minPlayers)  results = results.filter((g) => g.minPlayers  <= parseInt(filters.minPlayers))
  if (filters.maxPlayers)  results = results.filter((g) => g.maxPlayers  >= parseInt(filters.maxPlayers))
  return Promise.resolve(results)
}

export function fetchRandomGame(filters = {}) {
  return fetchGames(filters).then((results) => {
    const pool = results.length > 0 ? results : games
    return pool[Math.floor(Math.random() * pool.length)]
  })
}

export const PLAYER_OPTIONS     = ['2', '3-4', '5+']
export const DURATION_OPTIONS   = ['<30', '30-60', '60-90', '90+']
export const COMPLEXITY_OPTIONS = ['Easy', 'Medium', 'Hard']

export const DURATION_TO_PLAYTIME = {
  '<30':   { min: 1,  max: 29  },
  '30-60': { min: 30, max: 60  },
  '60-90': { min: 61, max: 90  },
  '90+':   { min: 91, max: 300 },
}

export const PLAYERS_TO_RANGE = {
  '2':   { min: 2, max: 2  },
  '3-4': { min: 3, max: 4  },
  '5+':  { min: 5, max: 10 },
}

export default games
