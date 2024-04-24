import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';
import { getToken } from '../utils/auth';

export default function LandingPage () {
  const [token, setToken] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);
      if (fetchedToken) {
        navigate('/notes');
      }
    };

    checkToken();
  }, [navigate]);

  const handleClick = () => {
    navigate('/auth');
  };
  
  return (
    <div className="landing">
      <div className="landing-text">
        <h1>Interactive To-do list</h1>
        <button onClick={handleClick}>Get Started</button>
        <p>
          Functional interactive to-do list with a seamless backend. Suitable
          for any and all occasions you may need to take something down
        </p>
      </div>
      <div className="landing-img">
        <img className="img1" src="/List.png" alt="todo list image" />
        <img className="img2" src="/Pencil.png" alt="checklist image" />
      </div>
    </div>
  );
}
