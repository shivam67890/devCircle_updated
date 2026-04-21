import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {}
  };

  return (
    <div className="user-card">
      <img src={photoUrl || "https://via.placeholder.com/360x260?text=No+Photo"} alt="user" />
      <div className="user-card-body">
        <div className="user-card-name">{firstName} {lastName}</div>
        {age && gender && <div className="user-card-meta">🎂 {age} years · {gender}</div>}
        {about && <div className="user-card-about">{about}</div>}
        <div className="user-card-actions">
          <button className="btn-danger" onClick={() => handleSendRequest("ignored", _id)}>✕ Ignore</button>
          <button className="btn-primary" onClick={() => handleSendRequest("interested", _id)}>♥ Interested</button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
