import React from "react";
import { Schedule } from "../pages/types";

const toTenChar = (value: string) => {
  value = value.substring(0, 10);
  return value
};

const roundoff = (num: number) => {
  const value = Math.round((num + Number.EPSILON) * 100) / 100;
  return value;
};

const ViewSchecdule = (props: { schedule: Schedule }) => {
  return (
    <>
      <td className="px-6 bg-gray-50">
        {toTenChar(props.schedule.payingDate)}
      </td>
      <td className="px-6 bg-gray-50">
        {toTenChar(props.schedule.paidDate) === "0001-01-01" ? (
          <>-</>
        ) : (
          <>{toTenChar(props.schedule.paidDate)}</>
        )}
      </td>
      <td className="px-6 bg-gray-50">{roundoff(props.schedule.pricipalDue).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
      <td className="px-6 bg-gray-50">{roundoff(props.schedule.loanBalance).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
      <td className="px-6 bg-gray-50">{roundoff(props.schedule.interest).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
      <td className="px-6 bg-gray-50">{roundoff(props.schedule.penality).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
      <td className="px-6 bg-gray-50">{roundoff(props.schedule.due).toLocaleString(undefined, {maximumFractionDigits:2})}</td>{" "}
      <td className="px-6 bg-gray-50">
        {roundoff(props.schedule.paid).toLocaleString(undefined, {maximumFractionDigits:2})}
      </td>
    </>
  );
};

export default ViewSchecdule;
