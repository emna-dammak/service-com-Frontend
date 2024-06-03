import React, { useState, useEffect } from "react";
import ConversationHeader from "./conversationHeader";
import Message from "./messages";
import SendMessageInput from "./sendMessage";
import io from "socket.io-client";
import ConversationList from "./conversationList";
import { format } from "date-fns";

const SERVER_URL = "http://localhost:3000/";

const ChatInterface = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentConversation, setCurrentConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
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

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setConversations(data);
        if (!currentConversation) {
          const lastConv = data[0];
          setCurrentConversation(lastConv);
          setConversationId(lastConv.id);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  useEffect(() => {
    const socketIo = io(SERVER_URL, {
      withCredentials: true,
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("Connected!");
      socketIo.emit("getCurrentUser");
    });

    socketIo.on("id", (UserID) => {
      console.log("Received UserID:", UserID); // Debugging log
      setCurrentUserId(UserID);
    });

    socketIo.on("messageHistory", (oldMessages) => {
      setMessages(oldMessages);
      console.log("Old Messages:", oldMessages);
    });

    socketIo.on("message", (newMessage) => {
      console.log("New Message:", newMessage); // Debugging log
      setMessages((msgs) => [...msgs, newMessage]);
    });

    socketIo.on("disconnect", () => {
      console.log("Disconnected!");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && conversationId) {
      socket.emit("getMessages", conversationId);
    }
  }, [conversationId, socket]);

  const handleSendMessage = () => {
    if (socket && currentUserId) {
      const recipientId =
        currentConversation.user1.id === currentUserId
          ? currentConversation.user2.id
          : currentConversation.user1.id;

      let newMessage = {
        text: message,
        recipientId: recipientId,
        senderId: currentUserId, // Ensure senderId is included
      };
      console.log("Sending Message:", newMessage); // Debugging log
      socket.emit("addMessage", newMessage);
      const now = new Date();
      const formattedDate = format(now, "yyyy-MM-dd HH:mm:ss.SSSSSS");
      newMessage = {
        sender: { id: currentUserId },
        text: message,
        recipient: { id: recipientId },
        createdAt: formattedDate,
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
          currentUserId={currentUserId}
        />
      </div>
      <div className="w-3/4 flex flex-col  bg-gray-100">
        <ConversationHeader
          conversations={conversations}
          currentConversation={currentConversation}
          currentUserId={currentUserId}
        />
        <div className="flex flex-col flex-grow overflow-y-auto">
          <Message messages={messages} currentUserId={currentUserId} />
        </div>
        <div className="flex-shrink-0">
          <SendMessageInput
            sendMessage={handleSendMessage}
            input={message}
            setInput={setMessage}
            currentUserId={currentUserId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
