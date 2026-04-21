import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  useEffect(() => { verifyPremiumUser(); }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + "/premium/verify", { withCredentials: true });
    if (res.data.isPremium) setIsUserPremium(true);
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(BASE_URL + "/payment/create", { membershipType: type }, { withCredentials: true });
    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId, amount, currency,
      name: "DevCircle", description: "Connect to other developers",
      order_id: orderId,
      prefill: { name: notes.firstName + " " + notes.lastName, email: notes.emailId, contact: "9999999999" },
      theme: { color: "#2563eb" },
      handler: verifyPremiumUser,
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (isUserPremium)
    return (
      <div className="premium-page">
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⭐</div>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1a1d23", marginBottom: "0.5rem" }}>You're a Premium Member!</h2>
          <p style={{ color: "#6b7280" }}>Enjoy all the exclusive benefits of DevCircle Premium.</p>
        </div>
      </div>
    );

  return (
    <div className="premium-page">
      <h1 className="premium-title">Upgrade to Premium</h1>
      <p className="premium-sub">Unlock exclusive features and supercharge your networking</p>
      <div className="premium-grid">
        <div className="premium-card">
          <h2>Silver</h2>
          <span className="premium-tier silver">3 months</span>
          <ul className="premium-features">
            <li>Chat with other developers</li>
            <li>100 connection requests/day</li>
            <li>Blue Tick verification</li>
            <li>Priority in discovery feed</li>
          </ul>
          <button className="btn-secondary" style={{ width: "100%", padding: "0.75rem" }} onClick={() => handleBuyClick("silver")}>
            Buy Silver Plan
          </button>
        </div>
        <div className="premium-card gold">
          <h2>Gold</h2>
          <span className="premium-tier gold">6 months</span>
          <ul className="premium-features">
            <li>Chat with other developers</li>
            <li>Unlimited connection requests</li>
            <li>Blue Tick verification</li>
            <li>Top of discovery feed</li>
          </ul>
          <button className="btn-primary" style={{ width: "100%", padding: "0.75rem" }} onClick={() => handleBuyClick("gold")}>
            Buy Gold Plan ✨
          </button>
        </div>
      </div>
    </div>
  );
};
export default Premium;
