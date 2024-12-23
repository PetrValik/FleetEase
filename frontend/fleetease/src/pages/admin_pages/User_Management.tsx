"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers, updateUser } from "../../database/users/users";
import { getAllRoles } from "../../database/users/role";
import type { User } from "../../contexts/UserContext";

type Role = {
  role_id: number;
  role_name: "Admin" | "Driver" | "Manager";
};

type FeedbackMessage = {
  type: "success" | "error";
  message: string;
};

const mapRoleToLocal = (role: any): Role => {
  if (role && role.role_id && role.role_name) {
    return {
      role_id: role.role_id,
      role_name: role.role_name,
    };
  }
  return { role_id: 1, role_name: "Driver" }; // Default role
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  const fetchData = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        getAllUsers(),
        getAllRoles(),
      ]);

      setUsers(
        usersData.map((user) => ({
          ...user,
          role: mapRoleToLocal(user.role),
        }))
      );

      setRoles(rolesData.map(mapRoleToLocal));
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setFeedback({
        type: "error",
        message: "Failed to load users. Please try again.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditUser = async (updatedUser: User) => {
    console.log("Saving user changes:", updatedUser);
    setIsLoading(true);
    setFeedback(null);
    try {
      const updatedUserData = (await updateUser(updatedUser.user_id, {
        first_name: updatedUser.first_name,
        last_name: updatedUser.last_name,
        email: updatedUser.email,
        phone_number: updatedUser.phone_number,
        company_id: updatedUser.company_id,
        roles_id: updatedUser.role.role_id,
      })) as User;

      console.log("User updated successfully", updatedUserData);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.user_id === updatedUser.user_id
            ? { ...user, ...updatedUserData }
            : user
        )
      );

      setFeedback({ type: "success", message: "User updated successfully" });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
      setFeedback({
        type: "error",
        message: "Failed to update user. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
    setFeedback(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-6 mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
      </div>

      {feedback && (
        <div
          className={`p-4 rounded-md ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-sm text-gray-500">{user.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => openModal(user)}
                    className="px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
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
          <div className="bg-white rounded-lg w-full max-w-[425px] p-6 shadow-2xl">
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
                  value={selectedUser.phone_number}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      phone_number: e.target.value,
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Company ID:</label>
                <input
                  type="number"
                  value={selectedUser.company_id}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      company_id: parseInt(e.target.value, 10),
                    })
                  }
                  className="w-full border rounded-md p-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role:</label>
                <select
                  className="w-full border rounded-md p-2"
                  value={selectedUser.role?.role_id || ""}
                  onChange={(e) => {
                    const roleId = parseInt(e.target.value, 10);
                    const role = roles.find((r) => r.role_id === roleId);
                    if (role) {
                      setSelectedUser({ ...selectedUser, role });
                    }
                  }}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.role_id} value={role.role_id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col items-end mt-6">
              {feedback && feedback.type === "error" && (
                <p className="text-red-500 text-sm mb-2 self-start">
                  {feedback.message}
                </p>
              )}
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
