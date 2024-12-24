import React, { useState } from "react";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalContext, { GlobalContextType, ToastType, ModalData } from "./GlobalContext";

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<string>("Home");

  // Gestion des toasts
  const setToast = (message: string, type: ToastType = "info", options?: ToastOptions) => {
    const toastTypes = {
      info: toast.info,
      success: toast.success,
      warning: toast.warning,
      error: toast.error,
    };
    toastTypes[type](message, options);
  };

  // Gestion de la modale
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (data: ModalData) => {
    setModalData(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false);
  };

  const contextValue: GlobalContextType = {
    setToast,
    content,
    setContent,
    openModal,
    closeModal,
    modalData,
    isModalOpen,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
      {/* Modale Générique */}
      {isModalOpen && modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 "onClick={closeModal}>
          <div className="bg-white p-4 shadow-2xl max-w-md w-full rounded-xl ">
            {/* Titre */}
            {modalData.title && <h2 className="p-2 text-lg font-bold text-center tracking-widest border-b ">{modalData.title}</h2>}

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
      )}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;