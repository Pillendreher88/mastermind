import React from 'react';
import Peg from "./Peg.js";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import styles from './mastermind.module.scss';


const Hints = ({ hints }) => {

  return (
    <div className="col-2">
      <Row noGutters className="align-items-center">
        {hints.map((hint, index) =>
          (<Col xs={6} key={index} className = {styles.hint}>
            <Peg color={hint} />
          </Col>))}
      </Row>
    </div>
  );
}

export default Hints;