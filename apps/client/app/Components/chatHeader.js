import React from 'react';
import { FiMenu } from 'react-icons/fi';

const ChatHeader = ({ selectedUser, toggleUserList }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-r-md bg-[#222831]">
      <div className="flex items-center">
        <div className="block lg:hidden">
          <FiMenu
            size={24}
            className="text-[#FFD369] cursor-pointer mr-2"
            onClick={toggleUserList}
          />
        </div>
        <img src="./user_img.svg" alt="user_img" className="w-10 h-10 mr-4 rounded-full" />
        <div>
          <span className="text-lg font-kreon text-white">{selectedUser.name}</span>
          <span className={`block text-sm ${selectedUser.isOnline ? 'text-[#FFD369]' : 'text-[#eb2e2e]'}`}>
            {selectedUser.isOnline ? 'online' : 'offline'}
          </span>
        </div>
      </div>
      <div className="text-white text-2xl cursor-pointer">
        <img src='./3dots.svg' alt='3dots_img' />
      </div>
    </div>
  );
};

export default ChatHeader;
