import { createContext, ReactNode, useState, useEffect } from 'react';
import { auth, firebase } from 'C:/NLW/letmeask/src/services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}
type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}
type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged(user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Acount.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return () => {
      unsubscribed();
    }
  }, [])

  async function signInWithGoogle() {
    //login
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Acount.');
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}