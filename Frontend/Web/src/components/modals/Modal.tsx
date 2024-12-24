import  { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Modal = () => {
  const globalContext = useContext(GlobalContext);

  if (!globalContext) {
    throw new Error("GlobalContext must be used within a GlobalProvider");
  }

  const { modalData, isModalOpen, closeModal } = globalContext;

  if (!isModalOpen || !modalData) return null;

  return (
    <div>
      return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-4 shadow-lg max-w-md w-full">
          {/* Titre */}
          {modalData.title && (
            <h2 className="text-lg font-bold mb-2 text-center">{modalData.title}</h2>
          )}

          {/* Contenu */}
          <div className="mb-4">{modalData.content}</div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            {modalData.actions || (
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Fermer
              </button>
            )}
          </div>
        </div>
      </div>
      );{" "}
    </div>
  );
};

export default Modal;