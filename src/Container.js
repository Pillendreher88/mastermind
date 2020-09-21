import React, { useContext } from 'react';
import Board from './mastermind/Board';
import { GameInfoHandler } from './mastermind/Gamestate'
import { AuthContext } from './AuthProvider';
import { useApi, useAxios } from './api';
import LoadingWrapper from './loading/loadingWrapper';
import { ModalContext } from "./ModalProvider.js";




export default function Container() {

  const dispatch = useContext(GameInfoHandler);
  const { user, isAuthenticated } = useContext(AuthContext);
  const { alert } = useContext(ModalContext);

  const axiosConfig = { method: 'get' };
  const onSuccess = (response) => {
    console.log(user);
    dispatch({ type: "LOAD_CURRENT_GAME", ...response.data });
    alert("welcome", { name: user.name, current_game: response.data });
  };
  const { isLoading } = useApi("/api/mastermind/myGame", axiosConfig, { onSuccess, shouldFetch: isAuthenticated });
  const [state, callApi] = useAxios("/api/mastermind/myGame", { method: 'post' });

  const sendUserSolution = async (colors) => {

    console.log(colors);
    const response = await callApi(
      {
        data: {
          "slot1": parseInt(colors[0]),
          "slot2": parseInt(colors[1]),
          "slot3": parseInt(colors[2]),
          "slot4": parseInt(colors[3]),
        }
      });
    console.log(response);

    const { marker: hint, solution, finished, row } = response.data;

    return { hint, solution, finished, row };
  }

  return (
    <LoadingWrapper loading={isLoading}>
      <Board onCheck={isAuthenticated ? sendUserSolution : null} />
    </LoadingWrapper>)
}
