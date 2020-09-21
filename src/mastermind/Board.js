import React, { useContext } from 'react';
import BoardRow from "./Row.js";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Peg from "./Peg.js";
import Solution from "./Solution.js";
import { GameInfo, GameInfoHandler } from "./Gamestate.js";
import classNames from 'classnames';
import styles from './mastermind.module.scss';

const StartPegs = () => {

  const dispatch = useContext(GameInfoHandler);
  const { selected } = useContext(GameInfo);
  const pegs = [];

  for (let i = 0; i < 6; i++) {

    pegs.push(
      (<Col xs = {2}  key={i}>
        <Peg
          color={i}
          wrapperClass={classNames({ [styles.selected]: (i === selected) })}
          dispatch={dispatch}
          column={-1}
          draggable />
      </Col>));
  }

  return (
    <Row noGutters className = {styles.startPegs}>
      {pegs}
    </Row>
  )
}

const Board = React.memo(({ onCheck }) => {

  function renderRow(i) {
    return <BoardRow rowN={i} onCheck={onCheck} key={i} />;
  }

  const board = [];

  for (let i = 0; i < 9; i++) {
    board.push(renderRow(i));
  }

  return (
    <div className={styles.board}>
      <StartPegs />
      <div>
        {board}
        <Solution />
      </div>
    </div>
  );
});



export default Board;