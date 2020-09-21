import React from 'react';
import Dropdown from 'react-dropdown';
import { getYearOptions, getMonthOptions } from '../Utility.js';

export const MonthPick = ({onChange, value, className, intervall, year}) => {
 
  return (
    <Dropdown options= {getMonthOptions (intervall,year)} 
              onChange= {onChange} 
              value={value} 
              baseClassName={"mm-dropdown"}
              className = {className}/>
  );
}

export const YearPick = ({onChange,value,className, intervall}) => {

    const years = getYearOptions(intervall);
  
    return (
      <Dropdown options= {years}
                onChange= {onChange} 
                value={value} 
                baseClassName={"mm-dropdown"}
                className = {className}/>
    );
  }