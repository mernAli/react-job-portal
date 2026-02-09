import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children, footer }) => {

  // Close when ESC pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-700 rounded-xl shadow-lg w-[90%] max-w-md p-6 animate-fadeIn"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-amber-100">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-black text-xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3 mt-6">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
