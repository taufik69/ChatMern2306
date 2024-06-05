import { toast, Bounce } from "react-toastify";
function fireToastSucess(
  msg = "message Missing",
  positon = "top-right",
  timeToClose = 5000,
) {
  toast.success(msg, {
    position: positon,
    autoClose: timeToClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

// error toast fire
function fireToastError(
  msg = "message Missing",
  positon = "top-center",
  timeToClose = 5000,
) {
  toast.error(msg, {
    position: positon,
    autoClose: timeToClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}
export { fireToastSucess, fireToastError };
