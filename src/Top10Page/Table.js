import React from 'react';
import { Spinner } from "../loading/Spinner.js";
import { useApi } from "../api.js";

const Table = ({ source, rowsMin, keys, columns }) => {

  const { isLoading, error, data } = useApi(source, { method: 'get' });


  if (isLoading) return <Spinner />
  if (!data) return null;


  const renderTable = () => {

    let emptyRows = [];
    for (let i = data.length; i < rowsMin; i++) {
      emptyRows.push(<tr key={i}>
        <th>{i + 1}</th>
        <td colSpan="3" style={{ textAlign: "center" }}>EMPTY</td>
      </tr>);
    }

    let body = data.map((row, index) => (
      <tr key={index}>
        <th>{index + 1}</th>
        {keys ? (keys.map(key =>
          <td key={key}>{row[key]}</td>)) :
          (columns.map((col, index) =>
            <td key={index}>{col.render ?
              col.render(row[col.key], row) : row[col.key]}</td>))
        }
      </tr>
    ));
    body.push(emptyRows);
    return body;
  }

  const renderHeader = () => {
    let titles = [];
    if (columns.length > 0 && data.length > 0)
      titles = columns.map((col) => col.title ? col.title : col.key.toUpperCase());

    const header = titles.map((title, index) =>
      <th scope="col" key={index}>{title}</th>
    );
    return header;
  }

  const classname = "table table-dark ";

  return (
    <table className={classname} >
      <thead>
        <tr>
          <th scope="col">#</th>
          {renderHeader()}
        </tr>
      </thead>
      <tbody>
        {renderTable()}
      </tbody>
    </table>

  );

}

export { Table };