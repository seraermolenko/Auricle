import { Button } from '@/components/ui/button'
import { Box, Paper } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Typography, Grid2 } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import TextSnippetIcon from '@mui/icons-material/TextSnippet'
import SchoolIcon from '@mui/icons-material/School'

const Home = () => {
  const navigate = useNavigate()
  const goToFeature = () => {
    navigate('/feature')
  }
  const goToMission = () => {
    navigate('/mission')
  }
  const goToLearning = () => {
    navigate('/learning')
  }
  return (
    <Paper
      sx={{
        backgroundColor: '#f5faff',
        padding: '5px',
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
            height: '100vh',
            textAlign: 'center',
            gap: '1rem',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: '#003f6a',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 'bold',
              fontSize: '4rem',
              mt: 4,
            }}
          >
            Transform Audio into Notes
          </Typography>

          <p style={{ color: '#485260', fontSize: '2rem' }}>
            Transforming Sound into Understanding
          </p>

          <Box>
            <span className="Grid w-full max-w-sm items-center gap-1.5">
              <Button
                onClick={goToFeature}
                size="lg"
                className="px-12 py-8 text-xl font-semibold mt-10"
              >
                Start Recording
                <ArrowForwardIcon
                  sx={{
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '40px',
                  }}
                />
              </Button>
            </span>
            <Paper
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: '1rem',
                borderRadius: 1,
                bgcolor: '#ffffff',
                margin: '1rem',
              }}
              elevation={0}
            ></Paper>
          </Box>

          <Grid2
            container
            spacing={4}
            sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}
          >
            <Grid2 xs={12} sm={4}>
              <Paper
                onClick={goToFeature}
                sx={{
                  padding: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  color: '#2c3e50',
                  minHeight: '100px',
                  borderRadius: '16px',
                  flexDirection: 'column',
                }}
                elevation={2}
              >
                <Box
                  sx={{
                    backgroundColor: '#2c3e50',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <KeyboardVoiceIcon
                    sx={{
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {' '}
                    Record Audio
                  </Typography>
                </Box>
                <Box
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    maxWidth: '200px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: '#485260', fontSize: '1rem' }}
                  >
                    Record lectures directly in your browser or upload existing
                    audio files.
                  </Typography>
                </Box>
              </Paper>
            </Grid2>

            <Grid2 xs={12} sm={4}>
              <Paper
                onClick={goToMission}
                sx={{
                  padding: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  color: '#2c3e50',
                  minHeight: '100px',
                  borderRadius: '16px',
                  flexDirection: 'column',
                }}
                elevation={2}
              >
                <Box
                  sx={{
                    backgroundColor: '#2c3e50',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TextSnippetIcon
                    sx={{
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {' '}
                    Our Mission
                  </Typography>
                </Box>
                <Box
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    maxWidth: '200px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: '#485260', fontSize: '1rem' }}
                  >
                    To advance inclusion and awareness for the hearing-impaired.
                  </Typography>
                </Box>
              </Paper>
            </Grid2>

            <Grid2 xs={12} sm={4}>
              <Paper
                onClick={goToLearning}
                sx={{
                  padding: '50px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  color: '#2c3e50',
                  minHeight: '100px',
                  borderRadius: '16px',
                  flexDirection: 'column',
                }}
                elevation={2}
              >
                <Box
                  sx={{
                    backgroundColor: '#2c3e50',
                    borderRadius: '50%',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SchoolIcon
                    sx={{
                      color: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Smart Learning
                  </Typography>
                </Box>
                <Box
                  sx={{
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                    maxWidth: '200px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: '#485260', fontSize: '1rem' }}
                  >
                    Ai-powered, notes and quizzes that enhance your learning
                    experience.
                  </Typography>
                </Box>
              </Paper>
            </Grid2>
          </Grid2>
        </Box>
      </span>
    </Paper>
  )
}

export default Home
