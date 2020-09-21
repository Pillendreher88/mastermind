import React, { useContext } from 'react';
import Peg from './Peg';
import { GameInfo, GameInfoHandler } from "./Gamestate.js";
import styles from './mastermind.module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classNames from 'classnames';


export default function Solution() {

  let { finished, solution, activeRow } = useContext(GameInfo);
  const dispatch = useContext(GameInfoHandler);
  let sol = finished ? solution : [8, 8, 8, 8];

  solution = <div className="col-8 align-items-center">
    <div className={classNames(styles.flip, { [styles.flipped]: finished })}>
      <div className={styles.flipFront}>
        ?
      </div>
      <Row noGutters className={classNames(styles.flipBack, { [styles.win]: finished && (activeRow < 10) }, { [styles.loss]: finished && (activeRow > 9) })}>
        {
          sol.map(
            (color, index) => (
              <Col key={index}>
                <Peg color={color} />
              </Col>))
        }
      </Row>
      <Row noGutters className="invisible">
        {
          sol.map(
            (color, index) =>
              <Col key={index}>
                <Peg color={color} />
              </Col>)
        }
      </Row>
    </div>
  </div>

  const button =
    <button className={classNames(styles.restart, { [styles.disabled]: !finished })} onClick={() => dispatch({ type: "RESET" })} disabled={!finished}>
      New
    </button>;

  return (
    <Row className={styles.solution} noGutters>
      <Col className="pr-1">
        <div id="status" className="mm-center-vertically-horizontally">
          {activeRow}
        </div>
      </Col>
      {solution}
      <Col xs={2} className="pl-1">
        {button}
      </Col>
    </Row>
  );
}