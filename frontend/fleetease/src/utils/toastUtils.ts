import { toast } from "react-toastify";

const getToastConfig = (isMobile: boolean) => ({
  position: "top-right" as const,
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light" as const,
  style: {
    fontSize: isMobile ? '14px' : '16px',
    padding: isMobile ? '8px 12px' : '16px',
    minHeight: isMobile ? '40px' : 'auto',
    width: isMobile ? '280px' : '360px',
  },
});

// Success Notification
export const showSuccessToast = (message: string) => {
  const isMobile = window.innerWidth < 768;
  toast.success(message, getToastConfig(isMobile));
};

// Error Notification
export const showErrorToast = (message: string) => {
  const isMobile = window.innerWidth < 768;
  toast.error(message, getToastConfig(isMobile));
};

// Info Notification
export const showInfoToast = (message: string) => {
  const isMobile = window.innerWidth < 768;
  toast.info(message, getToastConfig(isMobile));
};

// Warning Notification
export const showWarningToast = (message: string) => {
  const isMobile = window.innerWidth < 768;
  toast.warning(message, getToastConfig(isMobile));
};

