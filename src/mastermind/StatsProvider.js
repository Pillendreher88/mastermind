
import React, { useContext, useEffect } from 'react';
import { useApi } from "../api.js";
import { AuthContext } from "../AuthProvider.js";
import { GameInfo } from "./Gamestate.js";
import { usePrevious } from '../Utility.js';

export const StatsContext = React.createContext();

export default function StatsProvider({ children }) {

  const { finished } = useContext(GameInfo);
  const { isAuthenticated } = useContext(AuthContext);
  const finishedPrev = usePrevious(finished);
  const isAuthenticatedPrev = usePrevious(isAuthenticated);
  const changedToFinished = (finishedPrev !== finished && finished);
  const changedToAuthenticated = (isAuthenticatedPrev !== isAuthenticated && isAuthenticated);

  useEffect(() => {

    if (!isAuthenticated) {
      reset();
    }
  }, [isAuthenticated])

  const shouldFetch = (isAuthenticated && (changedToFinished || changedToAuthenticated));
  const [state, reset] = useApi("api/mastermind/my_stats", { method: 'get' }, { shouldFetch });

  return (
    <StatsContext.Provider value={state}>
      {children}
    </StatsContext.Provider>
  )
}
