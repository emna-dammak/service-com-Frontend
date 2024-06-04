import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SERVER_URL = "20.188.44.129:3000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdGV0ZXN0ZXN0ZXdzQGdtYWlsLmNvbSIsImdvdXZlcm5vcmF0IjoiVHVuaXMiLCJkZWxlZ2F0aW9uIjoiQXJpYW5hIiwiaWF0IjoxNzE0OTg5NjUxfQ.-kCrFQU8COlOL7zpsY_dmX_Oz9q0FDg50YprtgfHKQo"; // Insert your JWT token here

const TestWS = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [roomId, setRoomId] = useState(""); // Used if you want to join a specific room
  const [conversationId, setConversationId] = useState(""); // Store the conversation ID

  useEffect(() => {
    const socketIo = io(SERVER_URL, {
      extraHeaders: {
        authorization: `Bearer ${token}`,
      },
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected!");
    });

    socketIo.on("messageHistory", (oldMessages) => {
      setMessages(oldMessages);
    });

    socketIo.on("message", (newMessage) => {
      setMessages((msgs) => [...msgs, newMessage]);
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected!");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  // Fetch messages when conversationId changes
  useEffect(() => {
    if (socket && conversationId) {
      socket.emit("getMessages", conversationId);
    }
  }, [conversationId, socket]);

  const handleSendMessage = () => {
    if (socket) {
      const newMessage = {
        text: message,
        recipientId: "13", // Replace with recipient's actual ID
      };
      socket.emit("addMessage", JSON.stringify(newMessage));
      setMessage("");
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>

      <div>
        <label>
          Conversation ID:
          <input
            type="text"
            value={conversationId}
            onChange={(e) => setConversationId(e.target.value)}
          />
        </label>
        <button
          onClick={() => socket && socket.emit("getMessages", conversationId)}
        >
          Load Messages
        </button>
      </div>

      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.createdAt}
            {msg.text}
          </li>
        ))}
      </ul>

      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
};

export default TestWS;
