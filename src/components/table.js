import React from "react";
import { FormattedDate, FormattedNumber, FormattedPlural } from "react-intl";

const Table = (props) => {
  return (
    <tr>
      <th scope="row">{props.i.id}</th>
      <td>{props.i.name}</td>
      <td>{props.i.channel}</td>
      <td>{props.i.season}</td>
      <td>{props.i.episodes}</td>
      <td><FormattedDate value={props.i.release} year="numeric" month="long" day="numeric" weekday="long"/></td>
      {/* <td><FormattedNumber value={props.views}/> </td> */}
    </tr>
  );
};

export default Table;