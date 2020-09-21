import React, { useContext } from 'react';
import { GameInfo, GameInfoHandler } from "./Gamestate.js";
import Hints from "./Hints.js";
import Peg from "./Peg.js";
import ThumbsUpIcon from "../icons/ThumbsUp.js";
import EnvelopeIcon from "../icons/Envelope.js";
import ArrowLeftIcon from "../icons/ArrowLeft.js";
import CopyIcon from "../icons/Copy.js";
import styles from './mastermind.module.scss';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import classNames from 'classnames';
import Button from 'react-bootstrap/Button';


const BoardRow = ({ rowN, onCheck }) => {

  const gameInfo = useContext(GameInfo);
  const dispatch = useContext(GameInfoHandler);
  const colors = gameInfo.board[rowN];
  const hints = gameInfo.hints[rowN];
  const finished = (gameInfo.finished);
  const active = (!finished ? (gameInfo.activeRow === rowN) : false);
  const isSolution = (finished && (gameInfo.activeRow  === rowN + 1));

  const copyRow = () => {
    dispatch({ type: "COPY_ROW", rowToCopy: rowN });
  }

  const checkRow = () => {
    if (finished) return;

    if (onCheck) {
      onCheck(colors).then(response => {
        console.log(response);
        dispatch({ type: "NEXT_ROW", ...response });
      });
    }
    else {
      dispatch({ type: "CHECK_SOL" });
    }
  }

  const renderIcon = () => {
    if (isSolution) {
      return <div className={styles.iconRight}><ThumbsUpIcon /></div>
    }
    if (active) {
      if (rowFull) {
        return <Button onClick={checkRow} block variant="light">
          <EnvelopeIcon style={{ width: "100%", height: "100%" }} />
        </Button>;
      }
      return <div className={styles.iconRight}><ArrowLeftIcon /></div>;
    }
    else if (gameInfo.activeRow > rowN)
      return <Button disabled={finished} onClick={copyRow} block variant="light">
        <CopyIcon style={{ width: "100%", height: "100%" }} />
      </Button>;
  }

  const rowFull = colors.every((i) => (i !== 8));

  return (
    <Row noGutters className="align-items-center">
      <Hints hints={hints} />
      {colors.map(
        (color, index) =>
          <DropZone color={color} key={index} active={active} dispatch={dispatch} column={index}
            rowN={rowN} />
      )}
      <div className="col-2 position-relative">
        {renderIcon()}
      </div>
    </Row>
  );
}

class DropZone extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      over: false
    };
    this.dropCounter = 0;
  }

  handleDragEnter(e) {
    this.dropCounter++;
    this.setState({ over: true });

  }

  handleDragLeave(e) {
    this.dropCounter--;
    if (this.dropCounter < 1)
      this.setState({ over: false });

  }
  allowDrop(ev) {
    ev.preventDefault();
  }
  drop(e) {
    this.dropCounter = 0;
    e.preventDefault();
    let color_new = e.dataTransfer.getData("color");
    this.setState({ over: false });
    this.props.dispatch({ type: "END_DRAG", color: color_new, column: this.props.column });
  }

  render() {
    if (this.props.active)
      return (
        <div className={classNames("col-2", "dropzone active", { [styles.over]: this.state.over })}
          onDragEnter={(e) => this.handleDragEnter(e)}
          onDragLeave={(e) => this.handleDragLeave(e)}
          onDragOver={(e) => this.allowDrop(e)}
          onDrop={(e) => this.drop(e)}
          onClick={() => this.props.dispatch({ type: "PLACE_PIN", column: this.props.column })}
        >
          <Peg
            color={this.props.color}
            draggable
            active
            rowN={this.props.rowN}
            dispatch={this.props.dispatch}
            column={this.props.column} />
        </div>
      );
    else return (
      <Col xs={2}>
        <Peg
          color={this.props.color}
          draggable
          rowN={this.props.rowN}
          dispatch={this.props.dispatch}
          column={this.props.column} />
      </Col>
    );
  }
}

export default BoardRow;

