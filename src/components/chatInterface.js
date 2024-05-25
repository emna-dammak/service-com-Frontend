import React, { useState, useEffect } from "react";
import "../styles/chatInterface.css";
import ConversationHeader from "./conversationHeader";
import Message from "./messages";
import SendMessageInput from "./sendMessage";
import io from "socket.io-client";
import ConversationList from "./conversationList";

const SERVER_URL = "localhost:3000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdGV0ZXN0ZXN0ZXdzQGdtYWlsLmNvbSIsImdvdXZlcm5vcmF0IjoiVHVuaXMiLCJkZWxlZ2F0aW9uIjoiQXJpYW5hIiwiaWF0IjoxNzE0OTg5NjUxfQ.-kCrFQU8COlOL7zpsY_dmX_Oz9q0FDg50YprtgfHKQo"; // Insert your JWT token here

const ChatInterface = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [roomId, setRoomId] = useState(""); // Used if you want to join a specific room
  const [conversationId, setConversationId] = useState("17"); // Store the conversation ID

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("https://localhost:3000/conversations", {
          headers: {
            Authorization: "bearer " + token,
          },
        });
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const data = await response.json();
        console.log(data);
        // Update the state with the fetched events
        setConversations(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    // Call the fetchConversations function
    fetchConversations();
  }, []); // Empty dependency array ensures the effect runs only once (on mount)

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
      console.log(oldMessages);
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
      let newMessage = {
        text: message,
        recipientId: 13,
      };
      socket.emit("addMessage", JSON.stringify(newMessage));
      newMessage = {
        sender: { id: 11 },
        text: message,
        recipient: { id: 13 }, // Replace with recipient's actual ID
      };
      setMessages((msgs) => [...msgs, newMessage]);
      setMessage("");
    }
  };
  const selectConversation = (id) => {
    setConversationId(id); // Update the conversationId when a conversation is selected
  };

  return (
    <div class="flex h-screen">
      <ConversationList
        onSelectConversation={selectConversation}
        conversations={conversations}
      />
      <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col">
        <ConversationHeader></ConversationHeader>
        <Message messages={messages}></Message>
        <SendMessageInput
          sendMessage={handleSendMessage}
          input={message}
          setInput={setMessage}
        ></SendMessageInput>
      </div>
    </div>
  );
};

export default ChatInterface;
