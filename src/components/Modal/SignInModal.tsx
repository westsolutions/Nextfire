import React, { useState, useEffect } from "react";
import AccessLayout from "@layouts/AccessLayout";
import SignInForm from "@components/Auth/SignInForm";
import SignUpForm from "@components/Auth/SignUpForm";
import { Modal } from "reactstrap";

const SignInModal: React.FC<{ visible; onClose }> = ({ visible, onClose }) => {
  const [action, setAction] = useState<"signin" | "signup">("signup");
  const isSignIn = action === "signin";
  const isSignUp = action === "signup";

  return (
    <Modal className="modal-dialog-centered" size="lg" isOpen={visible}>
      <AccessLayout>
        <div className="sign-in">
          {isSignIn && (
            <SignInForm
              onSubmit={() => onClose()}
              chnangeAction={() => setAction("signup")}
            />
          )}
          {isSignUp && (
            <SignUpForm
              onSubmit={() => onClose()}
              chnangeAction={() => setAction("signin")}
            />
          )}
        </div>
      </AccessLayout>
    </Modal>
  );
};

export default SignInModal;
