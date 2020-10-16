import React, { useContext } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { StatsContext } from "../AuthProvider.js";
import { months } from '../Utility.js';

export default function MyStats() {

  const { data = {} } = useContext(StatsContext);
  const { user_stats_now = {}, user_stats_allTime = {} } = data;
  const month = new Date().getMonth();


  const renderRow = (label, value1, value2) => {
    return (<Row key={label} className = "mb-2">
      <Col>
        {label}
      </Col>
      <Col>
        {value1}
      </Col>
      <Col>
        {value2}
      </Col>
    </Row>)
  };

  const rankNow =  user_stats_now.rank ?  user_stats_now.rank : `${10 - user_stats_now.games} games left`;
  const rank =   user_stats_allTime.rank ?   user_stats_allTime.rank : `${10 -  user_stats_allTime.games} games left`;

  return (

    <Card>
      <Card.Header as="h5">
        Your Stats
      </Card.Header>
      <Card.Body>
        {renderRow("", months[month].label , "Overall")}
        {renderRow("Games", user_stats_now.games, user_stats_allTime.games)}
        {renderRow("Average", user_stats_now.average, user_stats_allTime.average)}
        {renderRow("Rank", rankNow, rank)}
      </Card.Body>
    </Card>

  )
}
