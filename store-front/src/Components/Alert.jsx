import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Alert = () => {
  const [isClosed, setIsClosed] = useState(false);

  return (
    <>
      {!isClosed && (
        <div className="alert">
          <p className="container">
            This is a demo website.{" "}
            <a target="_blank" href="http://localhost:5173/login">
              You can visit the admin panel here.
            </a>
          </p>
          <div
            onClick={() => setIsClosed(true)}
            className="close-cart close-alert"
          >
            <IoClose size={20} />
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
