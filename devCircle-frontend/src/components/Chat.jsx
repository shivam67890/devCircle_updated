import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import io from "socket.io-client";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);  // single socket for this chat session

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch existing messages from DB
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
          withCredentials: true,
        });
        const chatMessages = chat?.data?.messages.map((msg) => ({
          firstName: msg.senderId?.firstName,
          lastName: msg.senderId?.lastName,
          text: msg.text,
        }));
        setMessages(chatMessages || []);
      } catch (err) {
        console.error("Failed to fetch chat:", err);
      }
    };
    fetchChatMessages();
  }, [targetUserId]);

  // Setup socket connection — one socket, join room, listen for messages
  useEffect(() => {
    if (!userId) return;

    // Create fresh socket for this chat session
    const socket = io(BASE_URL, { withCredentials: true });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setConnected(true);
      // Join the room AFTER connection is confirmed
      socket.emit("joinChat", {
        firstName: user.firstName,
        userId,
        targetUserId,
      });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log("📩 Message received:", firstName, text);
      setMessages((prev) => [...prev, { firstName, lastName, text }]);
    });

    // Cleanup: disconnect this socket when leaving chat
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    if (!socketRef.current || !socketRef.current.connected) {
      console.warn("Socket not connected, cannot send message");
      return;
    }
    console.log("📤 Sending message:", newMessage);
    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div style={{ padding: "1.5rem 1rem 5rem" }}>
      <div className="chat-container">
        <div className="chat-header">
          💬 Chat
          <span style={{
            fontSize: "0.75rem",
            marginLeft: "8px",
            fontWeight: 500,
            color: connected ? "#22c55e" : "#f59e0b",
          }}>
            {connected ? "● Connected" : "○ Connecting..."}
          </span>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div style={{ textAlign: "center", color: "#9ca3af", padding: "2rem", fontSize: "0.9rem" }}>
              No messages yet. Say hello! 👋
            </div>
          )}
          {messages.map((msg, index) => {
            const isMe = user.firstName === msg.firstName;
            return (
              <div key={index} className={`chat-bubble-wrap ${isMe ? "mine" : "theirs"}`}>
                {!isMe && (
                  <span className="chat-sender">{msg.firstName} {msg.lastName}</span>
                )}
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder={connected ? "Type a message… (Enter to send)" : "Connecting to chat…"}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!connected}
          />
          <button
            className="btn-primary"
            onClick={sendMessage}
            disabled={!connected}
            style={{ opacity: connected ? 1 : 0.5 }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
