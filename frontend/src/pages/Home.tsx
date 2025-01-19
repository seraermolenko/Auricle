import { Button } from '@/components/ui/button'
import { Box, Paper } from '@mui/material'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu"
import { Label } from '@/components/ui/label'
import { ArrowRight } from "lucide-react";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'



const Home = () => {
  const navigate = useNavigate()
  const goToFeature = () => {
    navigate('/feature')
  }
  return (
    <Paper
      sx={{
        backgroundColor: '#f5faff', 
        padding: '5px',
        borderRadius: '12px',
        textAlign: 'center',
        width: '90vw',
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
            }}
          >
            Transform audio into notes
          </Typography>

          <p style={{ color: '#6f93ae' }}>
            Record or upload your lecture audio for real-time transcription and
            summarization
          </p>

          <Box>
            <span className="grid w-full max-w-sm items-center gap-1.5">
            <Button onClick={goToFeature} variant="outline"> 
            <ArrowRight /> Start Recording
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
            >
              
            </Paper>
          </Box>
        </Box>
      </span>
    </Paper>
  )
}

export default Home
