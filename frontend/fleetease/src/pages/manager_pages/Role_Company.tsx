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

const mapRoleToLocal = (role: any): Role => ({
  role_id: role.role_id,
  role_name: role.role_name as "Admin" | "Driver" | "Manager",
});

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  roles: Role[];
  onSubmit: (userId: number, role: Role, companyId: number) => Promise<void>;
  mode: "edit" | "assign";
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  user,
  roles,
  onSubmit,
  mode,
}) => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>(
    user?.company_id?.toString() || "1"
  );

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role || null);
      setSelectedCompany(user.company_id?.toString() || "1");
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async () => {
    if (user && selectedRole) {
      await onSubmit(user.user_id, selectedRole, parseInt(selectedCompany));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-[425px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {mode === "edit" ? "Upravit roli uživatele" : "Přiřadit uživatele"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="mb-2">
              Jméno: {user.first_name} {user.last_name}
            </p>
            {mode === "edit" && (
              <p className="mb-4">Současná role: {user.role?.role_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nová role:</label>
            <select
              className="w-full border rounded-md p-2"
              onChange={(e) => {
                const roleId = parseInt(e.target.value);
                const selectedRole = roles.find((r) => r.role_id === roleId);
                setSelectedRole(selectedRole || null);
              }}
              value={selectedRole?.role_id || ""}
            >
              <option value="">Vyberte roli</option>
              {roles.map((role) => (
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
              onChange={(e) => setSelectedCompany(e.target.value)}
              value={selectedCompany}
            >
              <option value="">Vyberte firmu</option>
              <option value="1">FleetEase</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-[#001529] text-white px-4 py-2 rounded-md hover:bg-[#002140]"
          >
            {mode === "edit" ? "Uložit změny" : "Přiřadit"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Role_Company: React.FC = () => {
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [unassignedUsers, setUnassignedUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "assign">("edit");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [rolesData, companyUsersData, unassignedUsersData] =
        await Promise.all([
          getAllRoles(),
          getAllUsersFromCompany(1), // Assuming company ID 1 for FleetEase
          getAllUsersWithoutCompany(),
        ]);

      setRoles(rolesData.map(mapRoleToLocal)); // Use the mapper here
      setCompanyUsers(companyUsersData);
      setUnassignedUsers(unassignedUsersData);
    };

    fetchData();
  }, []);

  const handleUserUpdate = async (
    userId: number,
    role: Role,
    companyId: number
  ) => {
    try {
      await updateUser(userId, {
        role: { role_id: role.role_id, role_name: role.role_name },
        company_id: companyId,
      } as Partial<User>);

      const updatedUserIndex = unassignedUsers.findIndex(
        (user) => user.user_id === userId
      );
      if (updatedUserIndex > -1) {
        const updatedUser = {
          ...unassignedUsers[updatedUserIndex],
          role: { role_id: role.role_id, role_name: role.role_name },
          company_id: companyId,
        };

        // Update the UI
        setUnassignedUsers((prev) =>
          prev.filter((user) => user.user_id !== userId)
        );
        setCompanyUsers((prev) => [...prev, updatedUser]);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const openModal = (user: User, mode: "edit" | "assign") => {
    setSelectedUser(user);
    setModalMode(mode);
    setIsModalOpen(true);
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
                  <span className="text-gray-600">{user.role?.role_name}</span>
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

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
        roles={roles}
        onSubmit={handleUserUpdate}
        mode={modalMode}
      />
    </div>
  );
};

export default Role_Company;
