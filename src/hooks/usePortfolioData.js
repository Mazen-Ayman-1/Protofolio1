import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient'

export function usePortfolioData() {
  const [profile, setProfile] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [experience, setExperience] = useState([])
  const [education, setEducation] = useState([])
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const [
      { data: profileData },
      { data: projectsData },
      { data: skillsData },
      { data: experienceData },
      { data: educationData },
      { data: certificatesData },
    ] = await Promise.all([
      supabase.from('profile').select('*').limit(1).maybeSingle(),
      supabase.from('projects').select('*').order('sort_order', { ascending: true }),
      supabase.from('skills').select('*').order('category', { ascending: true }),
      supabase.from('experience').select('*').order('sort_order', { ascending: true }),
      supabase.from('education').select('*').order('sort_order', { ascending: true }),
      supabase.from('certificates').select('*').order('sort_order', { ascending: true }),
    ])
    setProfile(profileData)
    setProjects(projectsData || [])
    setSkills(skillsData || [])
    setExperience(experienceData || [])
    setEducation(educationData || [])
    setCertificates(certificatesData || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return { profile, projects, skills, experience, education, certificates, loading, refetch: fetchAll }
}
