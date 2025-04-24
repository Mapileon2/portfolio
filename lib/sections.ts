import type { Section } from "./types"

// This is a mock implementation. In a real app, this would fetch from a database.
export async function getPublishedSections(): Promise<Section[]> {
  // Mock data based on the provided HTML
  return [
    {
      id: "1",
      type: "hero",
      title: "Home",
      isPublished: true,
      order: 1,
      data: {
        title: "Whispering Winds",
        subtitle: "A Ghibli-Inspired Digital Experience",
        description:
          "Journey through the creative process of designing an immersive digital platform that captures the magic and wonder of Studio Ghibli's storytelling.",
        imageUrl: "https://i.imgur.com/JYw0Dk3.png",
      },
    },
    {
      id: "2",
      type: "overview",
      title: "Overview",
      isPublished: true,
      order: 2,
      data: {
        title: "Project Overview",
        projectSnapshot: {
          timeline: "6 months (Jan - Jun 2023)",
          team: "4 Designers, 2 Developers, 1 PM",
          role: "Lead UI/UX Designer & Art Director",
          goal: "Create an immersive Ghibli-inspired digital experience",
        },
        keyOutcomes: [
          { value: "87%", label: "User Engagement Increase" },
          { value: "4.8★", label: "Average Rating" },
          { value: "32%", label: "Faster Load Times" },
          { value: "94%", label: "Retention Rate" },
        ],
      },
    },
    {
      id: "3",
      type: "problem",
      title: "Problem",
      isPublished: true,
      order: 3,
      data: {
        title: "The Challenge",
        problemStatement:
          "Existing digital platforms fail to capture the magical essence and emotional depth of Studio Ghibli films. Fans crave more immersive experiences that go beyond static content and traditional e-commerce.",
        researchInsight:
          "Our research showed that 78% of Ghibli fans feel current fan sites lack interactivity, while 65% would engage more with content that makes them feel part of the Ghibli world.",
        keyInsights: [
          "Users want emotional connection, not just information",
          "Interactive elements increase engagement by 3x",
          "Authentic Ghibli aesthetic is crucial for acceptance",
          "Mobile-first approach needed for younger audiences",
        ],
        persona: {
          name: "Maya",
          age: 24,
          occupation: "Graphic Designer",
          location: "Portland, OR",
          favoriteGhibli: "Spirited Away",
          imageUrl: "https://i.imgur.com/3QZx5cE.png",
          goals: [
            "Feel connected to Ghibli worlds",
            "Discover behind-the-scenes content",
            "Share experiences with other fans",
          ],
          frustrations: [
            "Static, information-heavy sites",
            "Lack of community features",
            "Inauthentic Ghibli aesthetics",
          ],
        },
        competitiveAnalysis: [
          {
            platform: "Ghibli Official Site",
            strengths: "Authentic content",
            weaknesses: "Minimal interactivity",
            opportunity: "Expand engagement",
          },
          {
            platform: "Fan Site A",
            strengths: "Active community",
            weaknesses: "Poor mobile experience",
            opportunity: "Mobile optimization",
          },
          {
            platform: "Fan Site B",
            strengths: "Comprehensive info",
            weaknesses: "Dated design",
            opportunity: "Modern aesthetics",
          },
        ],
      },
    },
    {
      id: "4",
      type: "process",
      title: "Process",
      isPublished: true,
      order: 4,
      data: {
        title: "Our Creative Process",
        ideation: [
          {
            title: "Initial Sketches",
            description: "Early concepts exploring Ghibli themes and interactive elements.",
            imageUrl: "https://i.imgur.com/5Z3Wf7j.jpg",
          },
          {
            title: "Collaborative Board",
            description: "Digital whiteboard for remote team collaboration.",
            imageUrl: "https://i.imgur.com/8KQ3b9L.jpg",
          },
          {
            title: "Visual Moodboard",
            description: "Curated collection of Ghibli aesthetics and inspirations.",
            imageUrl: "https://i.imgur.com/9R2Xc5H.jpg",
          },
        ],
        designEvolution: [
          {
            stage: "Low-fidelity Wireframe",
            imageUrl: "https://i.imgur.com/Jp1hFD1.png",
          },
          {
            stage: "Mid-fidelity Prototype",
            imageUrl: "https://i.imgur.com/3VtTQ2B.png",
          },
          {
            stage: "High-fidelity Mockup",
            imageUrl: "https://i.imgur.com/5Z3Wf7j.jpg",
          },
          {
            stage: "Interactive Prototype",
            imageUrl: "https://i.imgur.com/8KQ3b9L.jpg",
          },
        ],
        timeline: [
          {
            phase: "Research Phase",
            date: "Jan 2023",
            description: "Conducted user interviews, competitive analysis, and defined project scope.",
          },
          {
            phase: "Ideation Phase",
            date: "Feb 2023",
            description: "Brainstormed concepts, created sketches, and developed the visual direction.",
          },
          {
            phase: "Design Phase",
            date: "Mar-Apr 2023",
            description: "Created wireframes, prototypes, and high-fidelity designs.",
          },
          {
            phase: "Development Phase",
            date: "May-Jun 2023",
            description: "Implemented the designs, conducted testing, and launched the platform.",
          },
        ],
      },
    },
    {
      id: "5",
      type: "showcase",
      title: "Showcase",
      isPublished: true,
      order: 5,
      data: {
        title: "Final Results",
        features: [
          {
            title: "Immersive Homepage",
            description: "A magical entry point that sets the tone for the entire experience.",
            imageUrl: "https://i.imgur.com/JYw0Dk3.png",
          },
          {
            title: "Interactive Film Explorer",
            description: "Discover Ghibli films through an enchanted forest of content.",
            imageUrl: "https://i.imgur.com/5Z3Wf7j.jpg",
          },
          {
            title: "Character Companions",
            description: "Virtual companions that guide users through the platform.",
            imageUrl: "https://i.imgur.com/8KQ3b9L.jpg",
          },
        ],
        testimonials: [
          {
            quote: "This platform captures the essence of Ghibli in a way I've never experienced before.",
            author: "Ghibli Fan Magazine",
            rating: 5,
          },
          {
            quote: "The attention to detail and magical interactions make this a joy to use.",
            author: "UX Design Awards",
            rating: 4.8,
          },
        ],
      },
    },
    {
      id: "6",
      type: "reflection",
      title: "Reflection",
      isPublished: true,
      order: 6,
      data: {
        title: "Looking Back & Forward",
        learnings: [
          "Balancing authentic Ghibli aesthetics with modern UX principles",
          "Creating emotional connections through digital interactions",
          "Collaborating effectively across design and development teams",
          "Measuring the impact of delight on user engagement",
        ],
        nextSteps: [
          "Expand the platform with more interactive features",
          "Develop a mobile app version",
          "Create a community section for fan contributions",
          "Partner with Studio Ghibli for official content",
        ],
        teamAcknowledgments: [
          {
            name: "Design Team",
            contribution: "Creating the magical visual language and interactions",
          },
          {
            name: "Development Team",
            contribution: "Bringing the designs to life with technical excellence",
          },
          {
            name: "Research Team",
            contribution: "Uncovering deep insights about Ghibli fans",
          },
        ],
      },
    },
  ]
}

export async function getAllSections(): Promise<Section[]> {
  // In a real app, this would fetch all sections including unpublished ones
  return getPublishedSections()
}

export async function getSectionById(id: string): Promise<Section | null> {
  const sections = await getAllSections()
  return sections.find((section) => section.id === id) || null
}

export async function updateSection(id: string, data: Partial<Section>): Promise<Section> {
  // In a real app, this would update the section in the database
  const section = await getSectionById(id)
  if (!section) {
    throw new Error(`Section with id ${id} not found`)
  }

  // Mock update
  const updatedSection = { ...section, ...data }

  // In a real app, save to database here

  return updatedSection
}
