import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function LandingPage () {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/auth');
  };
  const goToNotes = () => {
    navigate('/notes');
  };
  
  return (
    <div className="landing">
      <button className="to-notes" onClick={goToNotes}>Go to your notes</button>
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
