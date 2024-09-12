import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

const users = [
  { name: "Ahmed", timestamp: "07:25", isOnline: true, hasNotification: false },
  {
    name: "Abdelfatah",
    timestamp: "09:21",
    isOnline: true,
    hasNotification: true,
  },
  {
    name: "Yousra",
    timestamp: "12:43",
    isOnline: false,
    hasNotification: true,
  },
  { name: "Ayoub", timestamp: "18:56", isOnline: true, hasNotification: false },
  {
    name: "Abdellah",
    timestamp: "14:07",
    isOnline: false,
    hasNotification: true,
    unreadMessages: 3,
  },
  { name: "Anas", timestamp: "8:26", isOnline: true, hasNotification: false },
  {
    name: "Ahmed1",
    timestamp: "07:25",
    isOnline: true,
    hasNotification: false,
  },
  {
    name: "Abdelfatah1",
    timestamp: "09:21",
    isOnline: true,
    hasNotification: true,
  },
  {
    name: "Yousra1",
    timestamp: "12:43",
    isOnline: false,
    hasNotification: true,
  },
  {
    name: "Ayoub1",
    timestamp: "18:56",
    isOnline: true,
    hasNotification: false,
  },
  {
    name: "Abdellah1",
    timestamp: "14:07",
    isOnline: false,
    hasNotification: true,
    unreadMessages: 13,
  },
  { name: "Anas1", timestamp: "8:26", isOnline: true, hasNotification: false },
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const [selectedUser, setSelectedUser] = useState(() => users[0]);
  // const onUserSelect = (user) => {
  //   setSelectedUser(user);
  //   setIsUserListVisible(false);
  //   // check if the user has unread messages
  //   if (user.unreadMessages) {
  //     users.find((u) => u.name === user.name).unreadMessages = 0;
  //   }
  //   console.log(user.name);
  // };

  return (
    <>
      <CiSearch />
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        // onChange={(e) => setSearchQuery(e.target.value)}
        className=""
      />
      <ul className=" gap-10 space-y-8">
        {searchQuery &&
          filteredUsers.map(({ user, key }) => (
            <li key={key} className="" onClick={() => onUserSelect(user)}>
              <div key={key}  className="">
                <span key={key}  className="bg-black w-52 h-52">{user?.name}</span>
                <span key={key}  className="">{user?.timestamp}</span>
              </div>
              {user?.unreadMessages > 0 && (
                <span key={key}  className="">{user?.unreadMessages}</span>
              )}
            </li>
          ))}
      </ul>
    </>
  );
}

{
  /* <UserList users={filteredUsers} onUserSelect={handleUserSelect} selectedUser={selectedUser} /> */
}
