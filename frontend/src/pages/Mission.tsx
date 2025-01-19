import { Button } from '@/components/ui/button'

const Home = () => {
    const navigate = useNavigate()
    const goToMission = () => {
      navigate('/mission')
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
                      
        </Paper>
      )
    }
    
    export default Home    