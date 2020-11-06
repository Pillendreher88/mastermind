import React, { useContext, useState, useEffect } from 'react';
import { GameInfoHandler } from "./mastermind/Gamestate.js";
import { GameInfo } from "./mastermind/Gamestate.js";
import { ModalContext } from "./ModalProvider.js";
import { loadState, saveState } from './localStorage.js';
import { useAxios, addErrorHandler } from './api';

const initAuthState = () => {
  const token = loadState('jwt');
  return { user: {}, isAuthenticated: false, token, initialUserLoaded: token ? false : true };
}

export const AuthContext = React.createContext();
export const StatsContext = React.createContext();

export default function AuthProvider({ children }) {

  const dispatch = useContext(GameInfoHandler);
  const { finished } = useContext(GameInfo);
  const { alert } = useContext(ModalContext);
  const [state, setState] = useState(initAuthState());
  const [stats, fetchStats, reset, dispatchStats] = useAxios("api/mastermind/my_stats", { method: 'get' });
  const [getProfileState, getUserProfile] = useAxios('/api/mastermind/myProfile', { method: 'get' },
    {
      onSuccess: (response) => {
        updateAuthState({ user: response.data, isAuthenticated: true, initialUserLoaded: true });
        dispatchStats({ type: "FETCH_SUCCESS", payload: response.data.stats });
        dispatch({ type: "LOAD_CURRENT_GAME", ...response.data.current_game });
        alert("welcome", { name: response.data.name, current_game: response.data.current_game, stats: response.data.stats });
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
  }, [token]);

  useEffect(() => {

    if (!isAuthenticated) {
      reset();
    }
  }, [isAuthenticated])

  useEffect(() => {

    if (finished && isAuthenticated) {
      fetchStats();
    }
  }, [finished, isAuthenticated])

  useEffect(() => {
    addErrorHandler(401, handleUnauthorized);
    addErrorHandler(500, () => alert("serverError"));
    addErrorHandler("network", () => alert("networkError"));
  }, [isAuthenticated]);


  const updateAuthState = (state) => {
    setState(prevState => ({ ...prevState, ...state }));
  }

  const saveToken = (token) => {
    setState(prevState => ({ ...prevState, token }));
    saveState("jwt", token);
  }

  const updateUser = (userProps) => {
    setState(prevState => ({ ...prevState, user: { ...prevState.user, ...userProps } }));
  }

  const logout = () => {

    const loggedOutUser = user.name;
    requestLogout().finally(
      () => {
        resetAuth();
        alert("logout", { name: loggedOutUser });
        dispatch({ type: "RESET" });

      }
    );
  }

  const handleUnauthorized = () => {

    if (isAuthenticated) {
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
        const { access_token: token } = response.data;
        saveToken(token);
      }
    ).catch(error => console.log(error));
  }

  const value = {
    ...state,
    updateUser,
    updateAuthState,
    saveToken,
    logout,
    logoutState,
    loginState,
    login,
    resetLogin,
    getProfileState
  };

  return (
    <AuthContext.Provider value={value}>
      <StatsContext.Provider value={stats}>
        {children}
      </StatsContext.Provider>
    </AuthContext.Provider>
  );
}



