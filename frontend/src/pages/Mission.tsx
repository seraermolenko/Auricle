import { Button } from '@/components/ui/button'
import { Box, Paper, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import GroupsIcon from '@mui/icons-material/Groups'
import SchoolIcon from '@mui/icons-material/School'

const Mission = () => {
  const navigate = useNavigate()
  
  const goToFeature = () => {
    navigate('/feature')
  }
  
  const goToHome = () => {
    navigate('/')
  }
  
  const goToLearning = () => {
    navigate('/learning')
  }

  return (
    <Paper
      sx={{
        backgroundColor: '#f5faff',
        padding: '20px',
        borderRadius: '12px',
        width: '100vw',
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
        }}
      >
        {/* Header Section */}
        <Typography
          variant="h1"
          sx={{
            color: '#003f6a',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
            fontSize: { xs: '2.5rem', md: '4rem' },
            textAlign: 'center',
          }}
        >
          Our Mission
        </Typography>

        <Typography
          variant="h5"
          sx={{
            color: '#485260',
            maxWidth: '800px',
            textAlign: 'center',
            mb: 4,
          }}
        >
          Empowering inclusive education through innovative audio transcription technology
        </Typography>

        {/* Mission Statement Section */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '800px',
            width: '100%',
            mb: 4,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: '#2c3e50',
              textAlign: 'center',
            }}
          >
            We are dedicated to breaking down barriers in education by providing cutting-edge 
            audio transcription solutions. Our goal is to ensure that every student, 
            regardless of their hearing ability, has equal access to educational content 
            and can participate fully in their learning journey.
          </Typography>
        </Box>

        {/* Key Areas Grid */}
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                borderRadius: '16px',
              }}
              elevation={2}
            >
              <AccessibilityNewIcon sx={{ fontSize: '3rem', color: '#003f6a' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Accessibility
              </Typography>
              <Typography sx={{ color: '#485260', textAlign: 'center' }}>
                Making educational content accessible to everyone through real-time 
                transcription and note-taking assistance.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                borderRadius: '16px',
              }}
              elevation={2}
            >
              <GroupsIcon sx={{ fontSize: '3rem', color: '#003f6a' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Inclusion
              </Typography>
              <Typography sx={{ color: '#485260', textAlign: 'center' }}>
                Creating an inclusive learning environment where all students can 
                participate and succeed together.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: 'white',
                borderRadius: '16px',
              }}
              elevation={2}
            >
              <SchoolIcon sx={{ fontSize: '3rem', color: '#003f6a' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                Innovation
              </Typography>
              <Typography sx={{ color: '#485260', textAlign: 'center' }}>
                Leveraging AI technology to provide smart, accurate, and reliable 
                transcription services for educational content.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Navigation Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            mt: 4,
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Button
            onClick={goToHome}
            variant="outline"
            className="px-6 py-2"
          >
            Back to Home
          </Button>
          <Button
            onClick={goToFeature}
            className="px-6 py-2"
          >
            Try it Now
          </Button>
          <Button
            onClick={goToLearning}
            variant="outline"
            className="px-6 py-2"
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Mission