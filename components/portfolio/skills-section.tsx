"use client"

interface SkillsProps {
  data: {
    title: string
    categories: Array<{
      name: string
      icon: string
      skills: Array<{
        name: string
        percentage: number
      }>
    }>
    tools: Array<{
      name: string
      icon: string
    }>
  }
}

export default function SkillsSection({ data }: SkillsProps) {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="handwriting text-4xl text-center mb-16 text-blue-700 dark:text-blue-300">
          <span className="border-b-4 border-yellow-400 pb-2">{data.title}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.categories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg dark:bg-gray-800">
              <div className="flex justify-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full dark:bg-gray-700">
                  <i className={`fas fa-${category.icon} text-3xl text-blue-600 dark:text-blue-300`}></i>
                </div>
              </div>
              <h3 className="handwriting text-2xl text-center mb-4 text-gray-800 dark:text-gray-200">
                {category.name}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools Section */}
        <div className="mt-16">
          <h3 className="handwriting text-2xl text-center mb-8 text-gray-800 dark:text-gray-200">
            Enchanted Tools I Wield
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {data.tools.map((tool, index) => (
              <div key={index} className="bg-white p-4 rounded-xl shadow-md flex items-center dark:bg-gray-800">
                <i className={`fab fa-${tool.icon} text-2xl text-blue-500 mr-2`}></i>
                <span className="text-gray-700 dark:text-gray-300">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
