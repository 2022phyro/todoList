import './PopUp.css'
import { BASE_URL, inst } from "../utils/auth";
import { useState, useRef } from 'react';

export default function PopUp (props) {
    const [title, setTitle] = useState('');
    const [error, setError] = useState('')
    const [description, setDescription] = useState('');
    const titleRef = useRef();
    const descriptionRef = useRef();

    const handleAdd = () => {
        if (title || description) {
          console.log({ title, description });
          setError('')
        } else {
            setError('Please type something')
        }
        setTitle('');
        setDescription('');
      };
    return (
        <div className="pop-up-wrapper">
            <span className="close" onClick={props.close}>&times;</span>
            {props.decision
            ? (<div className="decision">
            <p>{props.message}</p>
            <div className="buttons">
                <button onClick={props.close}>Cancel</button>
                <button className={props.danger? "red": "decide"}>{props.action}</button>
            </div>
        </div> )
        : (
            <div className="new-note">
                <div className="writing-area">
                <input
                type='text'
                placeholder="Title"
                ref={titleRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description..."
                ref={descriptionRef}
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
                {error && <p className="error">{error}</p>}
            </div>
            <button onClick={handleAdd}>Add</button>
            </div>
        )}
        </div>
    )
}