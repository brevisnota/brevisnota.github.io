import { useContext } from "react";
import { ToastContext } from "../contexts/toast-context";

export const useNotification = () => {
  const { open: openToast } = useContext(ToastContext);

  return {
    showMessage: (message: string) => openToast({ message }),
  };
};
