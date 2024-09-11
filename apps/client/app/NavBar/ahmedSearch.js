const [searchQuery, setSearchQuery] = useState("");
const filteredUsers = users.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
);
<input
  type="text"
  placeholder="Search users..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full p-2 rounded bg-[#393E46] text-white"
/>;

{
  users.map((user, index) => (
    <li
      key={index}
      className={`flex items-center p-1 bg-[#393E46] rounded-md cursor-pointer transition-colors ${user.name === selectedUser?.name ? "border-b-4 border-[#FFD369]" : ""}`}
      onClick={() => onUserSelect(user)}
    >
      <div className="relative">
        <img src="./user_img.svg" alt="user_img" className="mr-4" />
        <span
          className={`absolute top-2 right-6 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${user.isOnline ? "bg-[#FFD369]" : "bg-[#eb2e2e]"}`}
        ></span>
      </div>
      <div className="flex-1">
        <span className="block font-kreon">{user.name}</span>
        <span className="block text-sm text-gray-400">{user.timestamp}</span>
      </div>
      {user.unreadMessages > 0 && (
        <span className="bg-[#FFD369] text-gray-800 text-xs rounded-full px-2 py-1 mr-1">
          {user.unreadMessages}
        </span>
      )}
    </li>
  ));
}
