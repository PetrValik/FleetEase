"use client";

import React, { useState, useEffect } from "react";
import {
  getAllUsersWithoutCompany,
  getAllUsersFromCompany,
  updateUser,
} from "../../database/users/users";
import { getAllRoles } from "../../database/users/role";
import type { User } from "../../contexts/UserContext";

type Role = {
  role_id: number;
  role_name: "Admin" | "Driver" | "Manager";
};

const mapRoleToLocal = (role: any): Role | null => {
  if (!role || !role.role_name) return null;
  return {
    role_id: role.role_id,
    role_name: role.role_name as "Admin" | "Driver" | "Manager",
  };
};

const Role_Company: React.FC = () => {
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [unassignedUsers, setUnassignedUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "assign">("edit");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch and update user data from the backend
  const fetchUserData = async () => {
    const [rolesData, companyUsersData, unassignedUsersData] =
      await Promise.all([
        getAllRoles(),
        getAllUsersFromCompany(1),
        getAllUsersWithoutCompany(),
      ]);

    setRoles(
      rolesData
        .map(mapRoleToLocal)
        .filter((role): role is Role => role !== null)
    );

    setCompanyUsers(
      companyUsersData.map((user) => ({
        ...user,
        role: user.role ? mapRoleToLocal(user.role) : null,
      }))
    );

    setUnassignedUsers(
      unassignedUsersData.map((user) => ({
        ...user,
        role: user.role ? mapRoleToLocal(user.role) : null,
      }))
    );
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUserUpdate = async (
    userId: number,
    role: Role,
    companyId: number
  ) => {
    try {
      // Update the user on the backend
      await updateUser(userId, {
        roles_id: role.role_id,
        company_id: companyId,
      });

      // Fetch updated data from the backend
      await fetchUserData();

      // Close the modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const openModal = (user: User, mode: "edit" | "assign") => {
    setSelectedUser(user);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            Editace rolí, přiřazení do společnosti
          </h1>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Uživatelé z Vaší společnosti
          </h2>
          <div className="space-y-2">
            {companyUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex flex-col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">
                    {user.role?.role_name || "Žádná role"}
                  </span>
                  <button
                    onClick={() => openModal(user, "edit")}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Upravit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Uživatelé bez rolí a zařazení
          </h2>
          <div className="space-y-2">
            {unassignedUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex flex-col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600">Nepřiřazeno</span>
                  <button
                    onClick={() => openModal(user, "assign")}
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    Přiřadit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-[425px] p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {modalMode === "edit"
                  ? "Upravit roli uživatele"
                  : "Přiřadit uživatele"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2">
                  Jméno: {selectedUser.first_name} {selectedUser.last_name}
                </p>
                {modalMode === "edit" && (
                  <p className="mb-4">
                    Současná role:{" "}
                    {selectedUser.role?.role_name || "Žádná role"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Nová role:</label>
                <select
                  className="w-full border rounded-md p-2"
                  onChange={(e) => {
                    const roleId = parseInt(e.target.value);
                    const role = roles.find((r) => r.role_id === roleId);
                    setSelectedUser((prevUser) => ({
                      ...prevUser!,
                      role: role || null,
                    }));
                  }}
                  value={selectedUser.role?.role_id || ""}
                >
                  <option value="">Vyberte roli</option>
                  {roles
                    .filter((role) => role.role_name !== "Admin")
                    .map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {role.role_name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Firma:</label>
                <select
                  className="w-full border rounded-md p-2"
                  onChange={(e) =>
                    setSelectedUser((prevUser) => ({
                      ...prevUser!,
                      company_id: parseInt(e.target.value),
                    }))
                  }
                  value={selectedUser.company_id || ""}
                >
                  <option value="1">FleetEase</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  if (selectedUser.role) {
                    handleUserUpdate(
                      selectedUser.user_id,
                      selectedUser.role,
                      selectedUser.company_id || 1
                    );
                  }
                }}
                className="bg-[#001529] text-white px-4 py-2 rounded-md hover:bg-[#002140]"
              >
                {modalMode === "edit" ? "Uložit změny" : "Přiřadit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Role_Company;
