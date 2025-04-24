import type { Section } from "./types"

// This is a mock implementation. In a real app, this would fetch from a database.
export async function getPublishedPortfolioSections(): Promise<Section[]> {
  // Mock data based on the provided HTML
  return [
    {
      id: "p1",
      type: "hero",
      title: "Hero",
      isPublished: true,
      order: 1,
      data: {
        title: "Crafting Products That Spark Joy & Magic",
        subtitle: "A Product Manager's journey through enchanted user experiences and data-driven storytelling",
        ctaText: "Begin the Journey",
        ctaLink: "#about",
      },
    },
    {
      id: "p2",
      type: "about",
      title: "About",
      isPublished: true,
      order: 2,
      data: {
        title: "My Story",
        subtitle: "Once upon a time...",
        description: [
          "A Product Manager set out to bridge user needs and business goals in the mystical land of technology. With a compass of curiosity and a map of metrics, I navigate through complex problems to deliver solutions that feel like magic.",
          "My journey began in the enchanted forests of UX design, where I learned to listen to the whispers of users. I then ventured into the mountains of data analysis, discovering patterns in the stars. Now, I craft product strategies that combine both art and science.",
        ],
        profileImage:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        skills: [
          {
            title: "Roadmap Wizardry",
            description: "Turning visions into actionable plans",
            icon: "route",
          },
          {
            title: "Stargazer Alignment",
            description: "Bringing teams together under one sky",
            icon: "users",
          },
          {
            title: "Metric Sorcery",
            description: "Weaving data into compelling stories",
            icon: "chart-line",
          },
          {
            title: "Innovation Alchemy",
            description: "Transforming ideas into gold",
            icon: "lightbulb",
          },
        ],
      },
    },
    {
      id: "p3",
      type: "skills",
      title: "Skills",
      isPublished: true,
      order: 3,
      data: {
        title: "My Magic Toolbox",
        categories: [
          {
            name: "Strategy & Vision",
            icon: "chess-queen",
            skills: [
              { name: "Product Vision", percentage: 95 },
              { name: "Roadmapping", percentage: 90 },
              { name: "OKRs", percentage: 85 },
            ],
          },
          {
            name: "Execution",
            icon: "hammer",
            skills: [
              { name: "Agile Methodologies", percentage: 92 },
              { name: "User Stories", percentage: 88 },
              { name: "Prioritization", percentage: 90 },
            ],
          },
          {
            name: "Analytics",
            icon: "chart-pie",
            skills: [
              { name: "SQL", percentage: 85 },
              { name: "A/B Testing", percentage: 80 },
              { name: "Data Visualization", percentage: 75 },
            ],
          },
        ],
        tools: [
          { name: "Jira", icon: "jira" },
          { name: "SQL", icon: "database" },
          { name: "Figma", icon: "figma" },
          { name: "Google Analytics", icon: "chart-bar" },
          { name: "Trello", icon: "trello" },
          { name: "Git", icon: "code-branch" },
        ],
      },
    },
    {
      id: "p4",
      type: "timeline",
      title: "Journey",
      isPublished: true,
      order: 4,
      data: {
        title: "My Journey",
        experiences: [
          {
            role: "Senior Product Manager",
            company: "Enchanted Tech Inc.",
            period: "2021-Present",
            description:
              "Led the development of a magical onboarding experience that reduced time-to-value by 40%. Collaborated with wizards (engineers) and druids (designers) to craft intuitive user journeys.",
            logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
          },
          {
            role: "Product Manager",
            company: "Mystical Startup",
            period: "2018-2021",
            description:
              "Scaled the product from 0 to 1M users by implementing a crystal-clear vision and data-driven decision making. Worked closely with the dragon (CEO) to align product strategy with business goals.",
            logo: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
          },
          {
            role: "Associate PM",
            company: "Forest Analytics",
            period: "2016-2018",
            description:
              "Learned the ancient arts of analytics and user research. Helped improve retention by 25% by identifying pain points in the user journey through careful observation and data analysis.",
            logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
          },
          {
            role: "UX Designer",
            company: "UX Design Academy",
            period: "2014-2016",
            description:
              "Began my journey by learning to listen to the whispers of users. Created wireframes and prototypes that told compelling stories about user needs and pain points.",
            logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
          },
        ],
      },
    },
    {
      id: "p5",
      type: "projects",
      title: "Projects",
      isPublished: true,
      order: 5,
      data: {
        title: "Magical Projects",
        projects: [
          {
            title: "Whispering Winds",
            description:
              "A Ghibli-Inspired Digital Experience that captures the magic and wonder of Studio Ghibli's storytelling.",
            image: "https://i.imgur.com/JYw0Dk3.png",
            role: "Lead PM",
            rating: 5,
            result: "87% User Engagement",
            link: "/case-study",
            isFeatured: true,
          },
          {
            title: "Crystal Ball Analytics Dashboard",
            description:
              "Created a magical looking glass that reveals insights hidden in the data mists, empowering teams to make informed decisions.",
            image:
              "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            role: "Product Lead",
            rating: 4,
            result: "30% more insights",
            link: "#",
            isFeatured: false,
          },
          {
            title: "The Flying Delivery App",
            description:
              "Designed a mobile experience that makes ordering feel like sending a message with a paper airplane - simple, joyful, and magical.",
            image:
              "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            role: "UX/PM",
            rating: 5,
            result: "4.8/5 rating",
            link: "#",
            isFeatured: false,
          },
        ],
      },
    },
    {
      id: "p6",
      type: "contact",
      title: "Contact",
      isPublished: true,
      order: 6,
      data: {
        title: "Send a Message to the Spirit Realm",
        subtitle: "Let's Create Magic Together",
        description:
          "Whether you're looking for a product wizard to join your quest or just want to share thoughts on Ghibli films and product management, I'd love to hear from you!",
        email: "hello@productjourney.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        socialLinks: [
          { platform: "linkedin", url: "#" },
          { platform: "twitter", url: "#" },
          { platform: "github", url: "#" },
        ],
      },
    },
  ]
}

export async function getAllPortfolioSections(): Promise<Section[]> {
  // In a real app, this would fetch all sections including unpublished ones
  return getPublishedPortfolioSections()
}

export async function getPortfolioSectionById(id: string): Promise<Section | null> {
  const sections = await getAllPortfolioSections()
  return sections.find((section) => section.id === id) || null
}

export async function updatePortfolioSection(id: string, data: Partial<Section>): Promise<Section> {
  // In a real app, this would update the section in the database
  const section = await getPortfolioSectionById(id)
  if (!section) {
    throw new Error(`Section with id ${id} not found`)
  }

  // Mock update
  const updatedSection = { ...section, ...data }

  // In a real app, save to database here

  return updatedSection
}
