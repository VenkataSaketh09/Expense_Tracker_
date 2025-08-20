import React from "react";
import { IoIosClose } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item?",
  itemName = "",
  type = "item", // "income" or "expense" or "item"
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "income":
        return {
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          confirmBtn: "bg-red-600 hover:bg-red-700",
        };
      case "expense":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          confirmBtn: "bg-red-600 hover:bg-red-700",
        };
      default:
        return {
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          confirmBtn: "bg-red-600 hover:bg-red-700",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
        onClick={onClose}
      />
      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
        <div className="relative w-full max-w-md">
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 pb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 ${styles.iconBg} rounded-full flex items-center justify-center`}
                >
                  <IoWarningOutline className={`w-6 h-6 ${styles.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              </div>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                onClick={onClose}
                disabled={isLoading}
              >
                <IoIosClose size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 pb-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-3">{message}</p>
                {itemName && (
                  <div className="bg-gray-50 rounded-lg p-3  border-red-400">
                    <p className="text-sm font-medium text-gray-900">
                      <span className="text-gray-600">Item:</span> {itemName}
                    </p>
                  </div>
                )}
                <p className="text-sm text-red-600 mt-3 font-medium">
                  ⚠️ This action cannot be undone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={onClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={`flex-1 px-4 py-3 ${styles.confirmBtn} text-white rounded-xl transition-colors font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                  onClick={onConfirm}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <LuTrash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeleteModal;
