import React, { useState } from "react";
import LoginModal from "../library/components/modals/login";

export const LoginModalContext = React.createContext({});

export const withLoginModal = Component => {
  const WithLoginModal = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const showLogin = () => setShowLoginModal(true);
    return (
      <LoginModalContext.Provider value={showLogin}>
        <Component />
        {showLoginModal && (
          <LoginModal onDismiss={() => setShowLoginModal(false)} />
        )}
      </LoginModalContext.Provider>
    );
  };
  return WithLoginModal;
};
