import React from "react";
import Icons from "../Icons";
import "./MiniCard.css";

export default function MiniCard({ gender, age, occupation, style }) {
  let icon;
  if (gender === "male") icon = "diamond";
  else if (gender === "female") icon = "circle";
  else icon = "cross";
  return (
    <div style={style}>
      <Icons icon={icon} className="MiniCardIcon" />
      <div className="MiniCardText">
        <div className="MiniCardOccupation">{occupation}</div>
        <div className="MiniCardInfo">
          <span className="MiniCardCapitalize">{gender}</span>, {age} y/o
        </div>
      </div>
    </div>
  );
}
