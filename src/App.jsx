import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import SplashScreen from './components/SplashScreen'
import { supabase } from './lib/supabaseClient'

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [splashProfile, setSplashProfile] = useState(null)

  useEffect(() => {
    supabase
      .from('profile')
      .select('name, role_line_1, role_line_2')
      .limit(1)
      .maybeSingle()
      .then(({ data }) => setSplashProfile(data))
  }, [])

  return (
    <>
      {showSplash && (
        <SplashScreen
          name={splashProfile?.name || 'Portfolio'}
          role={[splashProfile?.role_line_1, splashProfile?.role_line_2].filter(Boolean).join(' · ') || 'developer'}
          onDone={() => setShowSplash(false)}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}
