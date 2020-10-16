import React, { useContext, useState } from 'react';
import { AuthContext } from "./AuthProvider.js";
import { Spinner } from "./loading/Spinner.js";
import { months } from './Utility.js';
import { StatsContext } from "./AuthProvider.js";
import { Button, Col, Row,  Image } from 'react-bootstrap';
import AvatarIcon from './icons/Avatar.js';
import Info from './Info.js';

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

export const Header = ({onClose, closable = false}) => {

  const { user, isAuthenticated } = useContext(AuthContext);
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
    <>
    < HeaderView {...data} user={user} showInfo={showInfo}
      isAuthenticated = {isAuthenticated}
      onMouseOver={onMouseOver} onMouseOut={onMouseOut} />
      {closable ? 
      <Button onClick = {onClose}  variant="secondary" size="lg" block>
        Close
      </Button> : null}
    </>
  );
}

export const HeaderView = React.memo(({
  user_stats_now = {},
  user_stats_allTime = {},
  user,
  isAuthenticated,
  onMouseOver,
  onMouseOut }) => {

  var { average = "-", games = 0, rank } = user_stats_now;
  var { average: averageAT = "-", games: gamesAT = 0, rank: rankAT } = user_stats_allTime;
  const month = new Date().getMonth();

  if (average !== "-")
    average = round(average, 2);
  if (averageAT !== "-")
    averageAT = round(averageAT, 2);

  return (
    <Row className="mm-header" onMouseEnter={onMouseOver} onMouseLeave={onMouseOut} noGutters>
     { isAuthenticated ? 
     <HeaderItem title={user.name}>
        {user.avatar !== "default.jpg" ?
          <Image
            fluid
            alt=""
            className="mh-100"
            src={'https://mongro.de/assets/images/avatars/100_100/' + user.avatar}

            roundedCircle /> :
          <AvatarIcon style={{ fontSize: "50px" }} />}
      </HeaderItem> : 
      <Info/>}
      <Col className="d-flex flex-column" xs={12} md>
        <div className="d-flex flex-row flex-fill">
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
        <HeaderItem>
          <span className="mr-2">
            <Badge color={"blue"}>
              {months[month].label}
            </Badge>
          </span>
          <Badge color={"red"}>AllTime</Badge>
          <p>For rank:  10+ rounds required</p>
        </HeaderItem>
      </Col>
    </Row>
  );
})

export const HeaderItem = React.memo(({ title, children }) => {
  return (
    <div className="d-flex flex-column flex-fill align-items-center justify-content-center border border-dark ">
      <div className="mt-1">
        {title}
      </div>
      <div className="my-1">
        {children}
      </div>
    </div>
  );
})
