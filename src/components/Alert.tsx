import { Icon } from "@iconify/react";
import informationFilled from "@iconify/icons-carbon/information-filled";
import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useState } from "react";

const Alert: React.ForwardRefRenderFunction<{
  showAlert: (message: string) => void;
}> = (_, ref) => {
  const [isShow, setIsShow] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (message: string) => {
    setIsShow(true);
    setMessage(message);

    setTimeout(() => {
      setIsShow(false);
    }, 2000);
  };

  useImperativeHandle(ref, () => ({
    showAlert,
  }));

  return (
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
};

export default forwardRef(Alert);
