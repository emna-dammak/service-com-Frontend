import React, { useState, useEffect } from "react";
import "../styles/chatInterface.css";
import ConversationHeader from "./conversationHeader";
import Message from "./messages";
import SendMessageInput from "./sendMessage";
import io from "socket.io-client";
import ConversationList from "./conversationList";

const SERVER_URL = "http://localhost:3000/";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImZpcnN0TmFtZSI6Ikpob24iLCJsYXN0TmFtZSI6IkRvZSIsImVtYWlsIjoidGVzdGV0ZXN0ZXN0ZXdzQGdtYWlsLmNvbSIsImdvdXZlcm5vcmF0IjoiVHVuaXMiLCJkZWxlZ2F0aW9uIjoiQXJpYW5hIiwiaWF0IjoxNzE2NzM3OTk1LCJleHAiOjE3MTY3NDg3OTV9.ElEiLIZvFUETw9Wh52-jjcNlB84NtQGquTePtlBiB-8";

const ChatInterface = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [roomId, setRoomId] = useState(""); // Used if you want to join a specific room
  const [conversationId, setConversationId] = useState(); // Store the conversation ID

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
            },
            credentials: "include",
          }
        );
        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const data = await response.json();
        console.log(data);
        // Update the state with the fetched conversations
        setConversations(data);
        if (!currentConversation) {
          const lastConv = data[0]; // Fixed typo
          setCurrentConversation(lastConv);
          setConversationId(lastConv.id);
        }
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
      withCredentials: true, // Include credentials in the request
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected!");
    });

    socketIo.on("id", (UserID) => {
      console.log(UserID);
      setCurrentUserId(UserID);
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
      const recipientId =
        currentConversation.user1 === currentUserId
          ? currentConversation.user2.id
          : currentConversation.user1.id;

      let newMessage = {
        text: message,
        recipientId: recipientId,
      };
      console.log(newMessage);
      socket.emit("addMessage", JSON.stringify(newMessage));

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
    console.log(conversation.id);
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
      <div className="w-3/4  flex flex-col ">
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
