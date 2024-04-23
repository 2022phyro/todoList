import { formatDate } from "../utils/format";
import Icon from "./Icon";

export default function NotesItem ({notes, date, action}) {
    const deleteNote = (id) => {
        const params = {
            type: 'deleteNote',
            id
        }
        action(params)
    }
    const toggleNote = (id) => {
        const params = {
            type: 'checkNote',
            id
        }
        action(params)
    }
    return (
        <ul>
        {notes && notes.map(note => (
          <li key={note.id} className="note">
                            <h3>
              <Icon name={note.completed? "select_check_box": "check_box_outline_blank"} className={"check"} onClick={()=>toggleNote(note.id)} />
              <span>{formatDate(note.createdAt, 'time-human')}</span>
              <Icon name="delete" className={"trash"} onClick={()=>deleteNote(note.id)} />
            </h3>
            <h4>{note.title}</h4>
            <p>{note.description}</p>
          </li>
        ))}
        </ul>
    )
}