import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchConnections(); }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="page-container">
        <h1 className="page-title">My Connections</h1>
        <div className="empty-state">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🤝</div>
          <h3>No connections yet</h3>
          <p>Start exploring developers and send interest requests!</p>
        </div>
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="page-title">My Connections ({connections.length})</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
        return (
          <div key={_id} className="person-card">
            <img alt="photo" className="person-avatar" src={photoUrl} />
            <div className="person-info">
              <div className="person-name">{firstName} {lastName}</div>
              {age && gender && <div className="person-meta">🎂 {age} · {gender}</div>}
              {about && <div className="person-about">{about}</div>}
            </div>
            <div className="person-actions">
              <Link to={"/chat/" + _id}>
                <button className="btn-primary">💬 Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Connections;
