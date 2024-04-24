import './ErrorElement.css'
import { useNavigate } from 'react-router-dom';

export function ErrorElement() {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate('/');
    };
    return (
        <div className="error">
            <h1>Oopsies</h1>
            <p>Sorry about that. Something went wrong</p>
            <button onClick={goBackHome}>Go back home</button>
        </div>
    )
}

export function Error404Element() {
    const navigate = useNavigate();

    const goBackHome = () => {
        navigate('/');
    };

    return (
        <div className="error">
            <h1>Oopsies 404</h1>
            <p>Page not found. You really need to make a note to stop running into things</p>
            <button onClick={goBackHome}>Go back home</button>
        </div>
    );
}