import React from 'react';

const Chat = ({ messages }) => {
  return (
    <div className="bg-[#393E46] text-white rounded-md p-2">
      {messages.map((message, index) => {
        const isSmallMessage = message.content.length < 50;
        const maxWidthClass = isSmallMessage ? 'max-w-[35%]' : 'max-w-[50%]';

        return (
          <div
            key={index}
            className={`mb-2 p-2 rounded-2xl mr-2 ${maxWidthClass} ${message.isUser ? ' ml-auto rounded-tr-none bg-[#FFD369] justify-end' : ' mr-auto rounded-tl-none bg-[#222831] justify-start'
              }`}
          >
            <span className={`block text-sm text-center break-words ${message.isUser ? 'text-[#222831]' : 'text-[#FFD369]'}`}>
              {message.content}
            </span>
            <span className="text-xs text-gray-500 mt-1 block text-right">
              {message.timestamp}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
