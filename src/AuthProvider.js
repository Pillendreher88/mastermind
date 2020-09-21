import React, { useContext, useState, useEffect } from 'react';
import { GameInfoHandler } from "./mastermind/Gamestate.js";
import { ModalContext } from "./ModalProvider.js";
import { loadState, saveState } from './localStorage.js';
import { useAxios, addErrorHandler } from './api';

const initAuthState = () => {
  const token = loadState('jwt');

  return { user: {}, isAuthenticated: false, token, initialUserLoaded: token ? true : false };
}

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {

  const dispatch = useContext(GameInfoHandler);
  const { alert } = useContext(ModalContext);

  const [state, setState] = useState(initAuthState());
  const [getProfileState, getUserProfile] = useAxios('/api/auth/me', { method: 'post', data: { app: 'Mastermind' } },
    {
      onSuccess: (response) => {
        updateAuthState({ user: response.data, isAuthenticated: true, initialUserLoaded: true });
      },
      onFailure: () => resetAuth(),
    });
  const [loginState, requestLogin, resetLogin] = useAxios("api/auth/login", { method: 'post' });
  const [logoutState, requestLogout] = useAxios("api/auth/logout", { method: 'post' });


  const { user, token, isAuthenticated } = state;

  useEffect(() => {
    if (token) {
      getUserProfile().catch(error => console.log(error));
    }
    else updateAuthState({ initialUserLoaded: true })
  }, [token]);

  useEffect(() => {
    addErrorHandler(401, handleUnauthorized);
    addErrorHandler(500, () => alert("serverError"));
    addErrorHandler("network", () => alert("networkError"));
  }, [isAuthenticated]);


  const updateAuthState = (state) => {
    setState(prevState => ({ ...prevState, ...state }));
  }

  const updateUser = (userProps) => {
    setState(prevState => ({ ...prevState, user: { ...prevState.user, ...userProps } }));
  }

  const logout = () => {

    const loggedOutUser = user.name;
    requestLogout().finally(
      () => {
        resetAuth();
        alert( "logout", { name: loggedOutUser });
      }
    );
  }

  const handleUnauthorized = () => {

    console.log(state);
    if(isAuthenticated) {
      alert("sessionEnd");
      dispatch({ type: "RESET" });
    }
    resetAuth();

  }

  const resetAuth = () => {

    updateAuthState({ user: {}, token: "", isAuthenticated: false, initialUserLoaded: true });
    saveState("jwt", "");
  }

  const login = (credentials) => {

    requestLogin({ data: credentials }).then(
      response => {
        const { access_token } = response.data;
        saveState("jwt", access_token);
        updateAuthState({ user: {}, token: access_token });
      }
    ).catch(error => console.log(error));
  }

  const value = {
    ...state,
    updateUser,
    updateAuthState,
    logout,
    logoutState,
    loginState,
    login,
    resetLogin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}



