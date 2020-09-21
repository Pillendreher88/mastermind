import React, { useContext, useState } from 'react';
import { AuthContext } from "./AuthProvider.js";
import { Spinner } from "./loading/Spinner.js";
import { Transition } from 'react-transition-group';
import { months } from './Utility.js';
import { StatsContext } from './mastermind/StatsProvider.js';

function Badge({ style, children, onMouseEnter, onMouseLeave, color }) {

  let additionalClass = "";
  switch (color) {
    case "red":
      additionalClass = "badge-danger";
      break;
    case "blue":
      additionalClass = "badge-primary";
      break;
    case "info":
      additionalClass = "badge-info";
      break;
    default:
      additionalClass = "badge-info";
  }
  return <div className={"badge badge-pill " + additionalClass}
    style={style}
    onMouseOver={onMouseEnter}
    onMouseOut={onMouseLeave}>
    {children}
  </div>
}

function round(number, decimal) {
  if (!number) return null;
  let factor = Math.pow(10, decimal)
  return Math.round(number * factor) / factor;
}

export const Header = () => {

  const { user } = useContext(AuthContext);
  const { error, isLoading, data } = useContext(StatsContext);
  const [showInfo, setShowInfo] = useState(false);

  const onMouseOver = () => {
    setShowInfo(true);
  }
  const onMouseOut = () => {
    setShowInfo(false);
  }
  if (isLoading) return <Spinner classNames={"text-primary"} />;
  if (error) return "Error";

  return (
    < HeaderView {...data} title={user.name} showInfo={showInfo}
      onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
  );
}

export const HeaderView = React.memo(({ user_stats_now = {},
  user_stats_allTime = {},
  title,
  showInfo,
  onMouseOver,
  onMouseOut }) => {

  var { average = "-", games = 0, rank } = user_stats_now;
  var { average: averageAT = "-", games: gamesAT = 0, rank: rankAT } = user_stats_allTime;
  if (average !== "-")
    average = round(average, 2);
  if (averageAT !== "-")
    averageAT = round(averageAT, 2);

  const style = {
    position: "absolute",
    left: 0,
    padding: "0.5rem",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
    color: "white",
    transition: "top 0.7s ease"
  };
  const transitionStyles = {
    entering: { top: 0 },
    entered: { top: 0 },
    exiting: { top: "105%" },
    exited: { top: "105%" },
  };

  return (
    <div className="mm-header" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut}>
      <HeaderItem title={title}>
      </HeaderItem>
      <div className="d-flex flex-row ">
        <Transition in={showInfo} timeout={300}>
          {state => (
            <div style={{ ...transitionStyles[state], ...style }}>
              <Info />
            </div>
          )}
        </Transition>
        <HeaderItem title="AVG">
          <Badge color={"blue"}>{average}</Badge>
          <Badge color={"red"}>{averageAT}</Badge>
        </HeaderItem>
        <HeaderItem title="Games">
          <Badge color={"blue"}>{games}</Badge>
          <Badge color={"red"}>{gamesAT}</Badge>
        </HeaderItem>
        <HeaderItem title="Rank">
          <Badge color={"blue"}>{rank ? rank : "-"}</Badge>
          <Badge color={"red"}>{rankAT ? rankAT : "-"}</Badge>
        </HeaderItem>
      </div>
    </div>
  );
})

export const HeaderItem = React.memo(({ title, children }) => {
  return (
    <div className="d-flex flex-column flex-fill align-items-center justify-content-center border border-dark">
      <div className="p-1 ">
        {title}
      </div>
      <div className="p-1 ">
        {children}
      </div>
    </div>
  );
})

export const Info = React.memo(() => {

  const month = new Date().getMonth();
  return (
    <ul className="list-no-indentation">
      <li>
        There is a monthly top list ordered by average number of attempts per round.
            </li>
      <li><Badge color={"blue"}>{months[month].label}</Badge>
        <Badge color={"red"}>AllTime</Badge>
      </li>
      <li>You need to have played 10 rounds in the corresponding month to get ranked.</li>
    </ul>
  );
})