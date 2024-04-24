import "./Notes.css";
import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";
import { BASE_URL, inst } from "../utils/auth";
import NotesItem from "./NotesItem";
import { formatDate } from "../utils/format";
import PopUp from "./PopUp";
import { Loader } from "./Loader";
export default function Notes() {
  const [profile, setProfile] = useState(false);
  const [notes, setNotes] = useState([]);
	const [empty, setEmpty] = useState({});
  const [groupedNotes, setGroupedNotes] = useState([]);
  const [actions, setActions] = useState({});
  const [popup, setPopup] = useState({});
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState();
  const inputRef = useRef();
  const dateRef = useRef();

  const handleSearch = async () => {
	await fetchTodos()
  };

  const toggleProfile = () => {
    console.log("yay");
    setProfile(!profile);
  };

  const fetchTodos = async (customPage) => {
	try {
    const curr = customPage || page;
    if (!curr) return null;

		let url = `${BASE_URL}/todos`;
		const params = new URLSearchParams();
		if (inputValue) {
		  params.append('title', inputValue);
		}
		if (dateValue) {
		  params.append('createdAt', dateValue);
		}
    params.append('page', curr);
		if(params.toString()) {
		  url += `?${params.toString()}`;
		}
		const instance = await inst(true);
		const response = await instance.get(url);
		const { data } = response.data;
    console.log(data.next)
		if (page === 1 && data.todos.length < 1) {
			setEmpty({danger: false, msg:'To get started, create a todo now'})
		} else {
			setEmpty({})
		}
    setPage(data.next)
    return data.todos
	} catch (error) {
		console.error('Error fetching todos: ', error);
		setEmpty({danger: true, msg:'Something went wrong. Please try again later or reload your browser'})
	  }
  };
  const act = (data) => {
    setActions(data);
    console.log(data);
  };

  const handleActions = async () => {
    if (!actions) return;
    switch (actions.type) {
      case "deleteNote": {
        try {
          const instance = await inst(true);
          await instance.delete(`${BASE_URL}/todos/${actions.id}`);
          setNotes(notes.filter((note) => note.id !== actions.id));
        } catch (error) {
          console.error(error);
        }
        break;
      }
      case "checkNote": {
        try {
          const instance = await inst(true);
          await instance.post(`${BASE_URL}/todos/${actions.id}`);
          setNotes(
            notes.map((note) =>
              note.id === actions.id
                ? { ...note, completed: !note.completed }
                : note
            )
          );
        } catch (error) {
          console.error(error);
        }
        break;
      }
      case "logout": {
        setPopup({
          active: true,
          decision: "true",
          message: "Are you sure you want to logout",
          action: "Logout",
          danger: false,
          close: function () {
            setPopup({});
            setActions({});
          },
        });
        break;
      }
      case "deleteAccount": {
        setPopup({
          active: true,
          decision: true,
          message:
            "Are you sure you want to delete youe account? You will lose all data",
          action: "Delete",
          danger: true,
          close: function () {
            setPopup({});
            setActions({});
          },
        });
        break;
      }
      case "newNote": {
        setPopup({
          active: true,
          decision: false,
          close: function () {
            setPopup({});
            setActions({});
          },
          send: function (data) {
            setNotes([...notes, data]);
            setEmpty({})
          },
        });
        break;
      }
    }
  };

  const logout = () => {
    setProfile(false);
    setActions({ type: "logout" });
  };
  const deleteAccount = () => {
    setProfile(false);
    setActions({ type: "deleteAccount" });
  };
  const newNote = () => {
    setActions({ type: "newNote" });
  };
  useEffect(() => {
    if (notes && notes.length > 0) {
      const groupedNotes = notes.reduce((groups, note) => {
        const date = note.createdAt.split("T")[0];
        const index = groups.findIndex((group) => group[0] === date);
        if (index !== -1) {
          groups[index][1].push(note);
          groups[index][1].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          groups.push([date, [note]]);
        }
        return groups;
      }, []);
      console.log(groupedNotes);
      groupedNotes.sort((a, b) => new Date(b[0]) - new Date(a[0]));
      setGroupedNotes(groupedNotes);
    }
  }, [notes]);
  useEffect(() => {
    handleActions();
  }, [actions]);
  useEffect(() => {
    fetchTodos()
    .then(todos => {
      setNotes(todos)
    })
  }, []);
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      fetchTodos()
      .then(todos => {
        setNotes([...notes, ...todos])
      });
    }
  };

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "10px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  return (
    <div className="notes-wrapper">
      <header>
        <div className={`profile ${profile ? "active" : ""}`}>
          <Icon name="account_circle" onClick={toggleProfile} />
          <p onClick={logout}>Logout</p>
          <p onClick={deleteAccount}>Delete Account</p>
        </div>
        <div className="search">
          <input
            type="text"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="filters">
            <input
              type="date"
              ref={dateRef}
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
            />
            <Icon name="search" onClick={handleSearch} />
          </div>
        </div>
      </header>
      <div className="notes-body">
        {groupedNotes.map(([date, notes]) => (
          <div className="notes-date-group" key={date}>
            <h2>
              <Icon name="stat_0" />
              {formatDate(date, "date-human")}
            </h2>
            <NotesItem notes={notes} date={date} action={act} />
          </div>
        ))}
        {empty.msg && <p className={`${empty.danger ? 'err' : 'placeholder'}`}>{empty.msg}</p>}
		    {page && !empty.msg && <Loader/>}
      </div>
      <button onClick={newNote} className="add-note b-pri">
        <Icon name="add" />
        <span className="text">Add note</span>
      </button>
      {popup.active && <PopUp {...popup} />}
    </div>
  );
}
