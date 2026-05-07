// About page — covers project info, research, reflection, ethics, accessibility

function About() {
  return (
    <main className="max-w-3xl mx-auto px-5 md:px-8 py-10 page-fade" id="main-content">

      {/* Top header part (hero section) */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-4xl font-extrabold mb-3">
          Board<span className="text-gold">Genie</span>
        </h1>
        <p className="text-muted leading-relaxed max-w-md mx-auto">
        
        </p>
        <p className="text-muted text-xs mt-3">Copyright · Susan Rayamajhi · 2026</p>
      </div>

      {/* short introduction of board genie*/}
      <section className="mb-6" aria-labelledby="reflection-heading">
        <div className="bg-card-bg border border-gold/20 rounded-2xl p-6">
          <h2 id="reflection-heading" className="font-heading font-bold text-base text-gold mb-4">
            💭 what actually is boardgenie?
          </h2>

          <div className="space-y-4 text-muted text-sm leading-relaxed">
           <p>
                A web based game recommendation platform where user can find board games according
                to their preferences. The idea of boardgenie came from always spending too long deciding what game to play with friends or family during travels or party.
           </p>
          </div>
        </div>
      </section>

      {/* Research findings portion */}
      <section className="mb-6" aria-labelledby="research-heading">
        <div className="bg-card-bg border border-white/8 rounded-2xl p-6">
          <h2 id="research-heading" className="font-heading font-bold text-base mb-4">
            📊 Research & Survey Findings
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-4">
            Before starting the development, I created and distributed a survey to understand
            real user behaviour around board games. 19 people responded and the results directly
            shaped the design of BoardGenie.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { stat: '89.5%', label: 'plays occasionally and need guidance' },
              { stat: '92%',   label: 'struggles to choose a game' },
              { stat: '68.4%', label: 'prefer 30–60 min games' },
              { stat: '84.2%', label: 'wanted to save games for later' },
              { stat: '73.7%', label: 'enjoys surprise recommendations' },
              { stat: '52.6%', label: 'would definitely use this app' },
            ].map(({ stat, label }) => (
              <div key={label} className="bg-navy-light rounded-xl p-3">
                <p className="font-heading font-bold text-gold text-lg">{stat}</p>
                <p className="text-muted text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* features portion */}
      <section className="grid sm:grid-cols-2 gap-4 mb-6" aria-labelledby="features-heading">
        <h2 id="features-heading" className="sr-only">Key Features</h2>
        {[
          {
            icon: '🎯',
            title: 'Search Filter',
            desc: 'Search bar and dropdowns for players, duration and complexity. Defaults set from survey data.',
          },
          {
            icon: '✨',
            title: 'Surprise Me',
            desc: 'Random game picker that respects your current filters.',
          },
          {
            icon: '❤️',
            title: 'Add to Favorites',
            desc: 'Save games using the heart icon on any card.',
          },
          {
            icon: '📋',
            title: 'Preference Form',
            desc: 'A validated form where users enter their name, group size, duration and complexity. Returns a personalised list of matching games.',
          },
          {
            icon: '📚',
            title: 'Live Book Search',
            desc: 'Searches the Open Library API in real time, returning books about board games and strategy. ',
          },
          {
            icon: '📱',
            title: 'Responsive Design',
            desc: 'Works on mobile, tablet and desktop.',
          },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-card-bg border border-white/8 rounded-2xl p-5">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <h3 className="font-heading font-bold text-sm mt-2 mb-1">{title}</h3>
            <p className="text-muted text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </section>



    </main>
  )
}

export default About
