import { X } from "lucide-react";

export const DetailModal = ({ isOpen, onClose, title, children }) => {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                  <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-linear-to-r from-blue-900 to-blue-700 text-white px-6 py-4 flex justify-between items-center">
                              <h2 className="text-2xl font-bold">{title}</h2>
                              <button onClick={onClose} className="p-1 hover:bg-blue-800 rounded-lg transition">
                                    <X size={24} />
                              </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">{children}</div>
                  </div>
            </div>
      );
};
