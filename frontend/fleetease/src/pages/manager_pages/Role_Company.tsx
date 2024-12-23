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

const mapRoleToLocal = (role: any): Role => {
  if (role && role.role_id && role.role_name) {
    return {
      role_id: role.role_id,
      role_name: role.role_name,
    };
  }

  return { role_id: 1, role_name: "Driver" };
};

const Role_Company: React.FC = () => {
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [unassignedUsers, setUnassignedUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "assign">("assign");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    try {
      const [rolesData, companyUsersData, unassignedUsersData] =
        await Promise.all([
          getAllRoles(),
          getAllUsersFromCompany(1, 1000),
          getAllUsersWithoutCompany(),
        ]);

      setRoles(rolesData.map(mapRoleToLocal));

      setCompanyUsers(
        companyUsersData.map((user) => ({
          ...user,
          role: mapRoleToLocal(user.role),
        }))
      );

      setUnassignedUsers(
        unassignedUsersData.map((user) => ({
          ...user,
          role: mapRoleToLocal(user.role),
        }))
      );
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleCompanyAssignment = async (userId: number, companyId: number) => {
    try {
      if (modalMode === "edit" && selectedUser) {
        await updateUser(userId, {
          roles_id: selectedUser.role.role_id,
        });
      } else {
        await updateUser(userId, {
          company_id: companyId,
        });
      }
      await fetchUserData(); // Refresh data after update
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
      {/* Users in the company */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Uživatelé z Vaší společnosti
          </h2>
          <div className="space-y-2">
            {companyUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-semibold">
                    {user.role?.role_name || "Driver"}
                  </span>
                  <button
                    onClick={() => openModal(user, "edit")}
                    className="px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
                  >
                    Upravit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Users without a company */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Uživatelé bez rolí a zařazení
          </h2>
          <div className="space-y-2">
            {unassignedUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex items-center justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col">
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-semibold">Driver</span>
                  <button
                    onClick={() => openModal(user, "assign")}
                    className="px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
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
          <div className="bg-white rounded-lg w-full max-w-[425px] p-6 shadow-2xl">
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

            {modalMode === "assign" ? (
              <div className="space-y-4">
                <p className="mb-2">
                  Jméno: {selectedUser.first_name} {selectedUser.last_name}
                </p>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Firma:</label>
                  <select
                    className="w-full border rounded-md p-2"
                    onChange={(e) => {
                      const companyId = parseInt(e.target.value);
                      handleCompanyAssignment(selectedUser.user_id, companyId);
                      closeModal();
                    }}
                  >
                    <option value="">Vyberte firmu</option>
                    <option value="1">FleetEase</option>
                    <option value="2">ExampleCompany</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="mb-2">
                  Jméno: {selectedUser.first_name} {selectedUser.last_name}
                </p>
                <p className="mb-4">
                  Současná role: {selectedUser.role.role_name}
                </p>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">
                    Nová role:
                  </label>
                  <select
                    className="w-full border rounded-md p-2"
                    onChange={async (e) => {
                      const roleId = parseInt(e.target.value);
                      const role = roles.find((r) => r.role_id === roleId);
                      if (role && selectedUser) {
                        const updatedUser = {
                          ...selectedUser,
                          role: role,
                        };
                        setSelectedUser(updatedUser);
                      }
                    }}
                    value={selectedUser.role.role_id}
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
              </div>
            )}

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  if (modalMode === "edit" && selectedUser) {
                    handleCompanyAssignment(
                      selectedUser.user_id,
                      selectedUser.company_id || 1
                    );
                  } else {
                    handleCompanyAssignment(selectedUser!.user_id, 1);
                  }
                  closeModal();
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
