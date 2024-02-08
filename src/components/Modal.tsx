import React from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-[#dddd]">
          <div className="bg-white p-5 rounded-lg text-left overflow-hidden shadow-xl">
            <button
              onClick={onClose}
              type="button"
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaX className="text-[#ff0000] text-xl" />
            </button>

            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              {children}
            </div>
          </div>
        </div>,
        document.getElementById("portal")!
      )
    : null;
};

export default Modal;
