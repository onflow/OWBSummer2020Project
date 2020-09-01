import React, { createContext, useEffect, useContext, useState } from 'react';
import * as fcl from '@onflow/fcl';

export const Context = createContext();

export function WalletProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    fcl.config().put('challenge.handshake', 'http://localhost:8701/flow/authenticate');
  }, []);

  useEffect(() => (
    fcl.currentUser().subscribe(setCurrentUser)
  ), []);

  return (
    <Context.Provider
      value={[fcl, currentUser]}
      {...props}
    />
  );
}

export function useWallet() {
  return useContext(Context);
}
