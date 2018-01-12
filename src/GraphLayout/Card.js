import React from "react";
import a from "indefinite";
import "./Card.css";
export default function Card(props) {
  if (props.small) {
    return (
      <div className="GraphCardReset" style={props.style}>
        <div className="GraphCard GraphCardSmall">
          <div className="GraphCardYears">{props.occupation}</div>
          <div className="GraphCardWhy">
            <span className="Cap">
              {props.gender ? props.gender + "," : ""}
            </span>{" "}
            {props.age} y/o
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="GraphCard" style={props.style}>
        <div className="GraphCardInfo">
          {props.gender ? props.gender + "," : ""} {props.age} Y/O
        </div>
        <div className="GraphCardYears">
          I've been {a(props.occupation)} for {props.years} years
        </div>
        <div className="GraphCardWhy">{props.why}</div>
      </div>
    );
  }
}
