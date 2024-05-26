import React from "react";

const ConversationList = (props) => {
  return (
    <div className="w-full h-full text-black overflow-y-auto">
      <div className="p-5 font-bold">Conversations</div>
      <ul>
        {props.conversations.map((conversation) => (
          <li
            key={conversation.id}
            className={`p-4 cursor-pointer flex items-center ${
              conversation.id === props.conversationId
                ? "bg-gradient-bg text-gray-800"
                : "hover:bg-green-200"
            }`}
            onClick={() => props.onSelectConversation(conversation)}
          >
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              className="w-10 h-10 rounded-full mr-4"
            />
            <div>
              {conversation.user1.id === props.currentUserId ? (
                <>
                  {conversation.user2.firstName} {conversation.user2.lastName}
                </>
              ) : (
                <>
                  {conversation.user1.firstName} {conversation.user1.lastName}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
