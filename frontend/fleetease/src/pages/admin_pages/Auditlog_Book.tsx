import React, { useEffect, useState } from "react";
import * as Database from "../../database/database";
import { formatDate } from "../../utils/dateUtils";
import * as Toast from "../../utils/toastUtils";

export default function AuditlogBook() {
  const [logs, setLogs] = useState<Database.AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const auditLogs = await Database.getAllLogs();
        setLogs(auditLogs);
      } catch (error) {
        Toast.showErrorToast("Failed to fetch audit logs");
        console.error("Failed to fetch audit logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const renderTableView = () => (
    <div className="overflow-x-auto -mx-2 sm:-mx-4 md:-mx-6">
      <div className="inline-block min-w-full py-2 sm:px-4 md:px-6 align-middle">
        <div className="overflow-hidden shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["ID", "Table", "Operation", "Record ID", "Performed By", "Timestamp"].map((header) => (
                  <th
                    key={header}
                    className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.id}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.table_name}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        log.operation === "INSERT"
                          ? "bg-green-100 text-green-800"
                          : log.operation === "DELETE"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {log.operation}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.record_id || "N/A"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.performed_by || "System"}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCardView = () => (
    <div className="space-y-4">
      {logs.map((log) => (
        <div key={log.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-900">ID: {log.id}</span>
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                log.operation === "INSERT"
                  ? "bg-green-100 text-green-800"
                  : log.operation === "DELETE"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {log.operation}
            </span>
          </div>
          <div className="text-sm text-gray-500 mb-1">Table: {log.table_name}</div>
          <div className="text-sm text-gray-500 mb-1">Record ID: {log.record_id || "N/A"}</div>
          <div className="text-sm text-gray-500 mb-1">Performed By: {log.performed_by || "System"}</div>
          <div className="text-sm text-gray-500">{formatDate(log.timestamp)}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Audit Log Book
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            A detailed history of all system operations and changes
          </p>
        </div>
        <div className="p-4 sm:p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="hidden sm:block">{renderTableView()}</div>
              <div className="sm:hidden">{renderCardView()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

