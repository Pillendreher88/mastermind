import React, { useContext } from 'react';
import { BoardThemeContext } from "./BoardTheme.js";
import styles from './mastermind.module.scss';
import classNames from 'classnames';

const Peg = React.memo(({
  draggable,
  active,
  color,
  wrapperClass,
  onClick,
  rowN,
  column,
  dispatch }) => {

  const { colorPalette} = useContext(BoardThemeContext);

  const boardClick = () => {
    if (active) {
      dispatch({ type: "PLACE_PIN", column });
    }
    else {
      dispatch({ type: "CHANGE_SELECTED", color });
    }
  }

  function drag(e, color) {
    e.dataTransfer.setData("color", color);
    dispatch({ type: "START_DRAG", dragged: { row: rowN, column, color } });
  }

  let pegProps = {
    className: styles.peg,
    onDragStart: (e) => drag(e, color),
    onClick: onClick ? onClick : boardClick,
    style: { backgroundColor: colorPalette[color] },
    draggable: (draggable && color < 6)
  };

  return (
    <div className={classNames(wrapperClass, styles.pegWrap)} >
      <div {...pegProps} />
    </div>
  );
})

export default Peg;