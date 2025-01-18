import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const Feature = () => {
    const navigate = useNavigate();
    const goToFeature = () => {
        navigate('/');  // Programmatically navigate to the Feature page
      };
  return <div>Home
    <Button onClick={goToFeature}>Send Message</Button>
  </div>
}

export default Feature