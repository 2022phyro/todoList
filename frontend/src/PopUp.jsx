import "./PopUp.css";
import { BASE_URL, inst } from "../utils/auth";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PopUp(props) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();

  const handleAdd = async () => {
    setLoading(true);
    if (title || description) {
      console.log({ title, description });
      try {
        const instance = await inst(true);
        const response = await instance.post(`${BASE_URL}/todos`, {
          title,
          description,
        });
        const { data } = response.data;
        console.log(data);
        setError("");
        props.close();
        props.send(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Please type something");
    }
    setTitle("");
    setDescription("");
    setLoading(false);
  };

  const handleLogout = async () => {
      setLoading(false);
    try {
      const instance = await inst(true);
      await instance.post(`${BASE_URL}/auth/logout`);
      props.close();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
  };

  const handleDelete = async () => {
    try {
      const instance = await inst(true);
      await instance.delete(`${BASE_URL}/auth`);
      props.close();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/");
    }
    setLoading(false);
  };
  return (
    <div className="pop-up-wrapper">
      <span
        disabled={loading}
        type="button"
        className="close"
        onClick={props.close}
      >
        &times;
      </span>
      {props.decision ? (
        <div className="decision">
          <p>{props.message}</p>
          <div className="buttons">
            <button onClick={props.close} disabled={loading}>
              Cancel
            </button>
            <button
              className={props.danger ? "red" : "decide"}
              disabled={loading}
              onClick={props.danger ? handleDelete : handleLogout}
            >
              {props.action}
            </button>
          </div>
        </div>
      ) : (
        <div className="new-note">
          <div className="writing-area">
            <input
              type="text"
              placeholder="Title"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description..."
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            {error && <p className="error">{error}</p>}
          </div>
          <button onClick={handleAdd} disabled={loading}>
            Add
          </button>
        </div>
      )}
    </div>
  );
}
