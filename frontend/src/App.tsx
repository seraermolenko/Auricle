import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Feature from './pages/Feature'
import { Toaster } from '@/components/ui/sonner'
import { Box, Typography, Button } from '@mui/material';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@radix-ui/react-navigation-menu';

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
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Auricle
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <NavigationMenu className="relative">
            <NavigationMenuList className="flex flex-row space-x-2">
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="text-white px-4 py-2 rounded hover:bg-gray-800">
                  Features
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 w-48 bg-white p-6 shadow-lg rounded-md mt-2">
                  <div className="text-black flex flex-col gap-2">
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/audio-transcription">
                      <span className="text-black">Audio Transcription</span>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/note-creation">
                      <span className="text-black">Note Creation</span>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/quiz-creation">
                      <span className="text-black">Quiz Creation</span>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="text-white px-4 py-2 rounded hover:bg-gray-800">
                  Mission
                </NavigationMenuTrigger>
                <NavigationMenuContent className="absolute top-full left-0 w-48 bg-white p-6 shadow-lg rounded-md mt-2">
                  <div className="text-black flex flex-col gap-2">
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/accessibility">
                      <span className="text-black">Accessibility Features</span>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/connections">
                      <span className="text-black">Empowering Connections</span>
                    </NavigationMenuLink>
                    <NavigationMenuLink className="w-full hover:bg-gray-100 p-2 rounded" href="/advocacy">
                      <span className="text-black">Advocacy and Awareness</span>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button sx={{ color: 'white', '&:hover': { backgroundColor: '#333' } }}>
            Login
          </Button>
        </Box>
      </Box>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="feature" element={<Feature />} />
          <Route path="mission" element={<Feature />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App