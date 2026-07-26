export function yearsSince(dateStr) {
  if (!dateStr) return null
  const start = new Date(dateStr)
  if (isNaN(start.getTime())) return null
  const now = new Date()
  let years = now.getFullYear() - start.getFullYear()
  const hadAnniversary =
    now.getMonth() > start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() >= start.getDate())
  if (!hadAnniversary) years -= 1
  return Math.max(years, 1)
}

export function computeStats({ profile, projects = [], experience = [], certificates = [] }) {
  const autoYears = yearsSince(profile?.experience_start_date)
  const years = autoYears ? `${autoYears}+` : profile?.years_experience || null
  const projectsCount = projects.length > 0 ? `${projects.length}+` : profile?.projects_count || null
  const internships = experience.length > 0 ? `${experience.length}+` : null
  const certs = certificates.length > 0 ? `${certificates.length}+` : null
  return { years, projectsCount, internships, certs }
}
