import React from "react";

const AuthLayout: React.FC<{}> = ({ children }) => {
  return (
    <div className="layout-auth">
      <div className="container">
        <div className="layout-auth__container">
          <div className="layout-auth__logo">
            <img src={process.env.LOGO_URL} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
