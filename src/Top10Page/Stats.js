import React, { useState } from 'react';
import { MonthPick, YearPick } from './MonthPick.js';
import { Table } from './Table.js';
import { Checkbox } from './Checkbox.js';
import classNames from 'classnames';
import { Image } from 'react-bootstrap';
import AvatarIcon from '../icons/Avatar.js';

export const Stats = () => {
  var now = new Date();
  const [month, setMonth] = useState((now.getMonth() + 1).toString());
  const [year, setYear] = useState(now.getFullYear().toString());
  const [allTime, setAllTime] = useState(false);
  const startDate = new Date(2018, 6);
  const onMonthChange = (selected) => {
    setMonth(selected.value);
  }
  const onYearChange = (selected) => {
    setYear(selected.value);
  }

  const onCheck = () => {
    setAllTime(!allTime);
  }

  const query = allTime ? "overall" : `${year}/${month}`;
  const className = classNames({ "disabled": allTime });

  const renderPlayer = (player) => {
    return (
      <div className="d-flex align-items-center">
        <div style={{ width: "40px", height: "40px", marginRight: "5px" }}>
          {player.avatar ?
            <Image
              fluid
              alt=""
              src={'https://mongro.de/assets/images/avatars/100_100/' + player.avatar}

              roundedCircle /> :
            <AvatarIcon style={{ width: "100%", height: "100%" }} />}
        </div>
        {player.name}
      </div>
    );
  }

  return (
    <>
      <div className="mm-top10">
        TOP10
        </div>
      <div className="d-flex flex-row align-items-center">
        <div className="p-1 flex-fill">
          <MonthPick onChange={onMonthChange} value={month} className={className}
            intervall={{ start: startDate }} year={year} />
        </div>
        <div className="p-1 flex-fill">
          <YearPick onChange={onYearChange} value={year} className={className}
            intervall={{ start: startDate.getFullYear() }} />
        </div>
        <div className="p-1 flex-fill d-inline-block">
          <Checkbox onChange={onCheck} checked={allTime} label="all-time" />
        </div>
      </div>
      <Table
        source={`/api/mastermind/top/${query}`}
        rowsMin={10}
        columns={[{ title: "Player", key: "name", render: (field, row) => renderPlayer(row) },
        { title: "Average", key: "average" },
        { title: "Rounds", key: "games" },]} />
    </>
  )
}