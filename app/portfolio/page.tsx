import { redirect } from "next/navigation"

export default function PortfolioPage() {
  // Redirect to the home page since portfolio is now the home page
  redirect("/")
}
