import { createContext } from "react";
import toast, { Toaster } from "react-hot-toast";
const ToastContext = createContext();

export const ToastContextProvider = ({ children }) => {
  return (
    <ToastContext.Provider value={{ toast }}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // default options
          className: "",
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
