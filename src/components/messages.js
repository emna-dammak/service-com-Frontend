import React, { useEffect, useRef } from "react";
import {
  format,
  isToday,
  isThisWeek,
  isBefore,
  subDays,
  parseISO,
} from "date-fns";

const Message = (props) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props.messages]);

  const formatDate = (date) => {
    const messageDate = new Date(date);
    if (isToday(messageDate)) {
      return "Today"; // Only show time if the date is today
    } else if (isThisWeek(messageDate)) {
      return format(messageDate, "EEEE "); // Show day of the week if the date is within this week
    } else if (isBefore(messageDate, subDays(new Date(), 7))) {
      return format(messageDate, "PP"); // Show full date if the date is older than 7 days
    } else {
      return format(messageDate, "EEEE "); // Show day of the week if the date is within the last 7 days
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let lastDate = null;

    messages.forEach((message) => {
      if (!message.text.trim()) return; // Skip empty messages

      const messageDate = format(parseISO(message.createdAt), "yyyy-MM-dd");
      if (messageDate !== lastDate) {
        groupedMessages.push({
          date: messageDate,
          messages: [message],
        });
        lastDate = messageDate;
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(message);
      }
    });

    return groupedMessages;
  };

  const groupConsecutiveMessages = (messages) => {
    const groupedMessages = [];
    let lastSenderId = null;
    let currentGroup = null;

    messages.forEach((message) => {
      if (!message.text.trim()) return; // Skip empty messages

      if (message.sender.id !== lastSenderId) {
        if (currentGroup) {
          groupedMessages.push(currentGroup);
        }
        currentGroup = {
          senderId: message.sender.id,
          messages: [message],
        };
        lastSenderId = message.sender.id;
      } else {
        currentGroup.messages.push(message);
      }
    });

    if (currentGroup) {
      groupedMessages.push(currentGroup);
    }

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(props.messages);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-2 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch bg-gray-100"
    >
      {groupedMessages.map((group, groupIndex) => (
        <div key={groupIndex} className="message-group">
          <div className="text-center text-gray-500 text-xs my-2">
            {formatDate(parseISO(group.date))}
          </div>
          {groupConsecutiveMessages(group.messages).map(
            (messageGroup, groupIndex) => {
              const isSentByCurrentUser =
                messageGroup.senderId === props.currentUserId;
              return (
                <div
                  key={groupIndex}
                  className={`chat-message flex items-end w-full mb-4 ${
                    isSentByCurrentUser ? "justify-end" : ""
                  }`}
                >
                  {!isSentByCurrentUser && (
                    <img
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                      alt="Profile"
                      className="w-8 h-8 rounded-full mr-2 self-start"
                    />
                  )}
                  <div
                    className={`flex flex-col space-y-2 text-sm w-full ${
                      isSentByCurrentUser ? "items-end" : "items-start"
                    }`}
                  >
                    {messageGroup.messages.map((message, index) => (
                      <div
                        key={index}
                        className="flex flex-col space-y-1 max-w-[50%]"
                      >
                        <span
                          className={`px-3 py-2 rounded-lg inline-block ${
                            isSentByCurrentUser
                              ? "rounded-br-none bg-green-500 text-white"
                              : "rounded-bl-none bg-white text-gray-600"
                          } break-words`}
                        >
                          {message.text}
                        </span>
                        <div
                          className={`text-xs text-gray-500 mt-1 ${
                            isSentByCurrentUser ? "text-right" : "text-left"
                          }`}
                        >
                          {format(new Date(message.createdAt), "p")}
                        </div>
                      </div>
                    ))}
                  </div>
                  {isSentByCurrentUser && (
                    <img
                      src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=144&h=144"
                      alt="My profile"
                      className="w-8 h-8 rounded-full ml-2 self-start"
                    />
                  )}
                </div>
              );
            }
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Message;
