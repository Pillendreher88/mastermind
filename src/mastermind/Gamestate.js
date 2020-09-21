import React, { useReducer } from 'react';

export const GameInfo = React.createContext();
export const GameInfoHandler = React.createContext();
const userInfo = {}
var initialHints = Array(9).fill([8, 8, 8, 8]);
var initialGameState = {
  activeRow: 0, finished: false,
  board: Array(9).fill([8, 8, 8, 8]), solution: createSolution(),
  hints: initialHints, selected: 0
};


function initHints(history) {

  return initialHints.map((item, index) => {
    if (index < history.length)
      return (({ feedback1, feedback2, feedback3, feedback4 }) =>
        ([feedback1, feedback2, feedback3, feedback4]))(history[index]);
    else return item;
  });
}

function initBoardState(history) {

  return Array(9).fill([8, 8, 8, 8]).map((item, index) => {
    if (index < history.length) {
      return (({ slot1, slot2, slot3, slot4 }) =>
        ([slot1, slot2, slot3, slot4]))(history[index]);
    } else return item;

  });
}

function parseSolution(solution) {

  return solution ? [solution.slot1, solution.slot2, solution.slot3, solution.slot4] : [];
}

if (userInfo.history) {
  const { history = [], finished = false, solution = [] } = userInfo;
  const board = initBoardState(history);
  initialHints = initHints(userInfo.history);
  initialGameState = {
    activeRow: history.length, finished: finished, board: board,
    solution: parseSolution(solution), hints: initialHints, selected: 0
  };
}
function createSolution() {

  const colors = [0, 1, 2, 3, 4, 5];
  let solution = [];
  for (let i = 0; i < 4; i++) {
    let index_rand = Math.floor(Math.random() * (colors.length - 1));
    solution[i] = colors[index_rand];
  }
  return solution;
}

function checkSolution(solution, solution_user) {

  var marker = [8, 8, 8, 8];
  var marker_index = 0;
  var correct = false;
  solution = [...solution];
  solution_user = [...solution_user];

  for (let i = 3; i >= 0; i--) {
    if (solution[i] === solution_user[i]) {
      marker[marker_index] = 6;
      marker_index++;
      solution_user.splice(i, 1);
      solution.splice(i, 1);
    }
  }

  if (solution.length === 0) {
    correct = true;
    return [marker, correct];
  }
  correct = false;

  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution_user.length; j++) {
      if (solution[i] === solution_user[j]) {
        marker[marker_index] = 7;
        marker_index++;
        solution_user.splice(j, 1);
        break;
      }
    }
  }
  //shuffle
  for (let i = marker.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = marker[i]
    marker[i] = marker[j]
    marker[j] = temp;
  }

  return [marker, correct];
}

function placePin(row, column, color, boardPrev) {

  const rowPrev = boardPrev[row];

  const rowAfter = rowPrev.map((colorPrev, index) => {
    if (index === column) return color;
    else return colorPrev;
  });

  return boardPrev.map((rowPrev, index) => {
    if (index === row) return rowAfter;
    else return rowPrev;
  });
}

function reducer(gameState, { type, ...action }) {

  const { activeRow, board: boardPrev, hints: hintsPrev, dragged, selected } = gameState;
  let { finished, solution, history, hint, rowToCopy } = action;
  let board, hints;
  switch (type) {
    case "START_DRAG":
      return { ...gameState, dragged: action.dragged };
    case "CHANGE_SELECTED":
      return { ...gameState, selected: action.color };
    case "END_DRAG":
      let colorDropped = boardPrev[activeRow][action.column];
      let boardAfter = placePin(activeRow, action.column, dragged.color, boardPrev);
      if (activeRow === dragged.row) {
        boardAfter = placePin(activeRow, dragged.column, colorDropped, boardAfter);
      }
      return { ...gameState, board: boardAfter };
    case "PLACE_PIN":
      if (!action.color) action.color = selected;
      return { ...gameState, board: placePin(activeRow, action.column, action.color, boardPrev) };
    case "COPY_ROW":
      board = boardPrev.map((rowPrev, index) => {
        if (index === activeRow) return boardPrev[rowToCopy];
        return rowPrev;
      });
      return { ...gameState, board: board };
    case "CHECK_SOL":
      let [hintNew, correct] = checkSolution(gameState.solution, boardPrev[activeRow]);
      finished = (correct || activeRow > 7);
      hints = hintsPrev.map((hintPrev, index) => {
        if (index === activeRow) return hintNew;
        return hintPrev;
      });
      return { ...gameState, activeRow: (!correct && finished) ? (activeRow + 2) : (activeRow + 1), finished, hints };
    case "NEXT_ROW":
      hints = hintsPrev.map((hintPrev, index) => {
        if (index === activeRow) return hint;
        return hintPrev;
      });
      return {
        ...gameState,
        activeRow: action.row,
        finished,
        solution: parseSolution(solution), 
        hints
      };
    case "NEW_GAME":
      return { activeRow: 0, finished: false, board: Array(9).fill([8, 8, 8, 8]), solution: createSolution(), hints: Array(9).fill([8, 8, 8, 8]) };
    case "RESET":
      return {
        activeRow: 0, finished: false, selected: 0,
        board: Array(9).fill([8, 8, 8, 8]), solution: createSolution(),
        hints: Array(9).fill([8, 8, 8, 8])
      };
    case "LOAD_CURRENT_GAME":
      return {
        activeRow: history.length, finished, selected: 0,
        board: initBoardState(history), solution: parseSolution(solution),
        hints: initHints(history)
      };
    default:
      return gameState;
  }
}

const Gamestate = ({ children }) => {

  const [gameState, dispatch] = useReducer(reducer, initialGameState);

  return (
    <GameInfoHandler.Provider value={dispatch}>
      <GameInfo.Provider value={gameState}>
        {children}
      </GameInfo.Provider>
    </GameInfoHandler.Provider>
  );
}

export default Gamestate;