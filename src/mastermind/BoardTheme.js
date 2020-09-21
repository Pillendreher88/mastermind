
import React, { useState } from 'react';

export const BoardThemeContext = React.createContext();


const BoardTheme = ({children}) => {

const DEFAULT = ["aqua", "#ff0000", "#0000ff", "yellow", "#00ff00", "orange", "black", "white", "grey"];

const [colorPalette, setColorPalette] = useState(DEFAULT);

const changeColor = (color, index) => {

  let newColor = [...colorPalette];
  newColor[index] = color.hex;
  setColorPalette(newColor);
}

const setDefault = () => {
  setColorPalette(DEFAULT);
}

  return (
    <BoardThemeContext.Provider value={{colorPalette, changeColor, setDefault}}>
      {children}
    </BoardThemeContext.Provider>
  )
}

export default BoardTheme;