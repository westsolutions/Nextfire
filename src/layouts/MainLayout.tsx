import React from "react";
import NavBar from "@components/Navigation/NavBar";
import { useState } from "react";
import { useAuth } from "reactfire";
import SignInModal from "@components/Modal/SignInModal";

interface Props {
  children: (prop) => JSX.Element;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  const backgroundImage = process.env.BG_DASHBOARD_URL
    ? `url("${process.env.BG_DASHBOARD_URL}")`
    : null;

  const auth = useAuth();
  const [isModalVisible, setModalVisible] = useState(!auth.currentUser);

  const toggleModal = (show: boolean) => {
    setModalVisible(show);
  };

  const props = {
    openAuthModal: () => toggleModal(true)
  };

  return (
    <div className="layout-main" style={{ backgroundImage }}>
      <SignInModal
        visible={isModalVisible}
        onClose={() => toggleModal(false)}
      />
      <NavBar openAuthModal={props.openAuthModal} />
      {children(props)}
    </div>
  );
};

export default MainLayout;
