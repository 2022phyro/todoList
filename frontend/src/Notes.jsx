import "./Notes.css";
import { useState, useEffect } from "react";
import Icon from "./Icon";
import { BASE_URL, inst } from "../utils/auth";
import NotesItem from "./NotesItem";
import { formatDate } from "../utils/format";
import PopUp from "./PopUp";
export default function Notes() {
  const [profile, setProfile] = useState(false);
  const [notes, setNotes] = useState([]);
  const [groupedNotes, setGroupedNotes] = useState([]);
  const [actions, setActions] = useState({});
  const toggleProfile = () => {
    console.log("yay");
    setProfile(!profile);
  };

  const fetchTodos = async () => {
    const instance = await inst();
    const response = await instance.get(`${BASE_URL}/todos`);
    const { data } = response.data;
    setNotes(data);
  };
  const act = (data) => {
    setActions(data);
    console.log(data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const handleActions = async () => {
	if (!actions) return
	switch(actions.type) {
		case "deleteNote": {
			try {
				const instance = await inst();
				await instance.delete(`${BASE_URL}/todos/${actions.id}`);
				setNotes(notes.filter(note => note.id !== actions.id));
			} catch (error) {
				console.error(error)
			}
			break;
		}
		case "checkNote": {
			try {
				const instance = await inst();
				await instance.post(`${BASE_URL}/todos/${actions.id}`)
				setNotes(notes.map(note => note.id === actions.id ? { ...note, completed: !note.completed } : note));
			} catch (error) {
				console.error(error)
			}
			break;
		}
	}
  }

useEffect(() => {
  if (notes && notes.length > 0) {
    const groupedNotes = notes.reduce((groups, note) => {
      const date = note.createdAt.split("T")[0];
      const index = groups.findIndex(group => group[0] === date);
      if (index !== -1) {
        groups[index][1].push(note);
		groups[index][1].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        groups.push([date, [note]]);
      }
      return groups;
    }, []);
    console.log(groupedNotes)
    groupedNotes.sort((a, b) => new Date(b[0]) - new Date(a[0]));
    setGroupedNotes(groupedNotes);
  }
}, [notes]);
useEffect(() => {
	handleActions()
}, [actions])
  return (
    <div className="notes-wrapper">
      <header>
        <div className={`profile ${profile ? "active" : ""}`}>
          <Icon name="account_circle" onClick={toggleProfile} />
          <p>Logout</p>
          <p>Delete Account</p>
        </div>
      </header>
      <div className="notes-body">
        <input type="text" />
        {groupedNotes.map(([date, notes]) => (
          <div className="notes-date-group" key={date}>
            <h2>
              <Icon name="stat_0" />
              {formatDate(date, "date-human")}
            </h2>
            <NotesItem notes={notes} date={date} action={act} />
          </div>
        ))}
      </div>
	  <button className="add-note b-pri"><Icon name="add"/><span className="text">Add note</span></button>
	  <PopUp/>
    </div>
  );
}
