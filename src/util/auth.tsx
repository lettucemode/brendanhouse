import { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { Auth } from 'aws-amplify';

export class UserInfo {
  user: any;
  login: any;
  logout: any;
  completeNewPassword: any;
}

export const UserContext = createContext<UserInfo>({} as UserInfo);

export const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const values: UserInfo = useMemo(
    () =>
      ({
        user,
        login: (usernameOrEmail: string, password: string) =>
          Auth.signIn(usernameOrEmail, password)
            .then((cognitoUser) => {
              setUser(cognitoUser);
              return cognitoUser;
            })
            .catch((err) => {
              if (err.code === 'UserNotFoundException') {
                err.message = 'Invalid username or password';
              }
              throw err;
            }),
        logout: () =>
          Auth.signOut().then((data) => {
            setUser(null);
            return data;
          }),
        completeNewPassword: (email: string, newPassword: string) =>
          Auth.completeNewPassword(user, newPassword, { email })
            .then((cognitoUser) => {
              // user and cognitoUser point to the same object
              // so create a new object to get react to update
              setUser({ ...cognitoUser });
              return cognitoUser;
            })
            .catch((err) => {
              console.log(err);
              throw err;
            }),
      } as UserInfo),
    [user]
  );

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('`useUser` hook must be used within a `UserProvider` component');
  }
  return context;
};
