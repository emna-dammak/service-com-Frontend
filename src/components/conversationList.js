import React from "react";

// Mock data for conversations
const conversations = [
  { id: "17", title: "Conversation 1" },
  { id: "18", title: "Conversation 2" },
  // Add more conversations as needed
];

const ConversationList = ({ onSelectConversation }) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full overflow-y-auto">
      <div className="p-5 font-bold">Conversations</div>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectConversation(conversation.id)}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
