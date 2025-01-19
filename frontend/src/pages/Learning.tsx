import axios from 'axios'
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import { toast } from 'sonner'


const Feature = () => {
  const [data, setData] = useState<string>('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    callfetch()
  }, [])

  const callfetch = async () => {
    setLoading(true)
    const config = {
      maxRedirects: 0,
    }

    try {
      console.log('Fetching data...')
      const response = await axios.get(
        'http://127.0.0.1:5001/auricle',
        config,
      )
      setData(response.data ?? '')
      console.log('Data:', response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper
      sx={{
        backgroundColor: '#f5faff', // Change to your desired color
        padding: '20px',
        borderRadius: '12px',
        textAlign: 'center',
        width: '100vw',
      }}
      elevation={0}
    >
      <span>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Full viewport height
            textAlign: 'center', // Center-align text
            gap: '1rem',
          }}
        >
          <h1 style={{ color: '#003f6a', marginTop: '-6rem' }}>
            Learning page
          </h1>
          <p style={{ color: '#6f93ae' }}>
            Generate quizzes based on your lecture notes
          </p>
        </Box>
      </span>
    </Paper>
  )
}

export default Feature
