import React from "react";
import heart from "./Heart.svg";
import questionMark from "./QuestionMark.svg";
import money from "./Money.svg";
import "./Icons.css";

const icons = {
  heart,
  questionMark,
  money
};

export default function Icons(props) {
  const ic = props.icon ? [props.icon] : props.icons;
  return (
    <div className={props.className}>
      {ic.map((name, index) => (
        <img key={index} className="Icon" src={icons[name]} alt={name} />
      ))}
    </div>
  );
}