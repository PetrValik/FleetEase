import React, { useState, useEffect } from "react";
import * as Database from "../../database/database";
import * as Toast from "../../utils/toastUtils";

const roleMap: { [key: number]: string } = {
  1: "Admin",
  2: "Manager",
  3: "Driver",
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<Database.GetUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<Database.GetUser | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const usersData = await Database.getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      Toast.showErrorToast("Cant fetch Users");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditUser = async (updatedUser: Database.GetUser) => {
    setIsLoading(true);

    try {
      const updatedUserData = await Database.updateUser(updatedUser.user_id, {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number || undefined,
        company_id: updatedUser.company_id || undefined,
        roles_id: updatedUser.roles_id,
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === updatedUser.user_id
            ? { ...user, ...updatedUserData }
            : user
        )
      );

      await fetchData(); // Refresh the user list
      Toast.showSuccessToast("User succesfully updated!");
      setIsModalOpen(false);
    } catch (error) {
      Toast.showErrorToast("Failed to update user");
      console.error("Failed to update user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (user: Database.GetUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.user_id}
                className="flex flex-wrap items-start justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col max-w-full">
                  <span className="truncate">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {user.email}
                  </span>
                  <span className="text-sm text-gray-500">
                    Role: {roleMap[user.roles_id]}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 flex-shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => openModal(user)}
                    className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">First Name:</label>
                <input
                  type="text"
                  value={selectedUser.first_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      first_name: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Last Name:</label>
                <input
                  type="text"
                  value={selectedUser.last_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      last_name: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Email:</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={selectedUser.phone_number || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phone_number: e.target.value || null,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Company ID:</label>
                <input
                  type="number"
                  value={selectedUser.company_id || ""}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      company_id: e.target.value
                        ? parseInt(e.target.value, 10)
                        : null,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role:</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={selectedUser.roles_id}
                  onChange={(e) => {
                    setSelectedUser({
                      ...selectedUser,
                      roles_id: parseInt(e.target.value, 10),
                    });
                  }}
                >
                  {Object.entries(roleMap).map(([id, name]) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-end mt-6">
              <button
                onClick={() => selectedUser && handleEditUser(selectedUser)}
                className="bg-[#001529] text-white px-4 py-2 rounded-md hover:bg-[#002140] disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
