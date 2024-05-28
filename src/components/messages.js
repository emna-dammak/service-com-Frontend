import React, { useEffect, useRef } from "react";

const Message = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-gray-100"
    >
      {props.messages
        .filter((message) => message.text !== "")
        .map((message, index) => {
          const isSentByCurrentUser = message.sender.id == props.currentUserId;
          return (
            <div key={index} className="chat-message flex w-full">
              {isSentByCurrentUser ? (
                <div className="flex items-end justify-end w-full">
                  <div className="flex flex-col space-y-2 text-sm mx-2 order-1 items-end max-w-[70%] sm:max-w-[60%]">
                    <span className="px-3 py-2 rounded-lg inline-block rounded-br-none text-white bg-green-500 break-words w-full">
                      {message.text}
                    </span>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                    alt="My profile"
                    className="w-8 h-8 rounded-full order-2"
                  />
                </div>
              ) : (
                <div className="flex items-end w-full">
                  <img
                    src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                    alt="Profile"
                    className="w-8 h-8 rounded-full order-1"
                  />
                  <div className="flex flex-col space-y-2 text-sm mx-2 order-2 items-start max-w-[70%] sm:max-w-[60%]">
                    <span className="px-3 py-2 rounded-lg inline-block rounded-bl-none bg-white text-gray-600 break-words w-full">
                      {message.text}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Message;
