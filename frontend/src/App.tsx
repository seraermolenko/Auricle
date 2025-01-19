import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Feature from './pages/Feature'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="feature" element={<Feature />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  )
}

export default App
