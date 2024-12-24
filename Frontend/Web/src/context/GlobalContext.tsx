import { createContext, Dispatch, SetStateAction } from "react";
import { ToastOptions } from "react-toastify";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ModalData {
  title?: string;
  content?: React.ReactNode;
  actions?: React.ReactNode;
}

export interface GlobalContextType {
  setToast: (message: string, type?: ToastType, options?: ToastOptions) => void;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  openModal: (data: ModalData) => void;
  closeModal: () => void;
  modalData: ModalData | null;
  isModalOpen: boolean;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export default GlobalContext;