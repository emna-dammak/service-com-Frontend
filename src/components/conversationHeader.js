import { useEffect, useState } from "react";

const ConversationHeader = (props) => {
  const [otherUser, setOtherUser] = useState();

  useEffect(() => {
    const getOtherUser = () => {
      if (props.currentConversation) {
        if (props.currentConversation.user1.id === props.currentUserId) {
          setOtherUser(props.currentConversation.user2);
        } else {
          setOtherUser(props.currentConversation.user1);
        }
      }
    };
    getOtherUser();
  }, [props.currentConversation, props.currentUserId]);

  return (
    <div className="flex sm:items-center justify-between py-1 sm:py-2 border-b border-gray-200 bg-white">
      <div className="relative flex items-center space-x-2 sm:space-x-3">
        <div className="relative">
          <span className="absolute text-green-500 right-0 bottom-0">
            <svg width="12" height="12">
              <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
            </svg>
          </span>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt=""
            className="w-6 sm:w-8 h-6 sm:h-8 rounded-full"
          ></img>
        </div>
        <div className="flex flex-col leading-tight">
          <div className="text-base sm:text-lg flex items-center">
            <span className="text-gray-700 mr-2 sm:mr-3">
              {otherUser?.firstName} {otherUser?.lastName}
            </span>
          </div>
          <span className="text-xs sm:text-sm text-gray-600">
            {otherUser?.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConversationHeader;
