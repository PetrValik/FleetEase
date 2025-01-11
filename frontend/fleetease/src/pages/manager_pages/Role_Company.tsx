import React, { useState, useEffect } from "react";
import * as Database from "../../database/database";
import { useUser } from "../../contexts/UserContext";
import * as Toast from "../../utils/toastUtils";

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

  return { role_id: 3, role_name: "Driver" };
};

const Role_Company: React.FC = () => {
  const { user: currentUser } = useUser();
  const [companyUsers, setCompanyUsers] = useState<Database.GetUser[]>([]);
  const [unassignedUsers, setUnassignedUsers] = useState<Database.GetUser[]>(
    []
  );
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<Database.GetUser | null>(
    null
  );
  const [originalRole, setOriginalRole] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "assign">("assign");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const roleMap: { [key: number]: string } = {
    1: "Admin",
    2: "Manager",
    3: "Driver",
  };

  const fetchUserData = async () => {
    try {
      const [rolesData, companyUsersData, unassignedUsersData] =
        await Promise.all([
          Database.getAllRoles(),
          Database.getAllUsersFromCompany(currentUser?.company_id || 1, 1000),
          Database.getAllUsersWithoutCompany(),
        ]);

      setRoles(rolesData.map(mapRoleToLocal));
      setCompanyUsers(companyUsersData);
      setUnassignedUsers(unassignedUsersData);
    } catch (error) {
      Toast.showErrorToast("Failed to fetch user data");
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentUser]);

  const handleCompanyAssignment = async (userId: number) => {
    try {
      if (modalMode === "edit" && selectedUser) {
        await Database.updateUser(userId, {
          company_id: currentUser?.company_id || 1,
          roles_id: selectedUser.roles_id,
        });
      } else {
        await Database.updateUser(userId, {
          company_id: currentUser?.company_id || 1,
        });
      }
      await fetchUserData();
      Toast.showSuccessToast("User succesfully updated");
      closeModal();
    } catch (error) {
      Toast.showErrorToast("Failed to update user");
      console.error("Failed to update user:", error);
    }
  };

  const openModal = (user: Database.GetUser, mode: "edit" | "assign") => {
    setSelectedUser(user);
    setOriginalRole(user.roles_id);
    setModalMode(mode);
    if (mode === "assign") {
      setShowConfirmation(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setOriginalRole(null);
    setIsModalOpen(false);
    setShowConfirmation(false);
  };

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      {/* Users in the company */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Users from Your Company</h2>
          <div className="space-y-2">
            {companyUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="truncate">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {roleMap[user.roles_id]}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 w-full sm:w-auto text-right">
                  <button
                    onClick={() => openModal(user, "edit")}
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

      {/* Users without a company */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-300">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Users without company</h2>
          <div className="space-y-2">
            {unassignedUsers.map((user) => (
              <div
                key={user.user_id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-gray-100"
              >
                <div className="flex flex-col w-full sm:w-auto">
                  <span className="truncate">
                    {user.first_name} {user.last_name}
                  </span>
                  <span className="text-sm text-gray-500 truncate">
                    {roleMap[user.roles_id]}
                  </span>
                </div>
                <div className="mt-2 sm:mt-0 w-full sm:w-auto text-right">
                  <button
                    onClick={() => openModal(user, "assign")}
                    className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add User</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-center mb-4">
                Do you really want to add the user {selectedUser.first_name}{" "}
                {selectedUser.last_name} to your company?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-md bg-white hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCompanyAssignment(selectedUser.user_id)}
                  className="bg-[#001529] text-white px-4 py-2 rounded-md hover:bg-[#002140]"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[90%] max-w-[400px] p-4 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User Role</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="mb-2">
                Name: {selectedUser.first_name} {selectedUser.last_name}
              </p>
              <p className="mb-4">Current role: {roleMap[originalRole!]}</p>
              <div className="space-y-2">
                <label className="block text-sm font-medium">New role:</label>
                <select
                  className="w-full border rounded-md p-2"
                  onChange={(e) => {
                    const roleId = parseInt(e.target.value);
                    if (selectedUser) {
                      setSelectedUser({
                        ...selectedUser,
                        roles_id: roleId,
                      });
                    }
                  }}
                  value={selectedUser.roles_id}
                >
                  <option value="">Select role</option>
                  {roles
                    .filter((role) => role.role_name !== "Admin")
                    .map((role) => (
                      <option key={role.role_id} value={role.role_id}>
                        {roleMap[role.role_id]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => handleCompanyAssignment(selectedUser.user_id)}
                className="bg-[#001529] text-white px-4 py-2 rounded-md hover:bg-[#002140]"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Role_Company;
