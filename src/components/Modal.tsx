import React from "react";
import ReactDOM from "react-dom";
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
          <div
            className="bg-white sm:p-5 p-2 rounded-lg text-left overflow-hidden shadow-xl relative"
          //  onMouseLeave={onClose}
          >
            <button
              onClick={onClose}
              type="button"
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaX className="text-[#ff0000]" />
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
