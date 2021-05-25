import React from "react";
import { FormattedDate, FormattedNumber, FormattedPlural } from "react-intl";

const Table = (props) => {
  return (
    <tr>
      <th scope="row">{props.id}</th>
      <td>{props.name}</td>
      <td>{props.channel}</td>
      <td>{props.season}</td>
      <td>{props.episodes}</td>
      <td><FormattedDate value={props.release} year="numeric" month="long" day="numeric" weekday="long"/></td>
      {/* <td><FormattedNumber value={props.views}/> </td> */}
    </tr>
  );
};

export default Table;