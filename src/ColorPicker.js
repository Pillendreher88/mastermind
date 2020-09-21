import Peg from "./mastermind/Peg.js";
import React from 'react';
import { CirclePicker } from 'react-color'
import { Card, Row, Col } from "react-bootstrap";
import classNames from 'classnames';
import styles from './mastermind/mastermind.module.scss';

class ColorPicker extends React.Component {

  state = {
    index: null,
  }
  colors = ["#ff0000", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#0000ff", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
    "aqua", "#00ff00", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722",
    "#795548", "#607d8b", "yellow", "#ffa500",]

  componentDidMount() {
  }

  handleClick = (index) => {
    if (index === this.state.index) {
      this.setState({ index: null });
    }
    else {
      this.setState({ index });
    }
  };

  changeColor = (color) => {
    this.props.changeColor(color, this.state.index);
    this.setState({ index: null });
  }

  closeSelection = () => {
    this.setState({ index: null });
  }

  render() {

    const pinsPlayer = this.props.colors_user.slice(0, 6);
    const colors = this.colors.filter((color) =>
      !pinsPlayer.includes(color));

    return (

      <Card className="mb-3">
        <Card.Header as="h5">
          Change Colour of your pegs
      </Card.Header>
        <Card.Body>
          <Row noGutters className="p-2 justify-content-center border border-dark">
            {pinsPlayer.map((item, index) =>
              <Col  key={index}>
                <Peg color={index} onClick={(e) => this.handleClick(index)}
                  wrapperClass={classNames({ [styles.selected]: (index === this.state.index) })} />
              </Col>
            )}
          </Row>
          {this.state.index !== null &&
            <Row noGutters className="p-2 justify-content-center border border-dark">
              <CirclePicker color={this.state.index} colors={colors} circleSize={24} onChange={this.changeColor} />
            </Row>}
          <div className="d-flex justify-content-end mt-3">
            {this.state.index !== null &&
              <button type="submit" className="btn btn-danger mr-2" onClick={this.closeSelection}>
                Cancel
            </button>}
            <button type="submit" className="btn btn-primary" onClick={this.props.setToDefault}>
              Set to Default
            </button>
          </div>
        </Card.Body>
      </Card>

    )
  }
}

export { ColorPicker }
