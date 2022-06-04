import { useContext, createContext, useEffect, useState } from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signInWithGithub = async () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    console.log(auth, provider);
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
    return result.user;
  };

  const signOutFromGithub = () => {
    const auth = getAuth();
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  //useEffect(() => {
  //  const auth = getAuth();
  //  const unsubscribe = onAuthStateChanged(auth, (user) => {
  //    if (user) {
  //      setUser(user);
  //    } else {
  //      setUser(false);
  //    }
  //  });

  //  return () => unsubscribe();
  //}, []);

  return {
    user,
    signInWithGithub,
    signOutFromGithub
  };
}
