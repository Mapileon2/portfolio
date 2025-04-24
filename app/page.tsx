import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import SiteHeader from "@/components/site-header"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"

export default async function HomePage() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch published sections from the database
  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "portfolio")
    .eq("is_published", true)
    .single()

  const { data: sections } = await supabase
    .from("sections")
    .select("*")
    .eq("page_id", pages?.id)
    .eq("is_published", true)
    .order("order_index", { ascending: true })

  // Fetch featured projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false })

  // Get section data by type
  const getSection = (type: string) => {
    return sections?.find((section) => section.type === type)?.content || {}
  }

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection data={getSection("hero")} />
        <AboutSection data={getSection("about")} />
        <SkillsSection data={getSection("skills")} />
        <ProjectsSection
          projects={projects || []}
          title="Magical Projects"
          subtitle="Explore my case studies and recent work"
        />
        <ContactSection data={getSection("contact")} />
      </main>
    </>
  )
}
