import React from "react";
import { IoIosClose } from "react-icons/io";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 z-40  bg-white/40" onClick={onClose} />
      {/* Modal container */}
      <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 pb-3 sm:pb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                onClick={onClose}
              >
                <IoIosClose size={24} />
              </button>
            </div>
            {/* Modal Body */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;