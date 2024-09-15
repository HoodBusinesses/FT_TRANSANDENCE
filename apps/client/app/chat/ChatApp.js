"use client";

import React, { useState } from 'react';
import UserList from '../Components/UsersList';
import Chat from '../Components/Chat';
import ChatHeader from '../Components/chatHeader';
import Input from '../Components/Input';

const users = [
  { name: 'Ahmed', image : './ahmed.png', timestamp: '07:25', isOnline: true, hasNotification: false },
  { name: 'Abdelfatah', image : './abdelfetah.png', timestamp: '09:21', isOnline: true, hasNotification: true },
  { name: 'Yousra', image : './yousra.png', timestamp: '12:43', isOnline: false, hasNotification: true },
  { name: 'Ayoub', image : './ayoub.png', timestamp: '18:56', isOnline: true, hasNotification: false },
  { name: 'Abdellah', image : './abdelah.png', timestamp: '14:07', isOnline: false, hasNotification: true, unreadMessages: 3 },
  { name: 'Anas', image : './anas.png', timestamp: '8:26', isOnline: true, hasNotification: false },
  { name: 'Ahmed1', image : './ahmed.png', timestamp: '07:25', isOnline: true, hasNotification: false },
  { name: 'Abdelfatah1', image : './abdelfetah.png', timestamp: '09:21', isOnline: true, hasNotification: true },
  { name: 'Yousra1', image : './yousra.png', timestamp: '12:43', isOnline: false, hasNotification: true },
  { name: 'Ayoub1', image : './ayoub.png', timestamp: '18:56', isOnline: true, hasNotification: false },
  { name: 'Abdellah1', image : './abdelah.png', timestamp: '14:07', isOnline: false, hasNotification: true, unreadMessages: 13 },
  { name: 'Anas1', image : './anas.png', timestamp: '8:26', isOnline: true, hasNotification: false },
];

const initialMessages = {
  Ahmed: [
    { content: 'Hello Ahmed!', timestamp: '2024-08-08 14:07', isUser: true },
    { content: 'Hi there, how are you?', timestamp: '2024-08-08 14:08', isUser: false },
    { content: 'Hello Ahmed!', timestamp: '2024-08-08 14:07', isUser: true },
    { content: 'Hi there, how are you?', timestamp: '2024-08-08 14:08', isUser: false },
    { content: 'Hello Ahmed!', timestamp: '2024-08-08 14:07', isUser: true },
    { content: 'Hi there, how are you?', timestamp: '2024-08-08 14:08', isUser: false },
  ],
  Abdelfatah: [
    { content: 'Hey Abdelfatah!', timestamp: '2024-08-08 14:09', isUser: false },
    { content: 'All good, you?', timestamp: '2024-08-08 14:10', isUser: true },
  ],
  Yousra: [
    { content: 'Hi Yousra!', timestamp: '2024-08-08 14:11', isUser: true },
    { content: 'Hello, how are you?', timestamp: '2024-08-08 14:12', isUser: false },
  ],
};

const ChatApp = () => {
  const [messages, setMessages] = useState(() => initialMessages);
  const [selectedUser, setSelectedUser] = useState(() => users[0]);
  const [isUserListVisible, setIsUserListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = (messageContent) => {
    const newMessage = {
      content: messageContent,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isUser: true,
    };

    setMessages({
      ...messages,
      [selectedUser.name]: [...(messages[selectedUser.name] || []), newMessage],
    });
  };

  const handleUserSelect = (user) => {
    if (!messages[user.name]) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [user.name]: [],
      }));
    }
    setSelectedUser(user);
    setIsUserListVisible(false);
    // check if the user has unread messages
    if (user.unreadMessages) {
      users.find((u) => u.name === user.name).unreadMessages = 0;
    }
  };

  const toggleUserList = () => {
    setIsUserListVisible(!isUserListVisible);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex absolute right-8 left-8 top-8 bottom-8 p-2 bg-[#393E46] rounded-lg border-2 border-[#ffd369]">
      {/* User List */}
      {isUserListVisible && (
        <div className="lg:hidden absolute left-0 overflow-y-auto pt-2 scrollbar-thin scrollbar-thumb-[#FFD369] scrollbar-track-gray-800 bg-[#222831] h-full z-10">
          <div className="sticky top-0 bg-[#222831] z-20 p-2">
            <input
              type="text"
              placeholder='Search users...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full p-2 rounded bg-[#393E46] text-white'
            />
          </div>
          <UserList users={filteredUsers} onUserSelect={handleUserSelect} selectedUser={selectedUser} />
        </div>
      )}
      <div className="hidden lg:block w-1/4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFD369] scrollbar-track-gray-800 bg-[#222831] rounded-l-lg">
        <div className="sticky top-0 bg-[#222831] z-20 p-2">
          <input
            type="text"
            placeholder='Search users...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full p-2 rounded bg-[#393E46] text-white'
          />
        </div>
        <UserList users={filteredUsers} onUserSelect={handleUserSelect} selectedUser={selectedUser} />
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="w-auto h-[13%] text-white font-kreon text-lg">
          <ChatHeader selectedUser={selectedUser} toggleUserList={toggleUserList} />
        </div>

        {/* Messages */}
        <div className="w-auto h-2/3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFD369] scrollbar-track-gray-800 ">
          <Chat messages={messages[selectedUser.name] || []} />
        </div>

        {/* Input Field */}
        <div className="lg:pr-5">
          <Input handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
