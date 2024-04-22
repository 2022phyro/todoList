import './Landing.css';
function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-text">
        <h1>Interactive To-do list</h1>
        <button>Get Started</button>
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

export default LandingPage;
