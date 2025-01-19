import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Feature from './pages/Feature'
import Learning from './pages/Learning'
import Mission from './pages/Mission'
import { Toaster } from '@/components/ui/sonner'
import { Box, Typography, Button } from '@mui/material'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu'

function App() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 2rem',
          backgroundColor: '#003f6a',
          color: 'white',
          top: 0,
          position: 'sticky',
          width: '100%',
          zIndex: 9999,
          left: 0,
          right: 0,
        }}
      >
        <a
          href="/"
          rel="noopener noreferrer"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Auricle
          </Typography>
        </a>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NavigationMenu className="relative"></NavigationMenu>
        </Box>
      </Box>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="feature" element={<Feature />} />
          <Route path="mission" element={<Mission />} />
          <Route path="learning" element={<Learning />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
