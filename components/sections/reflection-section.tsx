"use client"

interface ReflectionSectionProps {
  data: {
    title: string
    learnings: string[]
    nextSteps: string[]
    teamAcknowledgments: Array<{
      name: string
      contribution: string
    }>
  }
}

export default function ReflectionSection({ data }: ReflectionSectionProps) {
  return (
    <section id="reflection" className="page-section bg-purple-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ghibli-text-purple handwriting slide-in">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="slide-in">
            <h3 className="text-2xl font-bold mb-6 ghibli-text-blue">Key Learnings</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg sketch-border">
              <ul className="space-y-4">
                {data.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-lightbulb text-blue-500"></i>
                    </div>
                    <p>{learning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="slide-in delayed-1">
            <h3 className="text-2xl font-bold mb-6 ghibli-text-green">Next Steps</h3>
            <div className="bg-white p-6 rounded-xl shadow-lg sketch-border">
              <ul className="space-y-4">
                {data.nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-green-100 rounded-full p-2 mr-4 mt-1">
                      <i className="fas fa-arrow-right text-green-500"></i>
                    </div>
                    <p>{step}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="slide-in delayed-2">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-purple">Team Acknowledgments</h3>
          <div className="bg-white p-6 rounded-xl shadow-lg sketch-border">
            <div className="grid md:grid-cols-3 gap-6">
              {data.teamAcknowledgments.map((team, index) => (
                <div key={index} className="text-center">
                  <div className="bg-purple-100 rounded-full p-4 mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <i
                      className={`fas ${index === 0 ? "fa-paint-brush" : index === 1 ? "fa-code" : "fa-search"} text-2xl text-purple-600`}
                    ></i>
                  </div>
                  <h4 className="font-bold mb-2">{team.name}</h4>
                  <p className="text-sm text-gray-600">{team.contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center slide-in delayed-3">
          <p className="text-lg mb-6">Thank you for exploring our Ghibli-inspired case study!</p>
          <div className="flex justify-center space-x-6">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105">
              <i className="fas fa-envelope mr-2"></i> Contact Us
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105">
              <i className="fas fa-share-alt mr-2"></i> Share Case Study
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
