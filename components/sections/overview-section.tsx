"use client"

interface OverviewSectionProps {
  data: {
    title: string
    projectSnapshot: {
      timeline: string
      team: string
      role: string
      goal: string
    }
    keyOutcomes: Array<{
      value: string
      label: string
    }>
  }
}

export default function OverviewSection({ data }: OverviewSectionProps) {
  return (
    <section id="overview" className="page-section bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ghibli-text-green handwriting slide-in">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 p-8 rounded-xl sketch-border slide-in">
            <h3 className="text-2xl font-bold mb-4 ghibli-text-blue">Project Snapshot</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="fas fa-calendar-alt mt-1 mr-3 ghibli-text-blue"></i>
                <span>
                  <strong>Timeline:</strong> {data.projectSnapshot.timeline}
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-user-friends mt-1 mr-3 ghibli-text-blue"></i>
                <span>
                  <strong>Team:</strong> {data.projectSnapshot.team}
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-tasks mt-1 mr-3 ghibli-text-blue"></i>
                <span>
                  <strong>My Role:</strong> {data.projectSnapshot.role}
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-bullseye mt-1 mr-3 ghibli-text-blue"></i>
                <span>
                  <strong>Goal:</strong> {data.projectSnapshot.goal}
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 p-8 rounded-xl sketch-border slide-in delayed-1">
            <h3 className="text-2xl font-bold mb-4 ghibli-text-green">Key Outcomes</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.keyOutcomes.map((outcome, index) => (
                <div key={index} className="bg-white p-4 rounded-lg text-center">
                  <div
                    className={`text-3xl font-bold mb-2 ${index === 0 ? "ghibli-text-blue" : index === 1 ? "ghibli-text-green" : index === 2 ? "ghibli-text-yellow" : "ghibli-text-red"}`}
                  >
                    {outcome.value}
                  </div>
                  <div className="text-sm">{outcome.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="slide-in delayed-2">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-blue">Project Deck</h3>
          <div className="bg-gray-100 rounded-xl p-4 h-96 flex items-center justify-center sketch-border">
            <div className="text-center">
              <i className="fas fa-file-powerpoint text-5xl mb-4 ghibli-text-blue"></i>
              <p className="mb-4">Embedded PowerPoint Viewer</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition">
                View Full Deck
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
