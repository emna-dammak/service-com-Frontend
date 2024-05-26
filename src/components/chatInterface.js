import React, { useState, useEffect } from "react";
import "../styles/chatInterface.css";
import ConversationHeader from "./conversationHeader";
import Message from "./messages";
import SendMessageInput from "./sendMessage";
import io from "socket.io-client";
import ConversationList from "./conversationList";

const SERVER_URL = "localhost:3000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdGV0ZXN0ZXN0ZXdzQGdtYWlsLmNvbSIsImdvdXZlcm5vcmF0IjoiVHVuaXMiLCJkZWxlZ2F0aW9uIjoiQXJpYW5hIiwiaWF0IjoxNzE2NzM3OTk1LCJleHAiOjE3MTY3NDg3OTV9.ElEiLIZvFUETw9Wh52-jjcNlB84NtQGquTePtlBiB-8";
const ChatInterface = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(11);
  const [currentConversation, setCurrentConversation] = useState({
    id: 17,
    user1: {
      id: 11,
      firstName: "Jhon",
      lastName: "Doe",
      gouvernorat: "Tunis",
      delegation: "Ariana",
      profileImagePath: null,
      document: null,
      role: "USER",
      status: null,
      email: "testetestestews@gmail.com",
      password: "$2b$10$5VbuDhSvcJlUOdbCW7ZM..JtBUukacu5EDr6lXsmiDgEyInM0nHzm",
      salt: "$2b$10$5VbuDhSvcJlUOdbCW7ZM..",
    },
    user2: {
      id: 13,
      firstName: "Jhon",
      lastName: "Doe",
      gouvernorat: "Tunis",
      delegation: "Ariana",
      profileImagePath: null,
      document: null,
      role: "SERVICE_PROVIDER",
      status: null,
      email: "tes@gmail.com",
      password: "$2b$10$agyAb/fJ/SvStR4g4iSWCuU2tuGOfptn7vHoMVdODlAezicd9dwxi",
      salt: "$2b$10$agyAb/fJ/SvStR4g4iSWCu",
    },
  });
  const [conversations, setConversations] = useState([
    {
      id: 17,
      user1: {
        id: 11,
        firstName: "Jhon",
        lastName: "Doe",
        gouvernorat: "Tunis",
        delegation: "Ariana",
        profileImagePath: null,
        document: null,
        role: "USER",
        status: null,
        email: "testetestestews@gmail.com",
        password:
          "$2b$10$5VbuDhSvcJlUOdbCW7ZM..JtBUukacu5EDr6lXsmiDgEyInM0nHzm",
        salt: "$2b$10$5VbuDhSvcJlUOdbCW7ZM..",
      },
      user2: {
        id: 13,
        firstName: "Jhon",
        lastName: "Doe",
        gouvernorat: "Tunis",
        delegation: "Ariana",
        profileImagePath: null,
        document: null,
        role: "SERVICE_PROVIDER",
        status: null,
        email: "tes@gmail.com",
        password:
          "$2b$10$agyAb/fJ/SvStR4g4iSWCuU2tuGOfptn7vHoMVdODlAezicd9dwxi",
        salt: "$2b$10$agyAb/fJ/SvStR4g4iSWCu",
      },
    },
    {
      id: 18,
      user1: {
        id: 3,
        firstName: "Aziz",
        lastName: "Ben Dhiab",
        gouvernorat: "Tunis",
        delegation: "La Marsa",
        profileImagePath: "aa",
        document: null,
        role: "USER",
        status: null,
        email: "john2@example.com",
        password:
          "$2b$10$XGCxvN9cVU/.OWyEaOyg2ePXujbk4GCHTyT7i8JzeECxq.AsjTeg.",
        salt: "$2b$10$XGCxvN9cVU/.OWyEaOyg2e",
      },
      user2: {
        id: 11,
        firstName: "Jhon",
        lastName: "Doe",
        gouvernorat: "Tunis",
        delegation: "Ariana",
        profileImagePath: null,
        document: null,
        role: "USER",
        status: null,
        email: "testetestestews@gmail.com",
        password:
          "$2b$10$5VbuDhSvcJlUOdbCW7ZM..JtBUukacu5EDr6lXsmiDgEyInM0nHzm",
        salt: "$2b$10$5VbuDhSvcJlUOdbCW7ZM..",
      },
    },
  ]);
  const [roomId, setRoomId] = useState(""); // Used if you want to join a specific room
  const [conversationId, setConversationId] = useState(currentConversation.id); // Store the conversation ID

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        // Fetch data from the API
        const response = await fetch(
          "http://localhost:3000/conversations/user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add the Authorization header with the 'Bearer' scheme
            },
            credentials: "include", // Include credentials in the request
          }
        );
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
    console.log(conversations);
  }, [conversations]);
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
      const recipientId =
        currentConversation.user1 === currentUserId
          ? currentConversation.user2
          : currentConversation.user1;

      newMessage = {
        sender: { id: currentUserId },
        text: message,
        recipient: { id: recipientId }, // Replace with recipient's actual ID
      };
      setMessages((msgs) => [...msgs, newMessage]);
      setMessage("");
    }
  };
  const selectConversation = (conversation) => {
    setConversationId(conversation.id);
    setCurrentConversation(conversation);
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: "#F8F7FA" }}>
      <div className="w-1/4">
        <ConversationList
          onSelectConversation={selectConversation}
          conversations={conversations}
          conversationId={conversationId}
        />
      </div>
      <div className="w-3/4  flex flex-col justify-between">
        <ConversationHeader
          conversations={conversations}
          currentConversation={currentConversation}
          currentUserId={currentUserId}
        />
        <Message messages={messages} currentUserId={currentUserId} />
        <SendMessageInput
          sendMessage={handleSendMessage}
          input={message}
          setInput={setMessage}
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
