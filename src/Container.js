import React, { useContext } from 'react';
import Board from './mastermind/Board';
import { AuthContext } from './AuthProvider';
import { useAxios } from './api';
import LoadingWrapper from './loading/loadingWrapper';

export default function Container() {

  const { isAuthenticated, getProfileState } = useContext(AuthContext);

  const [state, callApi] = useAxios("/api/mastermind/myGame", { method: 'post' });

  const sendUserSolution = async (colors) => {

    const response = await callApi(
      {
        data: {
          "slot1": parseInt(colors[0]),
          "slot2": parseInt(colors[1]),
          "slot3": parseInt(colors[2]),
          "slot4": parseInt(colors[3]),
        }
      });

    const { marker: hint, solution, finished, row } = response.data;

    return { hint, solution, finished, row };
  }

  return (
    <LoadingWrapper loading={getProfileState.isLoading}>
      <Board onCheck={isAuthenticated ? sendUserSolution : null} />
    </LoadingWrapper>)
}
