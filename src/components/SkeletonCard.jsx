// Loading skeleton shown while API data is being fetched
// Proposal challenge: "will implement data rendering and loading states"

function SkeletonCard() {
  return (
    <div
      className="bg-card-bg border border-white/8 rounded-2xl overflow-hidden"
      aria-hidden="true"
    >
      <div className="skeleton w-full h-32" />
      <div className="p-4">
        <div className="skeleton h-4 w-3/4 rounded mb-2" />
        <div className="skeleton h-3 w-1/2 rounded mb-3" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
    </div>
  )
}

export default SkeletonCard
