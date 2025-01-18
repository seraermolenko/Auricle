import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const Home = () => {
  return <div>Home
    <Button>Click me</Button>
    <Link to="/feature">Go to Feature Page</Link>
  </div>
}

export default Home
