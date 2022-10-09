import { toast } from "react-toastify";

const toastGenerator = (toastType, message) => {
  toast(message, { type: toastType });
};

export { toastGenerator };
