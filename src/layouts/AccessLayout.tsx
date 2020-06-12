import React from "react";
import Link from "next/link";

const AccessLayout: React.FC<{}> = ({ children }) => {
  const backgroundImage = process.env.BG_AUTH_URL
    ? `url("${process.env.BG_AUTH_URL}")`
    : null;

  return (
    <div className="layout-access" style={{ backgroundImage }}>
      <div className="container">
        <div className="layout-access__container">
          <div className="layout-auth__logo">
            <Link href="/">
              <img src={process.env.LOGO_AUTH_URL} />
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccessLayout;
