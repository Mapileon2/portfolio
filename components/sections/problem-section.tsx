"use client"

import Image from "next/image"

interface ProblemSectionProps {
  data: {
    title: string
    problemStatement: string
    researchInsight: string
    keyInsights: string[]
    persona: {
      name: string
      age: number
      occupation: string
      location: string
      favoriteGhibli: string
      imageUrl: string
      goals: string[]
      frustrations: string[]
    }
    competitiveAnalysis: Array<{
      platform: string
      strengths: string
      weaknesses: string
      opportunity: string
    }>
  }
}

export default function ProblemSection({ data }: ProblemSectionProps) {
  return (
    <section id="problem" className="page-section bg-yellow-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center ghibli-text-red handwriting slide-in">
          {data.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="slide-in">
            <h3 className="text-2xl font-bold mb-6 ghibli-text-red">Problem Statement</h3>
            <p className="text-lg mb-6">{data.problemStatement}</p>
            <p className="text-lg mb-6">{data.researchInsight}</p>
            <div className="bg-white p-6 rounded-xl sketch-border">
              <h4 className="font-bold mb-3 ghibli-text-blue">Key Research Insights:</h4>
              <ul className="list-disc pl-5 space-y-2">
                {data.keyInsights.map((insight, index) => (
                  <li key={index}>{insight}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="slide-in delayed-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sketch-border">
              <h4 className="text-xl font-bold mb-4 ghibli-text-green">
                User Persona: {data.persona.name}, {data.persona.age}
              </h4>
              <div className="flex items-start mb-4">
                <Image
                  src={data.persona.imageUrl || "/placeholder.svg"}
                  alt="User persona"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div>
                  <p>
                    <strong>Occupation:</strong> {data.persona.occupation}
                  </p>
                  <p>
                    <strong>Location:</strong> {data.persona.location}
                  </p>
                  <p>
                    <strong>Favorite Ghibli:</strong> {data.persona.favoriteGhibli}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="font-bold mb-2 ghibli-text-blue">Goals:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {data.persona.goals.map((goal, index) => (
                    <li key={index}>{goal}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-2 ghibli-text-red">Frustrations:</h5>
                <ul className="list-disc pl-5 space-y-1">
                  {data.persona.frustrations.map((frustration, index) => (
                    <li key={index}>{frustration}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-lg sketch-border">
              <h4 className="text-xl font-bold mb-4 ghibli-text-yellow">Journey Map</h4>
              <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
                <p className="text-gray-500">Interactive journey map visualization</p>
              </div>
            </div>
          </div>
        </div>

        <div className="slide-in delayed-2">
          <h3 className="text-2xl font-bold mb-6 ghibli-text-blue">Competitive Analysis</h3>
          <div className="overflow-x-auto custom-scrollbar">
            <table className="min-w-full bg-white rounded-lg overflow-hidden sketch-border">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Platform</th>
                  <th className="py-3 px-4 text-left">Strengths</th>
                  <th className="py-3 px-4 text-left">Weaknesses</th>
                  <th className="py-3 px-4 text-left">Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.competitiveAnalysis.map((item, index) => (
                  <tr key={index}>
                    <td className="py-3 px-4">{item.platform}</td>
                    <td className="py-3 px-4">{item.strengths}</td>
                    <td className="py-3 px-4">{item.weaknesses}</td>
                    <td className="py-3 px-4">{item.opportunity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
