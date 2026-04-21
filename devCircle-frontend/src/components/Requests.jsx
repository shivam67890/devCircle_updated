import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) {}
  };

  useEffect(() => { fetchRequests(); }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="page-container">
        <h1 className="page-title">Connection Requests</h1>
        <div className="empty-state">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
          <h3>No pending requests</h3>
          <p>When developers send you interest requests, they'll appear here.</p>
        </div>
      </div>
    );

  return (
    <div className="page-container">
      <h1 className="page-title">Connection Requests ({requests.length})</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
        return (
          <div key={_id} className="person-card">
            <img alt="photo" className="person-avatar" src={photoUrl} />
            <div className="person-info">
              <div className="person-name">{firstName} {lastName}</div>
              {age && gender && <div className="person-meta">🎂 {age} · {gender}</div>}
              {about && <div className="person-about">{about}</div>}
            </div>
            <div className="person-actions">
              <button className="btn-danger" onClick={() => reviewRequest("rejected", request._id)}>✕ Reject</button>
              <button className="btn-primary" onClick={() => reviewRequest("accepted", request._id)}>✓ Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
