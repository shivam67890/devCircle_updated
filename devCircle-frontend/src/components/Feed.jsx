import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => { getFeed(); }, []);

  if (!feed) return null;

  if (feed.length <= 0)
    return (
      <div className="feed-container">
        <div className="empty-state">
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
          <h3>You're all caught up!</h3>
          <p>No new developers to discover right now. Check back soon.</p>
        </div>
      </div>
    );

  return (
    <div className="feed-container">
      <UserCard user={feed[0]} />
    </div>
  );
};
export default Feed;
