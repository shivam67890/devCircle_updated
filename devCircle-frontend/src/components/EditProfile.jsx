import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, age, gender, about }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="profile-page">
        <div className="edit-card">
          <h2>Edit Profile ✏️</h2>
          <div className="dc-form-group">
            <label className="dc-label">First Name</label>
            <input className="dc-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="dc-form-group">
            <label className="dc-label">Last Name</label>
            <input className="dc-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="dc-form-group">
            <label className="dc-label">Photo URL</label>
            <input className="dc-input" type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
          </div>
          <div className="dc-form-group">
            <label className="dc-label">Age</label>
            <input className="dc-input" type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="dc-form-group">
            <label className="dc-label">Gender</label>
            <input className="dc-input" type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className="dc-form-group">
            <label className="dc-label">About</label>
            <input className="dc-input" type="text" value={about} onChange={(e) => setAbout(e.target.value)} />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="btn-primary" style={{ width: "100%", padding: "0.8rem" }} onClick={saveProfile}>
            Save Profile
          </button>
        </div>
        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
      </div>
      {showToast && (
        <div className="dc-toast">✅ Profile saved successfully!</div>
      )}
    </>
  );
};
export default EditProfile;
