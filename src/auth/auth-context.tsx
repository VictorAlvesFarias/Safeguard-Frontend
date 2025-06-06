import Cookies from 'js-cookie';
import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { loginService } from '../services/login-service';
import { AUTH } from '../config/auth-config';
import { AuthContextType } from '../interfaces/shared/auth-context';
import { AuthenticationService } from '../services/authentication-service';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => Promise.resolve(),
  logout: () => { },
  permissions: null
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const token = Cookies.get('token');
  const permissions = Cookies.get('claims');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [permissionsContext, setPermissionsContext] = useState(JSON.parse(permissions ?? "{}"));
  const expirationDate: any = Cookies.get("expectedExpirationTokenDateTime")
  const navigation = useNavigate()

  function handleLogout() {
    loginService.logout()
    navigation('/login')
  }
  function handleSignIn(data) {
    const result = loginService.loginPost(data)
      .then(e => {
        setIsAuthenticated(true)
        setPermissionsContext(e.claims)
        navigation("/")
      })

    return result
  }

  useEffect(() => {
    AuthenticationService.validateSession(
      token,
      window.location.pathname,
      expirationDate,
      AUTH.DISABLE_AUTH,
      AUTH.AUTHORIZE_NOT_REQUIRED,
      (event) => {
        if (event == "logout") {
          navigation('/login')
          loginService.logout()
        }
        if (event == "not-required") {
          //no events
        }
        if (event == "authenticate") {
          //no events
        }
      })
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn: handleSignIn,
      logout: handleLogout,
      isAuthenticated: isAuthenticated || AUTH.DISABLE_AUTH,
      permissions: permissionsContext
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider
}