import { useState } from "react";
import { Icon } from "@iconify/react";
import informationFilled from "@iconify/icons-carbon/information-filled";
import { createPortal } from "react-dom";

const useToast = () => {
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (message: string) => {
    setIsShow(true);
    setMessage(message);

    const id = setTimeout(() => {
      setIsShow(false);
      clearTimeout(id);
    }, 2000);
  };

  const Toast = () => (
    <>
      {isShow &&
        createPortal(
          <div
            className="
            alert 
            alert-success
            fixed
            right-0
            top-4
            w-80
            "
          >
            <Icon icon={informationFilled} />
            <span>{message}</span>
          </div>,
          document.body
        )}
    </>
  );

  return {
    Toast,
    showToast,
  };
};

export default useToast;
