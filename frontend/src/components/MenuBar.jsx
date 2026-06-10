import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MenuBar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <FaEllipsisV />
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">

          <button
            onClick={() => navigate("/edit-profile")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            👤 Edit Profile
          </button>

          <button
            onClick={() => navigate("/change-avatar")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            🖼️ Change Avatar
          </button>

          <button
            onClick={() => navigate("/change-cover")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            🌄 Change Cover Image
          </button>

          <button
            onClick={() => navigate("/change-password")}
            className="w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            🔒 Change Password
          </button>

        </div>
      )}
    </div>
  );
}

export default MenuBar;